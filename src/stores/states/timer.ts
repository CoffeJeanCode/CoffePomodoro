import type { Timer } from "@/models";
import { getEndTime, getTime } from "@/utils/time.util";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeVersion } from "../config";

interface TimerState extends Timer {
	setRemainingTime: (time: number) => void;
	setResumedTime: (time: number) => void;
	setFinishTime: (time: number) => void;
	setIsRunning: (isRunning: boolean) => void;
	resetTimer: () => void;
	resetForNext: () => void;
}

const initialState: Timer = {
	finishTime: 0,
	remainingTime: 0,
	resumedTime: 0,
	finishTimeText: "",
	remainingTimeText: "00:00",
	isRunning: false,
};

export const useTimerState = create<TimerState>()(
	persist(
		(set) => ({
			...initialState,
			setRemainingTime: (time) =>
				set(() => ({ remainingTime: time, remainingTimeText: getTime(time) })),
			setFinishTime: (finishTime) =>
				set(() => ({ finishTime, finishTimeText: getEndTime(finishTime) })),
			setIsRunning: (isRunning) => set(() => ({ isRunning })),
			setResumedTime: (resumedTime) => set(() => ({ resumedTime })),
			resetForNext: () =>
				set({
					resumedTime: 0,
					isRunning: false,
				}),
			resetTimer: () => set(initialState),
		}),
		{
			name: "timer",
			version: storeVersion,
		},
	),
);
