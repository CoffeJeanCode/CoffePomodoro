import { type Timers, Mode } from "@/models";
import { DEPTH_PRESETS, DEPTH_PRESET_ORDER } from "@/models/depth";
import { POMODOROS_TO_LONG_BREAK } from "@/stores/constants";

/**
 * Cycles before a long break, derived from the focus (work) duration so it
 * always follows the energy preset the timers belong to:
 *   deep 90' → 2, sustained 52' → 3, friction/quick 25' → 4.
 *
 * Deriving from the timers (rather than a stored `presetKey`) keeps the preview
 * and the running timer correct even for schemas persisted before presets
 * carried a key.  Custom durations that match no preset fall back to
 * {@link POMODOROS_TO_LONG_BREAK}.
 */
export const cyclesForTimers = (timers: Timers): number => {
	const match = DEPTH_PRESET_ORDER.map((key) => DEPTH_PRESETS[key]).find(
		(preset) => preset.timers[Mode.Pomodoro] === timers[Mode.Pomodoro],
	);
	return match?.maxConsecutiveCycles ?? POMODOROS_TO_LONG_BREAK;
};
