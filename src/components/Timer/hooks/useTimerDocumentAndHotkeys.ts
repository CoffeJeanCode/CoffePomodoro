import { FavIcon, Mode } from "@/models/info";
import { useInfoState } from "@/stores";
import { getModeTitle } from "@/utils/modeLabels";
import { useDocumentTitle, useFavicon, useHotkeys } from "@mantine/hooks";
import { useEffect } from "react";

interface UseTimerDocumentAndHotkeysParams {
	mode: Mode;
	handleToggleTimer: () => void;
	handleStopTimer: () => void;
	handleIntentionFulfilled: () => void;
	handleNextTimer: (args: { isSkip: boolean }) => void;
	handleFullScreen: () => void | Promise<void>;
	handlePictureInPicture: () => void | Promise<void>;
	handleAdjustSessionByMinutes: (delta: 1 | -1) => void;
}

export function useTimerDocumentAndHotkeys({
	mode,
	handleToggleTimer,
	handleStopTimer,
	handleIntentionFulfilled,
	handleNextTimer,
	handleFullScreen,
	handlePictureInPicture,
	handleAdjustSessionByMinutes,
}: UseTimerDocumentAndHotkeysParams) {
	const { favIcon, setFavIcon } = useInfoState();

	useEffect(() => {
		setFavIcon(mode === Mode.Pomodoro ? FavIcon.work : FavIcon.break);
	}, [mode, setFavIcon]);

	useFavicon(favIcon);
	useDocumentTitle(`Coffe Pomodoro · ${getModeTitle(mode)}`);
	const isTypingTarget = () => {
		const el = document.activeElement;
		if (!el) return false;
		const tag = el.tagName;
		return (
			tag === "INPUT" ||
			tag === "TEXTAREA" ||
			(el as HTMLElement).isContentEditable
		);
	};

	useHotkeys([
		[
			"Space",
			() => {
				if (isTypingTarget()) return;
				handleToggleTimer();
			},
		],
		[
			"S",
			() => {
				if (mode === Mode.Pomodoro) {
					handleIntentionFulfilled();
				} else {
					handleStopTimer();
				}
			},
		],
		[
			"N",
			() => {
				if (mode !== Mode.Pomodoro) handleNextTimer({ isSkip: true });
			},
		],
		["F", () => void handleFullScreen()],
		["shift+I", () => void handlePictureInPicture()],
		["+", () => handleAdjustSessionByMinutes(1)],
		["-", () => handleAdjustSessionByMinutes(-1)],
	]);
}
