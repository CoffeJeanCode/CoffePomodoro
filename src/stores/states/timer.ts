import { Timer } from "@/models";
import { getEndTime, getTime } from "@/utils/time.util";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimerState extends Timer {
  setRemainingTime: (time: number) => void;
  setFinishTime: (finishTime: number) => void;
  setIsRunning: (isRunning: boolean) => void;
  resetTimer: () => void;
}

const initialState: Timer = {
  finishTime: 0,
  remainingTime: 0,
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
      resetTimer: () => set(initialState),
    }),
    {
      name: "timer",
    }
  )
);
