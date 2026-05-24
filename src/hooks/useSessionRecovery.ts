import { useTimerState } from "@/stores";
import { millisecondsToSeconds } from "@/utils/time.util";
import { useEffect, useRef } from "react";

export function useSessionRecovery() {
	const isRunning = useTimerState((s) => s.isRunning);
	const finishTime = useTimerState((s) => s.finishTime);
	const setRemainingTime = useTimerState((s) => s.setRemainingTime);
	const setIsRunning = useTimerState((s) => s.setIsRunning);
	const setResumedTime = useTimerState((s) => s.setResumedTime);

	const recovered = useRef(false);

	useEffect(() => {
		if (recovered.current) return;
		recovered.current = true;

		if (!isRunning || finishTime <= 0) return;

		const now = Date.now();
		const remainingMs = finishTime - now;

		if (remainingMs <= 0) {
			setRemainingTime(0);
			setIsRunning(false);
			setResumedTime(0);
		} else {
			const remainingSec = Math.max(
				1,
				Math.round(millisecondsToSeconds(remainingMs)),
			);
			setRemainingTime(remainingSec);
			setResumedTime(remainingSec);
		}
	}, [isRunning, finishTime, setRemainingTime, setIsRunning, setResumedTime]);
}
