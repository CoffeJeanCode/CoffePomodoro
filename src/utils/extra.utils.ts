import { always, cond, equals } from "ramda";
import { LONG_BREAK, SHORT_BREAK, WORK } from "../state/constants";

export const getModeText = cond([
  [equals(WORK), always("Work")],
  [equals(SHORT_BREAK), always("Short Break")],
  [equals(LONG_BREAK), always("Long Break")],
]);
