export interface Timer {
	remainingTime: number;
	finishTime: number;
	remainingTimeText: string;
	finishTimeText: string;
	resumedTime: number;
	isRunning: boolean;
}
