import { __, compose, divide, modulo, multiply } from "ramda";
import { DAYS } from "../stores/constants";

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

export const getCurrentWeek = (currentDate: Date) => {
	const startYearDate = new Date(currentDate.getFullYear(), 0, 1);

	return Math.ceil(Math.floor((currentDate.valueOf() - startYearDate.valueOf()) / (24 * 60 * 60 * 1000)) / 7);
};

export const getTime = (rawSeconds: number) => {
	const minutes = secondsToMinutes(rawSeconds);
	const seconds = getSeconds(rawSeconds);
	const formatedMinutes = formatTime(minutes);
	const formatedSeconds = formatTime(seconds);
	return rawSeconds > 0 ? `${formatedMinutes}:${formatedSeconds}` : "00:00";
};

export const getEndTime = (timestamp: number) => {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = formatTime(end.getMinutes());

	return `${adjustedHour}:${minutes} ${formatSun(hour)}`;
};

export const isToday = (date: string) => getDate(new Date()) === date;

export const getNextFirstDate = (date = new Date()) => {
	const dateCopy = new Date(date.getTime());

	return new Date(dateCopy.setDate(dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7)));
};
