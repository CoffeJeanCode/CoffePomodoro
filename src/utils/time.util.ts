import { compose, divide, modulo, multiply, __ } from "ramda";
import { DAYS } from "../state/constants";

export const minutesToSeconds = multiply(60);
export const secondsToMinutes = compose(Math.floor, divide(__, 60));
export const secondsToMilliseconds = multiply(1000);
export const millisecondsToSeconds = compose(Math.round, divide(__, 1000));
export const getSeconds = modulo(__, 60);
export const formatTime = (n: number) => (n < 10 ? `0${n}` : String(n));
export const formatSun = (n: number) => (n >= 12 ? "p.m" : "a.m");

export const getDate = (date: Date) =>
  [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
  ].join("-");

export const getWeekday = (day: number) => DAYS[day] ?? DAYS[0];

export const getTime = (rawSeconds: number) => {
  const minutes = secondsToMinutes(rawSeconds);
  const seconds = getSeconds(rawSeconds);
  const formatedMinutes = formatTime(minutes);
  const formatedSeconds = formatTime(seconds);
  return `${formatedMinutes}:${formatedSeconds}`;
};

export const getEndTime = (timestamp: number) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = formatTime(end.getMinutes());

  return `${adjustedHour}:${minutes} ${formatSun(hour)}`;
};

export const isToday = (date: string) => (is: any, isnt: any) =>
  getDate(new Date()) === date ? is : isnt;
