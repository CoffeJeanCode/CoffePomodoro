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
}

export interface WeeklyStats {
  [weekday: string]: DailyStats;
}

export interface Stats {
  stats: WeeklyStats;
  prevWeekStats: WeeklyStats;
}
