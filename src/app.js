import { F, forEach } from "ramda";
import soundAlarm from "./sounds/bubbles.mp3";
import { modifierElement, queryDocument, suscribeEvent } from "./utils/dom";
import { svgPaths } from "./utils/ilutrationsPaths";
import { makeState } from "./utils/makeState";
import { render } from "./utils/render";
import {
  getCountdown,
  getEndTime,
  millisToSegs,
  segsToMillis,
} from "./utils/time";

const getDOMElement = queryDocument(document);
const clickEvent = suscribeEvent("click");

const state = makeState({
  countDown: null,
  isPlaying: F(),
});

export const App = () => ({
  run: () => {
    const endTimeDisplay = getDOMElement("#timer-endtime").select;
    const timerDisplay = getDOMElement("#timer-display").select;
    const buttons = getDOMElement("#timer-button").selectAll;
    const sound = modifierElement(getDOMElement("#sound").select);
    const ilustrationContainer = getDOMElement(".ilustration").select;

    const timer = (seconds) => {
      clearInterval(state.getState().countDown);

      const now = Date.now();
      const endTime = now + segsToMillis(seconds);

      render(document, "title")`${getCountdown(seconds)} | Pomodoro's Timer`;
      render(timerDisplay)`${getCountdown(seconds)}`;
      render(endTimeDisplay)`Be Back at ${getEndTime(endTime)}`;

      state.setState({
        countDown: setInterval(() => {
          const secondsLeft = millisToSegs(endTime - Date.now());
          if (secondsLeft < 0) {
            sound((s) => {
              s.volume = 0.5;
              s.setAttribute("src", soundAlarm);
              s.play();
            });

            clearInterval(state.getState().countDown);
            return;
          }

          const countDown = getCountdown(secondsLeft);

          render(document, "title")`${countDown} | Pomodoro's Timer`;
          render(timerDisplay)`${countDown}`;
        }, 1000),
        isPlaying: true
      });
    };

    forEach((button) => {
      clickEvent(button, () => {
        const { time, ilustration } = button.dataset;
        const seconds = parseInt(time);

        render(ilustrationContainer, "innerHTML")`${svgPaths[ilustration]}`;
        timer(seconds);
      });
    }, buttons);
  },
});
