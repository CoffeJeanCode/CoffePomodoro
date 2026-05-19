import type { RefObject } from "react";
import { useEffect, useState } from "react";

/** Syncs with browser fullscreen; immersive timer fills the viewport. */
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
			const target = containerRef.current ?? document.documentElement;
			await target.requestFullscreen();
		} else if (document.exitFullscreen) {
			await document.exitFullscreen();
		}
	};

	return { isFullScreen, handleFullScreen };
}
