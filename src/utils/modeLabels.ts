import { getAppLanguage } from "@/locales/getAppLanguage";
import { translations } from "@/locales/translations";
import { Mode } from "@/models";

/** Canonical mode titles — use everywhere in the UI (header, break screen, tab). */
export function getModeTitle(mode: Mode, lang = getAppLanguage()): string {
	const t = translations[lang].mode;
	switch (mode) {
		case Mode.Pomodoro:
			return t.focus;
		case Mode.ShortBreak:
			return t.shortBreak;
		case Mode.LongBreak:
			return t.longBreak;
	}
}
