import { formatMessage } from "@/locales/formatMessage";
import { getAppLanguage } from "@/locales/getAppLanguage";
import { translations } from "@/locales/translations";
import { getEndTime } from "./time.util";

function resolveEndTimeText(
	finishTimeText: string,
	finishTime: number,
	isRunning: boolean,
): string | null {
	if (!isRunning) return null;
	if (finishTimeText) return finishTimeText;
	if (finishTime > 0) return getEndTime(finishTime);
	return null;
}

/** Short clock label for the end-time hint (e.g. `2:30 p.m.`). Only while the timer is running. */
export function getCycleEndTimeDisplay(
	finishTimeText: string,
	finishTime: number,
	isRunning: boolean,
): string | null {
	return resolveEndTimeText(finishTimeText, finishTime, isRunning);
}

/** Full phrase for screen readers. */
export function formatCycleHorizonMessage(
	finishTimeText: string,
	finishTime: number,
	isRunning: boolean,
): string {
	const t = translations[getAppLanguage()].timer.progress;
	const time = resolveEndTimeText(finishTimeText, finishTime, isRunning);
	if (!time) return t.horizonNotStarted;
	return formatMessage(t.horizonEndsAt, { time });
}
