import type { Language } from "@/locales/translations";

const STORAGE_KEY = "app_language";

export function getAppLanguage(): Language {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "en" || stored === "es") return stored;
	} catch {}
	const navLang = navigator.language?.slice(0, 2);
	if (navLang === "es") return "es";
	return "en";
}

export function persistAppLanguage(lang: Language): void {
	try {
		localStorage.setItem(STORAGE_KEY, lang);
	} catch {}
}
