import type { Timers } from "./config";

export type DepthPresetKey = "deep" | "sustained" | "quick";

export interface DepthPreset {
	key: DepthPresetKey;
	label: string;
	subtitle: string;
	description: string;
	timers: Timers;
}

export const DEPTH_PRESETS: Record<DepthPresetKey, DepthPreset> = {
	deep: {
		key: "deep",
		label: "Deep Immersion",
		subtitle: "Ultradian Rhythm",
		description: "90/20 · flow state and high-complexity work",
		timers: {
			pomodoro: 90 * 60,
			"short break": 20 * 60,
			"long break": 30 * 60,
		},
	},
	sustained: {
		key: "sustained",
		label: "Sustained Rhythm",
		subtitle: "Rhythmic Proportion",
		description: "52/17 · structured execution without burnout",
		timers: {
			pomodoro: 52 * 60,
			"short break": 17 * 60,
			"long break": 25 * 60,
		},
	},
	quick: {
		key: "quick",
		label: "Friction Threshold",
		subtitle: "Quick Start",
		description: "25/5 · beat procrastination and operational tasks",
		timers: {
			pomodoro: 25 * 60,
			"short break": 5 * 60,
			"long break": 15 * 60,
		},
	},
};

export const DEPTH_PRESET_ORDER: DepthPresetKey[] = [
	"deep",
	"sustained",
	"quick",
];

export function depthPresetTitle(preset: DepthPreset): string {
	return `${preset.label} (${preset.subtitle})`;
}

export const DEFAULT_DEPTH_PRESET: DepthPresetKey = "quick";