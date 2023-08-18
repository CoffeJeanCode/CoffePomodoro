import { Weekday } from "@/models/stats";
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

export const getToday = (date: Date) => {
	const $date = new Date(date);
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const todayNumber = $date.getDay();
	const today = days[todayNumber];
	return Weekday[today as keyof typeof Weekday];
};
export const getWeekday = (day: number) => DAYS[day] ?? DAYS[0];

export const getCurrentWeek = (currentDate: Date) => {
	const $date = new Date(currentDate);
	const currentYear = $date.getFullYear();
	const startYearDate = new Date(currentYear, 0, 1);
	return Math.ceil(Math.floor(($date.valueOf() - startYearDate.valueOf()) / (24 * 60 * 60 * 1000)) / 7);
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

export const isToday = (date: Date) => {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};

export const startOfWeek = (date: Date, weekStartsOn: number): Date => {
	const day = date.getDay();
	const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	return new Date(date.getFullYear(), date.getMonth(), date.getDate() - diff);
};

export const getNextFirstDate = (date = new Date()) => {
	const dateCopy = new Date(date.getTime());

	return new Date(dateCopy.setDate(dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7)));
};
