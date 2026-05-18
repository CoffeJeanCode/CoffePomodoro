export enum Weekday {
	Monday = "Monday",
	Tuesday = "Tuesday",
	Wednesday = "Wednesday",
	Thursday = "Thursday",
	Friday = "Friday",
	Saturday = "Saturday",
	Sunday = "Sunday",
}

export enum StatType {
	Time = "time",
	Sessions = "sessions",
}

export interface DailyStats {
	time: number;
	sessions: number;
	completed: number;
	skipped: number;
	avgDuration: number;
}

export interface WeeklyStats {
	[weekday: string]: DailyStats;
}

export interface FocusMetrics {
	currentStreak: number;
	longestStreak: number;
	totalCompleted: number;
	totalSkipped: number;
	completionRate: number;
	timeDistribution: Record<string, number>;
	lastSessionDate: string | null;
}

export interface Stats {
	stats: WeeklyStats;
	previousWeek: WeeklyStats | null;
	focusMetrics: FocusMetrics;
}
