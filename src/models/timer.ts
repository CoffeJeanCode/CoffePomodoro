export interface Timer {
	remainingTime: number;
	sessionSegmentTotalSeconds: number;
	finishTime: number;
	remainingTimeText: string;
	finishTimeText: string;
	resumedTime: number;
	isRunning: boolean;
	savedTimeBonus: number;
	consecutiveHighIntensitySessions: number;
}
