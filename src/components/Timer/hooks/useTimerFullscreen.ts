import type { RefObject } from "react";
import { useEffect, useState } from "react";

/** Syncs with browser fullscreen; targets `containerRef` when entering fullscreen. */
export function useTimerFullscreen(
	containerRef: RefObject<HTMLElement | null>,
) {
	const [isFullScreen, setIsFullScreen] = useState(false);

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullScreen(!!document.fullscreenElement);
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () =>
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
	}, []);

	const handleFullScreen = async () => {
		if (!document.fullscreenElement) {
			await containerRef.current?.requestFullscreen();
		} else if (document.exitFullscreen) {
			await document.exitFullscreen();
		}
	};

	return { isFullScreen, handleFullScreen };
}
