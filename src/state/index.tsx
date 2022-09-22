import { identity, prop } from "ramda";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Task } from "../types/tasks.types";
import { minutesToSeconds } from "../utils/time.util";
import { LONG_BREAK, SHORT_BREAK, WORK } from "./constants";
import Interface from "../assets/Interface.mp3";
import Micellaneus from "../assets/Miscellaneus.mp3";

const { persistAtom } = recoilPersist();

export const timersConfig = atom({
  key: "timerConfig",
  default: {
    alarms: {
      Micellaneus: { title: "Micellaneus", url: Micellaneus },
      Interface: { title: "Interface", url: Interface },
    },
    timers: {
      [WORK]: minutesToSeconds(25),
      [SHORT_BREAK]: minutesToSeconds(5),
      [LONG_BREAK]: minutesToSeconds(10),
    },
  },
  effects: [persistAtom],
});

export const currentTimer = atom({
  key: "currentTimer",
  default: 0,
  effects: [persistAtom],
});

export const currentAlarm = atom({
  key: "currentAlarm",
  default: { title: "Micellaneus", url: Micellaneus },
  effects: [persistAtom],
});

export const currentMode = atom({
  key: "currentMode",
  default: WORK,
  effects: [persistAtom],
});

export const currentSession = atom({
  key: "currentSession",
  default: 1,
});

export const tasksList = atom<Task[]>({
  key: "tasksList",
  default: [],
  effects: [persistAtom],
});

export const modeSelector = selector({
  key: "mode",
  get: ({ get }) => get(currentMode),
  set: ({ set, get }, mode) => {
    const newMode = String(mode);
    const { timers } = get(timersConfig);
    const timer = Number(prop(newMode)(timers));

    set(currentMode, newMode);
    set(currentTimer, timer);
  },
});

export const alarmSelector = selector({
  key: "alarm",
  get: ({ get }) => get(currentAlarm),
  set: ({ set, get }, alarmKey) => {
    const { alarms } = get(timersConfig);

    set(currentAlarm, alarms[alarmKey]);
  },
});