import { getAppLanguage, persistAppLanguage } from "@/locales/getAppLanguage";
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
	setLanguage: (lang: Language) => void;
	toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const [lang, setLang] = useState<Language>(getAppLanguage);

	const setLanguage = useCallback((next: Language) => {
		persistAppLanguage(next);
		setLang(next);
	}, []);

	const toggleLang = useCallback(() => {
		setLang((prev) => {
			const next = prev === "en" ? "es" : "en";
			persistAppLanguage(next);
			return next;
		});
	}, []);

	const value = useMemo<LanguageContextValue>(
		() => ({ lang, t: translations[lang], setLanguage, toggleLang }),
		[lang, setLanguage, toggleLang],
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
