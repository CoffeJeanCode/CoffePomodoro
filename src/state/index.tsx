import { prop } from "ramda";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { Task } from "../types/tasks.types";
import { getDate, minutesToSeconds } from "../utils/time.util";
import { ALARMS, LONG_BREAK, SHORT_BREAK, WORK } from "./constants";

const { persistAtom } = recoilPersist();

const defaultTimers = {
  [WORK]: minutesToSeconds(25),
  [SHORT_BREAK]: minutesToSeconds(5),
  [LONG_BREAK]: minutesToSeconds(10)
};

export const config = atom({
  key: "pomodoroConfig",
  default: {
    timers: defaultTimers,
    notification: {
      alarm: ALARMS["Micellaneus"],
      desktopNofitication: Notification.permission === "granted",
      volume: 0.5
    },
    canAutoPlay: false
  },
  effects: [persistAtom]
});

export const currentTask = atom<Task>({
  key: "currentTask",
  default: {
    id: "",
    title: "",
    cateogory: "",
    times: 1
  },
  effects: [persistAtom]
});

export const currentTimer = atom({
  key: "currentTimer",
  default: 0,
  effects: [persistAtom]
});

export const currentIcon = atom({
  key: "currentIcon",
  default: "favicon.svg",
  effects: [persistAtom]
});

export const currentDate = atom({
  key: "currentDate",
  default: getDate(new Date()),
  effects: [persistAtom]
});

export const currentPomodoro = atom({
  key: "currentPomodoro",
  default: 1,
  effects: [persistAtom]
});

export const currentMode = atom({
  key: "currentMode",
  default: WORK,
  effects: [persistAtom]
});

export const currentSession = atom({
  key: "currentSession",
  default: 1,
  effects: [persistAtom]
});

export const tasksList = atom<Task[]>({
  key: "tasksList",
  default: [],
  effects: [persistAtom]
});

export const stats = atom({
  key: "stats",
  default: {},
  effects: [persistAtom]
});

export const modeSelector = selector({
  key: "mode",
  get: ({ get }) => get(currentMode),
  set: ({ set, get }, mode) => {
    const newMode = String(mode);
    const { timers } = get(config);
    const timer = Number(prop(newMode)(timers));

    set(currentMode, newMode);
    set(currentTimer, timer);
  }
});
