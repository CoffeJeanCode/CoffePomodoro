import { FavIcon, Info, Mode } from "@/models";
import { getCurrentWeek, getDate } from "@/utils/time.util";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeVersion } from "../config";

interface InfoState extends Info {
  setMode: (mode: Mode) => void;
  setFavIcon: (favIcon: FavIcon) => void;
  setPomodoros: (pomodoros: number) => void;
  setSessions: (sessions: number) => void;
  resetInfo: () => void;
}

const todayDate = new Date();

const initialState: Info = {
  favIcon: FavIcon.work,
  mode: Mode.Pomodoro,
  date: { formated: getDate(todayDate), raw: todayDate },
  week: getCurrentWeek(todayDate),
  day: todayDate.getDay(),
  pomodoros: 1,
  sessions: 1,
};

export const useInfoState = create<InfoState>()(
  persist(
    (set) => ({
      ...initialState,
      setFavIcon: (favIcon) => set(() => ({ favIcon })),
      setPomodoros: (pomodoros) => set(() => ({ pomodoros })),
      setSessions: (sessions) => set(() => ({ sessions })),
      setMode: (mode) => set(() => ({ mode })),
      resetInfo: () => set(initialState),
    }),
    {
      name: "info",
      version: storeVersion,
    }
  )
);
