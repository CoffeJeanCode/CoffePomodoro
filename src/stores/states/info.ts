import { FavIcon, type Info, Mode } from "@/models";
import { getCurrentWeek, getDate, getEndOfWeek } from "@/utils/time.util";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeVersion } from "../config";

interface InfoState extends Info {
	setMode: (mode: Mode) => void;
	setFavIcon: (favIcon: FavIcon) => void;
	setPomodoros: (pomodoros: number) => void;
	setSessions: (sessions: number) => void;
	setEndWeek: (endWeek: Date) => void;
	setSessionIntention: (sessionIntention: string) => void;
	setIntentionConfirmed: (intentionConfirmed: boolean) => void;
	clearSessionIntention: () => void;
	incrementHighIntensity: () => void;
	resetHighIntensity: () => void;
	logCompletedIntention: (intention: string) => void;
	resetInfo: () => void;
}

const todayDate = new Date();

const initialState: Info = {
	favIcon: FavIcon.work,
	mode: Mode.Pomodoro,
	date: { formated: getDate(todayDate), raw: todayDate },
	week: getCurrentWeek(todayDate),
	endWeek: getEndOfWeek(todayDate, 1),
	day: todayDate.getDay(),
	pomodoros: 1,
	sessions: 1,
	sessionIntention: "",
	intentionConfirmed: false,
	consecutiveHighIntensitySessions: 0,
	completedIntentions: [],
};

export const useInfoState = create<InfoState>()(
	persist(
		(set) => ({
			...initialState,
			setFavIcon: (favIcon) => set(() => ({ favIcon })),
			setPomodoros: (pomodoros) => set(() => ({ pomodoros })),
			setSessions: (sessions) => set(() => ({ sessions })),
			setMode: (mode) => set(() => ({ mode })),
			setEndWeek: (endWeek) => set(() => ({ endWeek })),
			setSessionIntention: (sessionIntention) =>
				set(() => ({ sessionIntention })),
			setIntentionConfirmed: (intentionConfirmed) =>
				set(() => ({ intentionConfirmed })),
			clearSessionIntention: () =>
				set(() => ({ sessionIntention: "", intentionConfirmed: false })),
			incrementHighIntensity: () =>
				set((state) => ({
					consecutiveHighIntensitySessions:
						state.consecutiveHighIntensitySessions + 1,
				})),
			resetHighIntensity: () =>
				set(() => ({ consecutiveHighIntensitySessions: 0 })),
			logCompletedIntention: (intention) =>
				set((state) => {
					const trimmed = intention.trim();
					if (!trimmed || state.completedIntentions.includes(trimmed)) {
						return state;
					}
					return {
						completedIntentions: [...state.completedIntentions, trimmed],
					};
				}),
			resetInfo: () => set(initialState),
		}),
		{
			name: "info",
			version: storeVersion,
			merge: (persisted, current) => {
				const p = (persisted ?? {}) as Partial<InfoState>;
				return {
					...current,
					...p,
					sessionIntention: p.sessionIntention ?? "",
					intentionConfirmed: p.intentionConfirmed ?? false,
					consecutiveHighIntensitySessions:
						p.consecutiveHighIntensitySessions ?? 0,
					completedIntentions: p.completedIntentions ?? [],
				};
			},
		},
	),
);
