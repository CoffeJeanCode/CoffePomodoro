import { useTimerState } from "@/stores";
import {
	millisecondsToSeconds,
	secondsToMilliseconds,
} from "@/utils/time.util";
import { type MutableRefObject, useEffect, useRef } from "react";

interface UseTimerTickParams {
	isRunning: boolean;
	remainingTime: number;
	setFinishTime: (t: number) => void;
	onExpireRef: MutableRefObject<() => void>;
}

/**
 * Ticks the countdown while running using wall clock vs `finishTime`.
 * finishTime is anchored once when the timer starts/resumes so that
 * pausing and resuming does not skip or drift time.
 */
export function useTimerTick({
	isRunning,
	remainingTime,
	setFinishTime,
	onExpireRef,
}: UseTimerTickParams) {
	// Track remainingTime in a ref so the interval effect can read the
	// current value on play/resume without it becoming a dependency.
	const remainingRef = useRef(remainingTime);
	remainingRef.current = remainingTime;

	useEffect(() => {
		if (!isRunning) return;

		// Anchor finishTime to the exact remaining seconds at the moment
		// play/resume is pressed. This prevents the timer from jumping
		// forward by however long it was paused.
		setFinishTime(Date.now() + secondsToMilliseconds(remainingRef.current));

		const tick = () => {
			const { finishTime, setRemainingTime, setResumedTime } =
				useTimerState.getState();
			const left = Math.max(
				0,
				Math.round(millisecondsToSeconds(finishTime - Date.now())),
			);
			setRemainingTime(left);
			setResumedTime(left);
			if (left <= 1) {
				clearInterval(intervalId);
				onExpireRef.current();
			}
		};

		const intervalId = setInterval(tick, 250);
		return () => {
			clearInterval(intervalId);
		};
	}, [isRunning, onExpireRef, setFinishTime]);
}
