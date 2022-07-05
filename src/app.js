import { F, forEach, isNil, T } from "ramda";
import { alarms } from "./alarms";
import { clickEvent, getDOMElement } from "./helpers";
import { Settings } from "./settings";
import { modifierElement } from "./utils/dom";
import { FN } from "./utils/fn";
import { svgPaths } from "./ilutrationsPaths";
import { makeState } from "./utils/makeState";
import { render } from "./utils/render";
import {
  getCountdown,
  getEndTime,
  millisToSegs,
  segsToMillis,
} from "./utils/time";

const state = makeState({
  countDown: null,
  isPlaying: F(),
  session: 0,
  alarm: alarms.bubbles,
});

export const App = () => ({
  run: () => {
    const settings = Settings(state);
    settings.init();

    const {
      endTimeDisplay,
      timerDisplay,
      statusButton,
      buttons,
      sound,
      ilustrationContainer,
    } = App().DOM();

    const timer = (seconds) => {
      clearInterval(state.getState().countDown);

      const now = Date.now();
      const endTime = now + segsToMillis(seconds);

      render(document, "title")`${getCountdown(seconds)} | Pomodoro's Timer`;
      render(timerDisplay)`${getCountdown(seconds)}`;
      render(endTimeDisplay)`Be Back at ${getEndTime(endTime)}`;

      state.setState({
        countDown: setInterval(() => {
          if (state.getState().isPlaying) {
            const secondsLeft = millisToSegs(endTime - Date.now());
            if (secondsLeft < 0) {
              sound((s) => {
                s.volume = 0.5;
                s.setAttribute("src", state.getState().alarm);
                s.play();
              });

              clearInterval(state.getState().countDown);
              return;
            }

            const countDown = getCountdown(secondsLeft);

            render(document, "title")`${countDown} | CoffePomodoro`;
            render(timerDisplay)`${countDown}`;
          }
        }, 1000),
        isPlaying: T(),
      });
    };

    clickEvent(statusButton(FN), () => {
      const { isPlaying, countDown } = state.getState();

      if (isNil(countDown)) return;

      state.setState({
        isPlaying: isPlaying ? F() : T(),
      });
      render(statusButton(FN), "innerHTML")`
          <i class="fas ${isPlaying ? "fa-play" : "fa-pause"}"></i>
       `;
    }).add();

    forEach((button) => {
      clickEvent(button, () => {
        const { time, ilustration } = button.dataset;
        const seconds = parseInt(time);

        render(ilustrationContainer, "innerHTML")`${svgPaths[ilustration]}`;
        timer(seconds);
      }).add();
    }, buttons);
  },
  DOM: () => ({
    endTimeDisplay: getDOMElement("#timer-endtime").select,
    timerDisplay: getDOMElement("#timer-display").select,
    statusButton: modifierElement(getDOMElement("#timer-status").select),
    buttons: getDOMElement("#timer-button").selectAll,
    sound: modifierElement(getDOMElement("#sound").select),
    ilustrationContainer: getDOMElement(".ilustration").select,
  }),
});
