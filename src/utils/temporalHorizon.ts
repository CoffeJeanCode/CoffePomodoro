import { getEndTime, secondsToMilliseconds } from "./time.util";

function resolveEndTimeText(
	finishTimeText: string,
	finishTime: number,
	remainingTimeSeconds: number,
	isRunning: boolean,
): string | null {
	if (isRunning && finishTimeText) return finishTimeText;
	if (isRunning && finishTime > 0) return getEndTime(finishTime);
	if (remainingTimeSeconds > 0) {
		const projected = Date.now() + secondsToMilliseconds(remainingTimeSeconds);
		return getEndTime(projected);
	}
	return null;
}

/** Short clock label for the side hint (e.g. `2:30 p.m.`). */
export function getCycleEndTimeDisplay(
	finishTimeText: string,
	finishTime: number,
	remainingTimeSeconds: number,
	isRunning: boolean,
): string | null {
	return resolveEndTimeText(
		finishTimeText,
		finishTime,
		remainingTimeSeconds,
		isRunning,
	);
}

/** Full phrase for screen readers. */
export function formatCycleHorizonMessage(
	finishTimeText: string,
	finishTime: number,
	remainingTimeSeconds: number,
	isRunning: boolean,
): string {
	const time = resolveEndTimeText(
		finishTimeText,
		finishTime,
		remainingTimeSeconds,
		isRunning,
	);
	if (!time) return "El ciclo aún no ha comenzado";
	if (isRunning) return `El ciclo concluye a las ${time}`;
	return `El ciclo concluiría a las ${time}`;
}
