import type { Behavior, Configuration, Notification, Timers } from "@/models";
import { Mode } from "@/models";
import type { TimerSchema } from "@/models/schemas";
import { ALARMS } from "@/stores/constants";
import { minutesToSeconds } from "./time.util";

export const defaultTimers: Timers = {
	[Mode.Pomodoro]: minutesToSeconds(25),
	[Mode.ShortBreak]: minutesToSeconds(5),
	[Mode.LongBreak]: minutesToSeconds(10),
};

export const defaultNotification: Notification = {
	alarm: ALARMS.Micellaneus,
	desktopNotification:
		typeof Notification !== "undefined" &&
		Notification.permission === "granted",
	volume: 0.5,
};

export const defaultBehavior: Behavior = {
	canAutoPlay: false,
	pomodorosToLongBreak: 4,
	sessionAdjustStepMinutes: 5,
	skipCountsSessionMinProgressPercent: 100,
};

export function normalizeBehavior(raw?: Partial<Behavior> | null): Behavior {
	return {
		canAutoPlay: raw?.canAutoPlay ?? defaultBehavior.canAutoPlay,
		pomodorosToLongBreak:
			raw?.pomodorosToLongBreak ?? defaultBehavior.pomodorosToLongBreak,
		sessionAdjustStepMinutes:
			raw?.sessionAdjustStepMinutes ?? defaultBehavior.sessionAdjustStepMinutes,
		skipCountsSessionMinProgressPercent:
			raw?.skipCountsSessionMinProgressPercent ??
			defaultBehavior.skipCountsSessionMinProgressPercent,
	};
}

type PersistedConfiguration = Partial<Configuration> & {
	behaviur?: Partial<Behavior>;
};

/** Single source for runtime config shape; maps legacy `behaviur` → `behavior`. */
export function normalizeConfiguration(
	partial: PersistedConfiguration | null | undefined,
): Configuration {
	const p = partial ?? {};
	const behaviorSource = p.behavior ?? p.behaviur;
	return {
		timers: { ...defaultTimers, ...p.timers },
		notification: { ...defaultNotification, ...p.notification },
		behavior: normalizeBehavior(behaviorSource),
	};
}

type PersistedTimerSchema = Partial<TimerSchema> &
	Pick<TimerSchema, "id" | "title"> & {
		behaviur?: Partial<Behavior>;
	};

export function normalizeTimerSchema(
	schema: PersistedTimerSchema,
): TimerSchema {
	const legacy = (schema as { behaviur?: Partial<Behavior> }).behaviur;
	return {
		id: schema.id,
		title: schema.title,
		timers: { ...defaultTimers, ...schema.timers },
		notification: { ...defaultNotification, ...schema.notification },
		behavior: normalizeBehavior(schema.behavior ?? legacy),
	};
}
