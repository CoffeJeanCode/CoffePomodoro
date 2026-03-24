import { Mode } from "./info";

type Alarm = {
	title: string;
	url: string;
};

export interface Timers {
	[Mode.Pomodoro]: number;
	[Mode.ShortBreak]: number;
	[Mode.LongBreak]: number;
}

export interface Notification {
	alarm: Alarm;
	desktopNotification: boolean;
	volume: number;
}

export interface Behavior {
	canAutoPlay: boolean;
	pomodorosToLongBreak: number;
	/** Minutes added or removed per +/− adjust (buttons and hotkeys). */
	sessionAdjustStepMinutes: number;
	/** Minimum segment progress (0–100) for Skip during work to count toward session stats. */
	skipCountsSessionMinProgressPercent: number;
}

export interface Configuration {
	timers: Timers;
	notification: Notification;
	behavior: Behavior;
}

/** @deprecated Legacy persisted key was `behaviur`; runtime shape is `behavior`. */
export type LegacyBehaviorShape = Behavior;
