import { DailyStats, Stats, Weekday } from "@/models/stats";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeVersion } from "../config";

interface StatsState extends Stats {
  updateDailyStats: (weekday: Weekday, stats: DailyStats) => void;
  resetStats: () => void;
}

const initialState: Stats = {
  stats: {
    [String(Weekday.Monday)]: { sessions: 1, time: 1 },
    [String(Weekday.Tuesday)]: { sessions: 3, time: 2 },
    [String(Weekday.Wednesday)]: { sessions: 2, time: 3 },
    [String(Weekday.Thursday)]: { sessions: 5, time: 4 },
    [String(Weekday.Friday)]: { sessions: 5, time: 5 },
    [String(Weekday.Saturday)]: { sessions: 1, time: 6 },
    [String(Weekday.Sunday)]: { sessions: 0, time: 1 },
  },
  prevWeekStats: {
    [String(Weekday.Monday)]: { sessions: 4, time: 1 },
    [String(Weekday.Tuesday)]: { sessions: 1, time: 2 },
    [String(Weekday.Wednesday)]: { sessions: 4, time: 3 },
    [String(Weekday.Thursday)]: { sessions: 6, time: 4 },
    [String(Weekday.Friday)]: { sessions: 1, time: 5 },
    [String(Weekday.Saturday)]: { sessions: 5, time: 6 },
    [String(Weekday.Sunday)]: { sessions: 1, time: 1 },
  },
};

export const useStatsState = create<StatsState>()(
  persist(
    (set, get) => ({
      ...initialState,
      updateDailyStats: (weekday, daily) =>
        set(() => ({
          stats: {
            ...get().stats,
            [weekday]: {
              ...daily,
              time: get().stats[weekday].time + daily.time,
            },
          },
        })),
      resetStats: () => {
        const prevWeekStats = get().stats;
        set({
          ...initialState,
          prevWeekStats,
        });
      },
    }),
    {
      name: "stats",
      version: storeVersion,
    }
  )
);
