import type { Mode } from "@/models/info";
import type { Timer } from "@/models/timer";
import { useInfoState, useTimerState } from "@/stores";
import { useUIStyleState } from "@/stores/states/uiStyle";
import { getActiveUIStyleId } from "@/theme/activeStyle";
import { PALETTE_VARS } from "@/theme/palette";
import { UI_STYLES } from "@/theme/uiStyles";
import { useCallback, useEffect, useRef, useState } from "react";
import { buildAmbientBackground } from "../utils/ambientBackground";
import {
	mountOrUpdatePiPControls,
	syncPiPTheme,
	updatePiPAdjustButtonTitles,
	updatePiPAmbient,
	updatePiPProgressRing,
	updatePiPTimeElements,
} from "../utils/pipDocument";
import { type PiPThemeTokens, getPiPStyles } from "../utils/pipStyles";
import { getModeAccent } from "../utils/timer";

/** Resolve PiP CSS tokens from the fixed palette + active structural style + mode accent. */
function buildPiPTheme(mode: Mode): PiPThemeTokens {
	return {
		colorVars: PALETTE_VARS,
		styleVars: UI_STYLES[getActiveUIStyleId()].vars,
		accent: getModeAccent(mode),
	};
}

interface UsePictureInPictureProps {
	handleToggleTimer: () => void;
	handleStopTimer: () => void;
	handleNextTimer: ({ isSkip }: { isSkip: boolean }) => void;
	handleAdjustSessionByMinutes: (delta: 1 | -1) => void;
	sessionAdjustStepMinutes: number;
	skipCountsSessionMinProgressPercent: number;
	mode: Mode;
	sessionProgressPercent: number;
}

const PIP_RING_RADIUS = 44;
const PIP_RING_SIZE = PIP_RING_RADIUS * 2 + 8;

function buildPiPMarkup(timerState: Pick<Timer, "isRunning">): string {
	const cx = PIP_RING_SIZE / 2;
	const cy = PIP_RING_SIZE / 2;
	const runningAttr = timerState.isRunning ? "true" : "false";

	return `
<div id="pip-root" data-running="${runningAttr}">
  <div id="pip-ambient"></div>
  <div class="pip-content">
    <div id="pip-mode-label" class="pip-mode-label">Focus</div>
    <div id="intention-text" class="intention-text"></div>
    <div class="pip-ring-wrap">
      <svg class="pip-ring-svg" width="${PIP_RING_SIZE}" height="${PIP_RING_SIZE}" viewBox="0 0 ${PIP_RING_SIZE} ${PIP_RING_SIZE}" aria-hidden>
        <circle class="pip-ring-track" cx="${cx}" cy="${cy}" r="${PIP_RING_RADIUS}" stroke-width="4"/>
        <circle id="pip-ring-progress" class="pip-ring-progress" cx="${cx}" cy="${cy}" r="${PIP_RING_RADIUS}" stroke-width="4"/>
      </svg>
      <div class="pip-time-overlay">
        <div id="time-text" class="time-text"></div>
        <div id="pip-paused-mark" class="pip-paused-mark hidden" aria-hidden></div>
      </div>
    </div>
    <div class="pip-ring-linear">
      <div id="pip-ring-linear-bar" class="pip-ring-linear-bar"></div>
    </div>
  </div>
  <div id="controls-area" class="controls"></div>
</div>
`;
}

const usePictureInPicture = ({
	handleToggleTimer,
	handleStopTimer,
	handleNextTimer,
	handleAdjustSessionByMinutes,
	sessionAdjustStepMinutes,
	skipCountsSessionMinProgressPercent,
	mode,
	sessionProgressPercent,
}: UsePictureInPictureProps) => {
	const adjustRef = useRef(handleAdjustSessionByMinutes);
	adjustRef.current = handleAdjustSessionByMinutes;
	const toggleRef = useRef(handleToggleTimer);
	toggleRef.current = handleToggleTimer;
	const stopRef = useRef(handleStopTimer);
	stopRef.current = handleStopTimer;
	const nextRef = useRef(handleNextTimer);
	nextRef.current = handleNextTimer;

	const timerState = useTimerState((state: Timer) => ({
		isRunning: state.isRunning,
		remainingTimeText: state.remainingTimeText,
	}));

	const sessionIntention = useInfoState((state) => state.sessionIntention);
	const activeStyle = useUIStyleState((state) => state.activeStyle);

	const [pipWindow, setPipWindow] = useState<Window | null>(null);
	const pipWindowRef = useRef<Window | null>(null);

	const updatePiPContent = useCallback(() => {
		const doc = pipWindowRef.current?.document;
		if (!doc) return;

		const accent = getModeAccent(mode);
		const ambient = buildAmbientBackground(mode, sessionProgressPercent);

		updatePiPTimeElements(
			doc,
			timerState,
			timerState.remainingTimeText,
			mode,
			sessionIntention,
		);
		updatePiPAmbient(doc, ambient);
		updatePiPProgressRing(doc, sessionProgressPercent, accent);

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
		syncPiPTheme(
			doc,
			`${mode}-${activeStyle}`,
			getPiPStyles(buildPiPTheme(mode)),
		);
	}, [
		mode,
		activeStyle,
		sessionAdjustStepMinutes,
		sessionProgressPercent,
		skipCountsSessionMinProgressPercent,
		sessionIntention,
		timerState,
	]);

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
				width: 280,
				height: 360,
				preferInitialWindowSize: true,
			});

			pipWindowRef.current = pipWin;
			setPipWindow(pipWin);

			pipWin.document.body.innerHTML = buildPiPMarkup(timerState);

			const style = pipWin.document.createElement("style");
			style.id = "pip-css";
			style.setAttribute("data-style-key", `${mode}-${getActiveUIStyleId()}`);
			style.textContent = getPiPStyles(buildPiPTheme(mode));
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
	}, [updatePiPContent]);

	return { pipWindow, handlePictureInPicture, isPiPOpen: !!pipWindow };
};

export default usePictureInPicture;
