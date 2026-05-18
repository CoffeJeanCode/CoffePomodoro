import {
	type KeyboardEvent,
	type MouseEvent,
	useCallback,
	useRef,
	useState,
} from "react";

const HOLD_MS = 450;

/** Press-and-hold (or hold Space/Enter) to momentarily reveal temporal horizon text. */
export function useTemporalReveal(enabled: boolean) {
	const [revealed, setRevealed] = useState(false);
	const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearHoldTimer = useCallback(() => {
		if (holdTimerRef.current !== null) {
			clearTimeout(holdTimerRef.current);
			holdTimerRef.current = null;
		}
	}, []);

	const hide = useCallback(() => {
		clearHoldTimer();
		setRevealed(false);
	}, [clearHoldTimer]);

	const show = useCallback(() => {
		clearHoldTimer();
		setRevealed(true);
	}, [clearHoldTimer]);

	const startHold = useCallback(() => {
		if (!enabled) return;
		clearHoldTimer();
		holdTimerRef.current = setTimeout(show, HOLD_MS);
	}, [clearHoldTimer, enabled, show]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!enabled) return;
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				e.stopPropagation();
				show();
			}
		},
		[enabled, show],
	);

	const onKeyUp = useCallback(
		(e: KeyboardEvent) => {
			if (!enabled) return;
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				e.stopPropagation();
				hide();
			}
		},
		[enabled, hide],
	);

	const revealHandlers = enabled
		? {
				onPointerDown: startHold,
				onPointerUp: hide,
				onPointerLeave: hide,
				onPointerCancel: hide,
				onContextMenu: (e: MouseEvent) => e.preventDefault(),
				onKeyDown,
				onKeyUp,
			}
		: {};

	return { revealed: enabled && revealed, revealHandlers };
}
