import { getEndTime, secondsToMilliseconds } from "./time.util";

/** Horizon copy when the user deliberately reveals end-of-cycle time. */
export function formatCycleHorizonMessage(
	finishTimeText: string,
	finishTime: number,
	remainingTimeSeconds: number,
): string {
	if (finishTimeText) {
		return `El ciclo concluye a las ${finishTimeText}`;
	}
	if (finishTime > 0) {
		return `El ciclo concluye a las ${getEndTime(finishTime)}`;
	}
	if (remainingTimeSeconds > 0) {
		const projected = Date.now() + secondsToMilliseconds(remainingTimeSeconds);
		return `El ciclo concluiría a las ${getEndTime(projected)}`;
	}
	return "El ciclo aún no ha comenzado";
}
