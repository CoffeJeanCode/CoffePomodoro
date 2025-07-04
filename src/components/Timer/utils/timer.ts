import { Mode } from "@/models";

export const getNewMode = (mode: Mode, pomodoros: number, calculatedToLongBreak: number) =>
  pomodoros % (calculatedToLongBreak + 1) === 0
    ? Mode.LongBreak
    : mode === Mode.Pomodoro
      ? Mode.ShortBreak
      : Mode.Pomodoro;
