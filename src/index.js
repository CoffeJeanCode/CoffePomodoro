import { suscribeEvent } from "./utils/suscribeEvent";
import soundAlarm from "./sounds/bubbles.mp3";
import "./styles/styles.scss";
import { svgPaths } from "./utils/ilutrationsPaths";

const app = () => {
  let countDown;

  const sound = document.getElementById("sound");
  const endTime = document.getElementById("timer-endtime");
  const timerDisplay = document.getElementById("timer-display");
  const buttons = document.querySelectorAll("#timer-button");
  const ilustration = document.getElementById("ilustration");

  const displayEndTime = (timestamp) => {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjuestedHour = hour > 12 ? hour - 12 : hour;
    const minutes = String(end.getMinutes()).padStart(2, "0");

    endTime.textContent = `Be Back at ${adjuestedHour}:${minutes}`;
  };

  const displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remaiderSeconds = seconds % 60;
    const adjuestedSeconds = remaiderSeconds < 10 ? "0" : "";
    const display = `${minutes}:${adjuestedSeconds}${remaiderSeconds}`;

    document.title = `${display} | Pomodoro's Timer`;

    timerDisplay.textContent = display;
  };

  const timer = (seconds) => {
    clearInterval(countDown);

    const now = Date.now();
    const endTime = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(endTime);

    countDown = setInterval(() => {
      const secondsLeft = Math.round((endTime - Date.now()) / 1000);

      if (secondsLeft < 0) {
        sound.setAttribute("src", soundAlarm);
        sound.play();
        clearTimeout(countDown);
        return;
      }

      displayTimeLeft(secondsLeft);
    }, 1000);
  };

  buttons.forEach(
    suscribeEvent("click", (_, button) => {
      const { time, responsability } = button.dataset;
      const seconds = parseInt(time);

      ilustration.innerHTML = svgPaths[responsability];

      timer(seconds);
    })
  );
};

document.addEventListener("DOMContentLoaded", app);
