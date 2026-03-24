import { FavIcon, Mode } from "@/models/info";
import { useInfoState } from "@/stores";
import { useDocumentTitle, useFavicon, useHotkeys } from "@mantine/hooks";
import { useEffect } from "react";

interface UseTimerDocumentAndHotkeysParams {
	mode: Mode;
	remainingTimeText: string;
	handleToggleTimer: () => void;
	handleStopTimer: () => void;
	handleNextTimer: (args: { isSkip: boolean }) => void;
	handleFullScreen: () => void | Promise<void>;
	handlePictureInPicture: () => void | Promise<void>;
	handleAdjustSessionByMinutes: (delta: 1 | -1) => void;
}

export function useTimerDocumentAndHotkeys({
	mode,
	remainingTimeText,
	handleToggleTimer,
	handleStopTimer,
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
	useDocumentTitle(`${remainingTimeText} | ${mode.toLocaleUpperCase()}`);
	useHotkeys([
		["Space", () => handleToggleTimer()],
		["S", () => handleStopTimer()],
		["N", () => handleNextTimer({ isSkip: true })],
		["F", () => void handleFullScreen()],
		["shift+I", () => void handlePictureInPicture()],
		["+", () => handleAdjustSessionByMinutes(1)],
		["-", () => handleAdjustSessionByMinutes(-1)],
	]);
}
