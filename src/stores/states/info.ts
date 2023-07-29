import { FavIcon, Info, Mode } from "@/models";
import { getDate } from "@/utils/time.util";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InfoState extends Info {
	setMode: (mode: Mode) => void;
	setFavIcon: (favIcon: FavIcon) => void;
	setPomodoros: (pomodoros: number) => void;
	setSessions: (sessions: number) => void;
	setInfo: (newInfo: Info) => void;
}

export const useInfoState = create<InfoState>()(
	persist(
		(set) => ({
			favIcon: FavIcon.work,
			mode: Mode.Pomodoro,
			date: getDate(new Date()),
			pomodoros: 1,
			sessions: 1,
			setFavIcon: (favIcon) => set(() => ({ favIcon })),
			setPomodoros: (pomodoros) => set(() => ({ pomodoros })),
			setSessions: (sessions) => set(() => ({ sessions })),
			setMode: (mode) => set(() => ({ mode })),
			setInfo: (info) => set(() => ({ ...info })),
		}),
		{
			name: "info",
		},
	),
);

// export const infoSelector = selector({
//   key: "infoSelector",
//   get: ({ get }) => get(infoAtom),
//   set: ({ set, get }, newInfo) => {
//     const info = newInfo as InfoTimer;
//     const { timers } = get(configAtom);
//     const timerState = get(timerSelector);
//     const newMode = info.mode;
//     const timer = Number(timers[newMode]);
//     const newInfoState: InfoTimer = {
//       ...info,
//       mode: newMode,
//     };
//     set(infoAtom, newInfoState);
//     set(timerSelector, { ...timerState, timer });
//   },
// });
