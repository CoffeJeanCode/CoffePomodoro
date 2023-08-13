import { Mode } from "./info";
type Alarm = {
  title: string;
  url: string;
};

export interface Timers {
  [Mode.Pomodoro]: number;
  [Mode.ShortBreak]: number;
  [Mode.LongBreak]: number;
}

export interface Notification {
  alarm: Alarm;
  desktopNofitication: boolean;
  volume: number;
}

export interface Behaviur {
  canAutoPlay: boolean;
  pomodorosToLongBreak: number;
}

export interface Configuration {
  timers: Timers;
  notification: Notification;
  behaviur: Behaviur;
}
