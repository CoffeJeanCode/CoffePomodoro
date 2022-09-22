import { compose, divide, modulo, multiply, __ } from "ramda";

export const minutesToSeconds = multiply(60);
export const secondsToMinutes = compose(Math.floor, divide(__, 60));
export const secondsToMilliseconds = multiply(1000);
export const millisecondsToSeconds = compose(Math.round, divide(__, 1000));
export const getSeconds = modulo(__, 60);
export const formatTime = (n: number) => (n < 10 ? `0${n}` : String(n));
export const formatSun = (n: number) => (n > 12 ? "p.m" : "a.m");

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

  return `${adjustedHour}:${minutes} ${formatSun(adjustedHour)}`;
};
