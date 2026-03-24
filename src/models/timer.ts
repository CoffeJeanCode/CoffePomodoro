export interface Timer {
	remainingTime: number;
	/** Planned length of the current segment (seconds), including ±minute adjustments; used for progress % and skip→stats rules. */
	sessionSegmentTotalSeconds: number;
	finishTime: number;
	remainingTimeText: string;
	finishTimeText: string;
	resumedTime: number;
	isRunning: boolean;
}
