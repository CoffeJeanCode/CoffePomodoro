import { Mode } from "./info";

export interface Timers {
  [Mode.Pomodoro]: number;
  [Mode.ShortBreak]: number;
  [Mode.LongBreak]: number;
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
  behaviur: {
    canAutoPlay: boolean;
    pomodorosToLongBreak: number;
  };
}
