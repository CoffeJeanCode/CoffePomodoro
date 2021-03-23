import "./settings";
import soundAlarm from "./sounds/bubbles.mp3";
import "./styles/styles.scss";
import { suscribeEvent } from "./utils/suscribeEvent";

const app = () => {
  let countDown;

  const timerDisplay = document.getElementById("timer-display");
  const sound = document.getElementById("sound");
  const endTime = document.getElementById("timer-endtime");
  const buttons = document.querySelectorAll("#timer-button");

  function timer(seconds) {
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
  }

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remaiderSeconds = seconds % 60;
    const adjuestedSeconds = remaiderSeconds < 10 ? "0" : "";
    const display = `${minutes}:${adjuestedSeconds}${remaiderSeconds}`;

    document.title = `${display} | Pomodoro's Timer`;

    timerDisplay.textContent = display;
  }

  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjuestedHour = hour > 12 ? hour - 12 : hour;
    const minutes = `0${end.getMinutes()}`.slice(-2);

    endTime.textContent = `Be Back at ${adjuestedHour}:${minutes}`;
  }

  buttons.forEach((button) => {
    const buttonEvent = suscribeEvent(button, "click", () => {
      if (button !== buttonEvent.element) {
        button.setAttribute("disabled", true);
      }
      const seconds = parseInt(button.dataset.time);
      timer(seconds);
    });

    buttonEvent.suscribe();
  });
};

app();
