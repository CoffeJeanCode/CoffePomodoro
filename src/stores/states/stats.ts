import { DailyStats, Stats, Weekday } from "@/models/stats";
import { calculateProductivityImprovement } from "@/utils/stats.utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StatsState extends Stats {
  updateDailyStats: (weekday: Weekday, stats: DailyStats) => void;
  resetStats: () => void;
}

const initialState: Stats = {
  stats: {
    [String(Weekday.Monday)]: { sessions: 0, time: 0 },
    [String(Weekday.Tuesday)]: { sessions: 0, time: 0 },
    [String(Weekday.Wednesday)]: { sessions: 0, time: 0 },
    [String(Weekday.Thursday)]: { sessions: 0, time: 0 },
    [String(Weekday.Friday)]: { sessions: 0, time: 0 },
    [String(Weekday.Saturday)]: { sessions: 0, time: 0 },
    [String(Weekday.Sunday)]: { sessions: 0, time: 0 },
  },
  prevWeekStats: {},
  productivityStat: 0,
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
        set({
          ...initialState,
          prevWeekStats: get().stats,
          productivityStat: calculateProductivityImprovement(
            get().prevWeekStats,
            get().stats
          ),
        });
      },
    }),
    {
      name: "stats",
    }
  )
);