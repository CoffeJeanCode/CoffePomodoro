import { LONG_BREAK, POMODORO, SHORT_BREAK } from "../state/constants";

export interface Timers {
  [POMODORO]: number;
  [SHORT_BREAK]: number;
  [LONG_BREAK]: number;
}

type Alarm = {
  title: string;
  url: string;
};

export interface Configuration {
  timers: Timers;
  notification: {
    alarm: Alarm;
    desktopNofitication: boolean;
    volume: number;
  };
  canAutoPlay: boolean;
}
