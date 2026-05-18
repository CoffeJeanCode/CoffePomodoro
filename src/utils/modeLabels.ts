import { Mode } from "@/models";

/** Canonical mode titles — use everywhere in the UI (header, break screen, tab). */
export const MODE_TITLE: Record<Mode, string> = {
	[Mode.Pomodoro]: "Focus",
	[Mode.ShortBreak]: "Short break",
	[Mode.LongBreak]: "Long break",
};

export function getModeTitle(mode: Mode): string {
	return MODE_TITLE[mode];
}
