import { describe, expect, it } from "bun:test";
import { Mode, type Timers } from "@/models";
import { DEPTH_PRESETS } from "@/models/depth";
import { POMODOROS_TO_LONG_BREAK } from "@/stores/constants";
import { cyclesForTimers } from "@/utils/cycles";

const timersFor = (workMinutes: number): Timers => ({
	[Mode.Pomodoro]: workMinutes * 60,
	[Mode.ShortBreak]: 5 * 60,
	[Mode.LongBreak]: 15 * 60,
});

describe("cyclesForTimers", () => {
	it("deep (90') runs 2 cycles before a long break", () => {
		expect(cyclesForTimers(DEPTH_PRESETS.deep.timers)).toBe(2);
	});

	it("sustained (52') runs 3 cycles before a long break", () => {
		expect(cyclesForTimers(DEPTH_PRESETS.sustained.timers)).toBe(3);
	});

	it("friction/quick (25') runs 4 cycles before a long break", () => {
		expect(cyclesForTimers(DEPTH_PRESETS.quick.timers)).toBe(4);
	});

	it("matches on the focus duration regardless of break lengths", () => {
		expect(cyclesForTimers(timersFor(90))).toBe(2);
		expect(cyclesForTimers(timersFor(52))).toBe(3);
		expect(cyclesForTimers(timersFor(25))).toBe(4);
	});

	it("falls back to the default for a non-preset duration", () => {
		expect(cyclesForTimers(timersFor(40))).toBe(POMODOROS_TO_LONG_BREAK);
	});
});
