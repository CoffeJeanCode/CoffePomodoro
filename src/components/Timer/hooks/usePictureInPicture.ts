import { Mode } from "@/models/info";
import type { Timer } from "@/models/timer";
import { useInfoState, useTimerState } from "@/stores";
import { useEffect, useRef, useState } from "react";
import {
	mountOrUpdatePiPControls,
	syncPiPTheme,
	updatePiPAdjustButtonTitles,
	updatePiPTimeElements,
} from "../utils/pipDocument";
import { getPiPStyles } from "../utils/pipStyles";
import { getModeHexColors } from "../utils/timer";

interface UsePictureInPictureProps {
	handleToggleTimer: () => void;
	handleStopTimer: () => void;
	handleNextTimer: ({ isSkip }: { isSkip: boolean }) => void;
	handleAdjustSessionByMinutes: (delta: 1 | -1) => void;
	sessionAdjustStepMinutes: number;
	skipCountsSessionMinProgressPercent: number;
}

const usePictureInPicture = ({
	handleToggleTimer,
	handleStopTimer,
	handleNextTimer,
	handleAdjustSessionByMinutes,
	sessionAdjustStepMinutes,
	skipCountsSessionMinProgressPercent,
}: UsePictureInPictureProps) => {
	const { mode, sessions } = useInfoState();

	const adjustRef = useRef(handleAdjustSessionByMinutes);
	adjustRef.current = handleAdjustSessionByMinutes;
	const toggleRef = useRef(handleToggleTimer);
	toggleRef.current = handleToggleTimer;
	const stopRef = useRef(handleStopTimer);
	stopRef.current = handleStopTimer;
	const nextRef = useRef(handleNextTimer);
	nextRef.current = handleNextTimer;

	const timerState = useTimerState((state: Timer) => ({
		remainingTimeText: state.remainingTimeText,
		finishTimeText: state.finishTimeText,
		isRunning: state.isRunning,
	}));

	const [pipWindow, setPipWindow] = useState<Window | null>(null);
	const pipWindowRef = useRef<Window | null>(null);

	const updatePiPContent = () => {
		const doc = pipWindowRef.current?.document;
		if (!doc) return;

		updatePiPTimeElements(doc, timerState);

		mountOrUpdatePiPControls(
			doc,
			mode,
			timerState.isRunning,
			skipCountsSessionMinProgressPercent,
			{
				onAdjust: (delta) => adjustRef.current(delta),
				onToggle: () => toggleRef.current(),
				onSkip: () => nextRef.current({ isSkip: true }),
				onStop: () => stopRef.current(),
			},
		);

		updatePiPAdjustButtonTitles(doc, sessionAdjustStepMinutes);

		syncPiPTheme(doc, mode, getPiPStyles(getModeHexColors(mode)));
	};

	const handlePictureInPicture = async () => {
		if (!("documentPictureInPicture" in window)) return;
		if (pipWindowRef.current) {
			pipWindowRef.current.close();
			return;
		}

		try {
			const pipWin = await (
				window as unknown as {
					documentPictureInPicture: {
						requestWindow: (opts: object) => Promise<Window>;
					};
				}
			).documentPictureInPicture.requestWindow({
				width: 360,
				height: 120,
			});

			pipWindowRef.current = pipWin;
			setPipWindow(pipWin);

			pipWin.document.body.innerHTML = `
                <div id="pip-root">
                    <div class="timer-container">
                        <div id="time-text" class="time-text">${timerState.remainingTimeText}</div>
						<div id="finish-text" class="finish-text ${timerState.isRunning ? "visible" : "hidden"}">${timerState.finishTimeText ? `Finish at ${timerState.finishTimeText}` : ""}</div>
                    </div>

                    <div id="controls-area" class="controls">
                        </div>
                </div>
            `;

			const style = pipWin.document.createElement("style");
			style.id = "pip-css";
			style.setAttribute("data-mode", String(mode));
			style.textContent = getPiPStyles(getModeHexColors(mode));
			pipWin.document.head.append(style);

			pipWin.onpagehide = () => {
				setPipWindow(null);
				pipWindowRef.current = null;
			};
			updatePiPContent();
		} catch (err) {
			console.error("PiP Error:", err);
		}
	};

	useEffect(() => {
		if (pipWindowRef.current) updatePiPContent();
	}, [
		timerState.remainingTimeText,
		timerState.finishTimeText,
		timerState.isRunning,
		mode,
		sessions,
		sessionAdjustStepMinutes,
		skipCountsSessionMinProgressPercent,
	]);

	return { pipWindow, handlePictureInPicture, isPiPOpen: !!pipWindow };
};

export default usePictureInPicture;
