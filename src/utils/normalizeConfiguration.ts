import type { Configuration, Notification, Timers } from "@/models";
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

const alarmByTitle = new Map(
	Object.values(ALARMS).map((alarm) => [alarm.title, alarm]),
);

export function normalizeAlarm(
	alarm: Notification["alarm"] | undefined,
): Notification["alarm"] {
	if (!alarm?.title) return defaultNotification.alarm;
	return alarmByTitle.get(alarm.title) ?? defaultNotification.alarm;
}

export function normalizeConfiguration(
	partial: Partial<Configuration> | null | undefined,
): Configuration {
	const p = partial ?? {};
	return {
		timers: { ...defaultTimers, ...p.timers },
		notification: {
			...defaultNotification,
			...p.notification,
			alarm: normalizeAlarm(p.notification?.alarm),
		},
	};
}

export function normalizeTimerSchema(schema: Partial<TimerSchema> & Pick<TimerSchema, "id" | "title">): TimerSchema {
	return {
		id: schema.id,
		title: schema.title,
		timers: { ...defaultTimers, ...schema.timers },
		notification: {
			...defaultNotification,
			...schema.notification,
			alarm: normalizeAlarm(schema.notification?.alarm),
		},
	};
}