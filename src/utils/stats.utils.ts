import type { DailyStats, WeeklyStats } from "@/models/stats";
import { keys, reduce } from "ramda";

export const calculateWeeklyTotal = (weeklyStats: WeeklyStats): DailyStats =>
	reduce(
		(acc, key) => {
			return {
				sessions: acc.sessions + Number(weeklyStats[key].sessions),
				time: acc.time + Number(weeklyStats[key].time),
			};
		},
		{ sessions: 0, time: 0 },
		keys(weeklyStats),
	);

export const calculateProductivityImprovement = (
	prevWeekStats: WeeklyStats,
	currentWeekStats: WeeklyStats,
): number => {
	const prevWeekTotal = calculateWeeklyTotal(prevWeekStats);
	const currentWeekTotal = calculateWeeklyTotal(currentWeekStats);

	const prevWeekSessions = prevWeekTotal.sessions;
	const prevWeekTime = prevWeekTotal.time;

	const currentWeekSessions = currentWeekTotal.sessions;
	const currentWeekTime = currentWeekTotal.time;

	// Calcular el porcentaje de mejora de sesiones y Time
	const sessionsImprovement =
		((currentWeekSessions - prevWeekSessions) / prevWeekSessions) * 100;
	const TimeImprovement =
		((currentWeekTime - prevWeekTime) / prevWeekTime) * 100;

	// Tomamos el promedio de mejora entre sesiones y Time
	return (sessionsImprovement + TimeImprovement) / 2 || 0;
};
