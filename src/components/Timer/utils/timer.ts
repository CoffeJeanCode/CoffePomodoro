import { Mode } from "@/models";

/** Next mode: after Nth pomodoro → long break; after other pomodoros → short break; after any break → pomodoro. */
export const getNewMode = (
	mode: Mode,
	pomodoros: number,
	pomodorosToLongBreak: number,
) =>
	mode === Mode.Pomodoro
		? pomodoros === pomodorosToLongBreak
			? Mode.LongBreak
			: Mode.ShortBreak
		: Mode.Pomodoro;
