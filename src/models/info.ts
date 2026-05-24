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
	/** Current focus intention for the active Pomodoro block */
	sessionIntention: string;
	intentionConfirmed: boolean;
	/**
	 * Focus blocks completed back-to-back without a long break or shutdown.
	 * Drives the "Energy check" intervention before chaining further cycles.
	 */
	consecutiveHighIntensitySessions: number;
	/** Distinct intentions fulfilled today, shown in the shutdown ritual. */
	completedIntentions: string[];
}
