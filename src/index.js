import soundAlarm from "./sounds/bubbles.mp3";
import { svgPaths } from "./utils/ilutrationsPaths";
import { makeState } from "./utils/makeState";
import { render } from "./utils/render";
import { suscribeEvent } from "./utils/suscribeEvent";
import "./styles/styles.scss";

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjuestedHour = hour > 12 ? hour - 12 : hour;
  const minutes = String(end.getMinutes()).padStart(2, "0");
  return `Be Back at ${adjuestedHour}:${minutes}`;
};

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remaiderSeconds = seconds % 60;
  const adjuestedSeconds = remaiderSeconds < 10 ? "0" : "";
  const display = `${minutes}:${adjuestedSeconds}${remaiderSeconds}`;

  return display;
};

const app = () => {
  const state = makeState({
    countDown: null,
  });

  const sound = document.getElementById("sound");
  const endTimeDisplay = document.getElementById("timer-endtime");
  const timerDisplay = document.getElementById("timer-display");
  const buttons = document.querySelectorAll("#timer-button");
  const ilustration = document.getElementById("ilustration");

  const timer = (seconds) => {
    clearInterval(state.getState().countDown);

    const now = Date.now();
    const endTime = now + seconds * 1000;

    render(document, "title")`${displayTimeLeft(seconds)} | Pomodoro's Timer`;
    render(timerDisplay)`${displayTimeLeft(seconds)}`;

    render(endTimeDisplay)`${displayEndTime(endTime)}`;

    state.setState({
      countDown: setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);

        if (secondsLeft < 0) {
          sound.setAttribute("src", soundAlarm);
          sound.volume = 0.5;
          sound.play();

          clearInterval(state.getState().countDown);
          return;
        }

        render(document, "title")`${displayTimeLeft(
          secondsLeft
        )} | Pomodoro's Timer`;
        render(timerDisplay)`${displayTimeLeft(secondsLeft)}`;
      }, 1000),
    });
  };

  buttons.forEach(
    suscribeEvent("click", (_, button) => {
      const { time, responsability } = button.dataset;
      const seconds = parseInt(time);
      render(ilustration, "innerHTML")`${svgPaths[responsability]}`;
      timer(seconds);
    })
  );
};

document.addEventListener("DOMContentLoaded", app);
