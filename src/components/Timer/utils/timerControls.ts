import { Mode } from "@/models";

export interface TimerControlState {
	isPaused: boolean;
	showSkip: boolean;
}

/** Shared rules for main timer UI and PiP controls. */
export function getTimerControlState(
	mode: Mode,
	isRunning: boolean,
): TimerControlState {
	const isPaused = !isRunning;
	const isBreak = mode !== Mode.Pomodoro;
	const showSkip = !isRunning || isBreak;
	return { isPaused, showSkip };
}

export function getTimerControlsDomStateKey(state: TimerControlState): string {
	return `${state.isPaused}-${state.showSkip}`;
}

export function getSkipButtonTitle(
	mode: Mode,
	skipCountsSessionMinProgressPercent: number,
): string {
	if (mode !== Mode.Pomodoro) return "Skip <N>";
	if (skipCountsSessionMinProgressPercent <= 0) {
		return "Skip <N> (always counts toward session stats)";
	}
	if (skipCountsSessionMinProgressPercent >= 100) {
		return "Skip <N> (counts only when the segment is complete)";
	}
	return `Skip <N> (counts if ≥${skipCountsSessionMinProgressPercent}% elapsed)`;
}
