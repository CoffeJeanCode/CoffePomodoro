import {
	type DailyStats,
	type FocusMetrics,
	type Stats,
	type WeeklyStats,
	Weekday,
} from "@/models/stats";
import { indexedDBStorage } from "@/utils/storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeVersion } from "../config";

const getTimeOfDay = (): string => {
	const hour = new Date().getHours();
	if (hour < 6) return "night";
	if (hour < 12) return "morning";
	if (hour < 18) return "afternoon";
	return "evening";
};

const initialState: Stats = {
	stats: {
		[String(Weekday.Monday)]: {
			sessions: 0,
			time: 0,
			completed: 0,
			skipped: 0,
			avgDuration: 0,
		},
		[String(Weekday.Tuesday)]: {
			sessions: 0,
			time: 0,
			completed: 0,
			skipped: 0,
			avgDuration: 0,
		},
		[String(Weekday.Wednesday)]: {
			sessions: 0,
			time: 0,
			completed: 0,
			skipped: 0,
			avgDuration: 0,
		},
		[String(Weekday.Thursday)]: {
			sessions: 0,
			time: 0,
			completed: 0,
			skipped: 0,
			avgDuration: 0,
		},
		[String(Weekday.Friday)]: {
			sessions: 0,
			time: 0,
			completed: 0,
			skipped: 0,
			avgDuration: 0,
		},
		[String(Weekday.Saturday)]: {
			sessions: 0,
			time: 0,
			completed: 0,
			skipped: 0,
			avgDuration: 0,
		},
		[String(Weekday.Sunday)]: {
			sessions: 0,
			time: 0,
			completed: 0,
			skipped: 0,
			avgDuration: 0,
		},
	},
	previousWeek: null,
	focusMetrics: {
		currentStreak: 0,
		longestStreak: 0,
		totalCompleted: 0,
		totalSkipped: 0,
		completionRate: 1,
		timeDistribution: {
			morning: 0,
			afternoon: 0,
			evening: 0,
			night: 0,
		},
		lastSessionDate: null,
	},
};

interface StatsState extends Stats {
	updateDailyStats: (
		weekday: Weekday,
		stats: DailyStats,
		isCompleted: boolean,
	) => void;
	savePreviousWeek: () => void;
	resetStats: () => void;
	updateStreak: (date: string) => void;
}

export const useStatsState = create<StatsState>()(
	persist(
		(set, get) => ({
			...initialState,
			updateDailyStats: (weekday, daily, isCompleted) => {
				const current = get().stats[weekday];
				const newTotalTime = current.time + daily.time;
				const newTotalSessions = current.sessions + daily.sessions;
				const newAvgDuration =
					newTotalSessions > 0 ? newTotalTime / newTotalSessions : 0;

				const timeOfDay = getTimeOfDay();
				const newDistribution = {
					...get().focusMetrics.timeDistribution,
					[timeOfDay]:
						(get().focusMetrics.timeDistribution[timeOfDay] ?? 0) +
						daily.time,
				};

				set({
					stats: {
						...get().stats,
						[weekday]: {
							...current,
							sessions: newTotalSessions,
							time: newTotalTime,
							completed: current.completed + (isCompleted ? 1 : 0),
							skipped: current.skipped + (isCompleted ? 0 : 1),
							avgDuration: newAvgDuration,
						},
					},
					focusMetrics: {
						...get().focusMetrics,
						totalCompleted:
							get().focusMetrics.totalCompleted + (isCompleted ? 1 : 0),
						totalSkipped:
							get().focusMetrics.totalSkipped + (isCompleted ? 0 : 1),
						completionRate:
							(get().focusMetrics.totalCompleted + (isCompleted ? 1 : 0)) /
							Math.max(
								1,
								get().focusMetrics.totalCompleted +
									get().focusMetrics.totalSkipped +
									(isCompleted ? 1 : 0),
							),
						timeDistribution: newDistribution,
					},
				});
			},
			savePreviousWeek: () => {
				const currentStats = get().stats;
				set({ previousWeek: { ...currentStats } });
			},
			resetStats: () => {
				set({
					...initialState,
					previousWeek: get().stats,
					focusMetrics: {
						...initialState.focusMetrics,
						currentStreak: get().focusMetrics.currentStreak,
						longestStreak: get().focusMetrics.longestStreak,
						totalCompleted: get().focusMetrics.totalCompleted,
						totalSkipped: get().focusMetrics.totalSkipped,
						completionRate: get().focusMetrics.completionRate,
						timeDistribution: get().focusMetrics.timeDistribution,
					},
				});
			},
			updateStreak: (date: string) => {
				const lastDate = get().focusMetrics.lastSessionDate;
				const today = new Date(date);
				const yesterday = new Date(today);
				yesterday.setDate(yesterday.getDate() - 1);

				let newStreak = get().focusMetrics.currentStreak;

				if (lastDate) {
					const last = new Date(lastDate);
					const daysDiff = Math.floor(
						(today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24),
					);

					if (daysDiff === 0) {
						return;
					} else if (daysDiff === 1) {
						newStreak += 1;
					} else {
						newStreak = 1;
					}
				} else {
					newStreak = 1;
				}

				const longestStreak = Math.max(
					newStreak,
					get().focusMetrics.longestStreak,
				);

				set({
					focusMetrics: {
						...get().focusMetrics,
						currentStreak: newStreak,
						longestStreak,
						lastSessionDate: date,
					},
				});
			},
		}),
		{
			name: "stats",
			version: storeVersion + 1,
			storage: indexedDBStorage,
		},
	),
);