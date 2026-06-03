import {
	type Language,
	type TranslationDict,
	translations,
} from "@/locales/translations";
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

interface LanguageContextValue {
	lang: Language;
	t: TranslationDict;
	toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "app_language";

function getInitialLanguage(): Language {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "en" || stored === "es") return stored;
	} catch {}
	const navLang = navigator.language?.slice(0, 2);
	if (navLang === "es") return "es";
	return "en";
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const [lang, setLang] = useState<Language>(getInitialLanguage);

	const toggleLang = useCallback(() => {
		setLang((prev) => {
			const next = prev === "en" ? "es" : "en";
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch {}
			return next;
		});
	}, []);

	const value = useMemo<LanguageContextValue>(
		() => ({ lang, t: translations[lang], toggleLang }),
		[lang, toggleLang],
	);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = (): LanguageContextValue => {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
	return ctx;
};
