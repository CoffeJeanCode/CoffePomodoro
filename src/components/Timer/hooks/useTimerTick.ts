import { useTimerState } from "@/stores";
import {
	millisecondsToSeconds,
	secondsToMilliseconds,
} from "@/utils/time.util";
import { type MutableRefObject, useEffect } from "react";

interface UseTimerTickParams {
	isRunning: boolean;
	remainingTime: number;
	setFinishTime: (t: number) => void;
	onExpireRef: MutableRefObject<() => void>;
}

/**
 * Keeps finish time aligned with remaining seconds, ticks countdown while running
 * using wall clock vs `finishTime` so the interval is not recreated every second.
 */
export function useTimerTick({
	isRunning,
	remainingTime,
	setFinishTime,
	onExpireRef,
}: UseTimerTickParams) {
	useEffect(() => {
		const then = Date.now() + secondsToMilliseconds(remainingTime);
		setFinishTime(then);
	}, [remainingTime, setFinishTime]);

	useEffect(() => {
		if (!isRunning) return;

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
	}, [isRunning, onExpireRef]);
}
