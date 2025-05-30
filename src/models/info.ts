export enum Mode {
	Pomodoro = "pomodoro",
	ShortBreak = "short break",
	LongBreak = "long break",
}

export enum FavIcon {
	work = "favicon.svg",
	break = "favicon-break.svg",
}

export interface Info {
	date: { formated: string; raw: Date };
	day: number;
	week: number;
	endWeek: Date;
	favIcon: FavIcon;
	mode: Mode;
	sessions: number;
	pomodoros: number;
}
