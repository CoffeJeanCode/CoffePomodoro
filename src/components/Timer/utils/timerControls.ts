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

export function getSkipButtonTitle(mode: Mode): string {
	if (mode !== Mode.Pomodoro) return "Skip <N>";
	return "Skip <N>";
}
