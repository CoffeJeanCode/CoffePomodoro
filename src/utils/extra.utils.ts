import { always, cond, equals } from "ramda";
import { LONG_BREAK, POMODORO, SHORT_BREAK } from "../state/constants";

export const getModeText = cond([
  [equals(POMODORO), always("Work")],
  [equals(SHORT_BREAK), always("Short Break")],
  [equals(LONG_BREAK), always("Long Break")]
]);

export const createId = () => Math.random().toString(16).slice(2);
