import { divide, multiply, pipe, __ } from "ramda";

export const segsToMillis = multiply(1000);

export const millisToSegs = pipe(divide(__, 1000), Math.round);

export const getEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjuestedHour = hour > 12 ? hour - 12 : hour;
  const minutes = String(end.getMinutes()).padStart(2, "0");

  return `${adjuestedHour}:${minutes}`;
};

export const getCountdown = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remaiderSeconds = seconds % 60;
  const adjuestedSeconds = remaiderSeconds < 10 ? "0" : "";

  return `${minutes}:${adjuestedSeconds}${remaiderSeconds}`;
};
