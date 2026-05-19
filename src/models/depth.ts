import type { Timers, Behavior } from "./config";

export type DepthPresetKey = "deep" | "sustained" | "quick";

export interface DepthPreset {
	key: DepthPresetKey;
	label: string;
	description: string;
	timers: Timers;
	behavior: Pick<Behavior, "pomodorosToLongBreak" | "sessionAdjustStepMinutes" | "skipCountsSessionMinProgressPercent">;
}

export const DEPTH_PRESETS: Record<DepthPresetKey, DepthPreset> = {
	deep: {
		key: "deep",
		label: "Deep Immersion",
		description: "90-minute ultradian cycle for deep work",
		timers: {
			pomodoro: 90 * 60,
			"short break": 20 * 60,
			"long break": 30 * 60,
		},
		behavior: {
			pomodorosToLongBreak: 3,
			sessionAdjustStepMinutes: 10,
			skipCountsSessionMinProgressPercent: 100,
		},
	},
	sustained: {
		key: "sustained",
		label: "Sustained Rhythm",
		description: "52-minute focused rhythm with proportional recovery",
		timers: {
			pomodoro: 52 * 60,
			"short break": 17 * 60,
			"long break": 25 * 60,
		},
		behavior: {
			pomodorosToLongBreak: 3,
			sessionAdjustStepMinutes: 5,
			skipCountsSessionMinProgressPercent: 100,
		},
	},
	quick: {
		key: "quick",
		label: "Quick Start",
		description: "25-minute sprint for fast momentum",
		timers: {
			pomodoro: 25 * 60,
			"short break": 5 * 60,
			"long break": 15 * 60,
		},
		behavior: {
			pomodorosToLongBreak: 4,
			sessionAdjustStepMinutes: 5,
			skipCountsSessionMinProgressPercent: 100,
		},
	},
};

export const DEFAULT_DEPTH_PRESET: DepthPresetKey = "quick";
