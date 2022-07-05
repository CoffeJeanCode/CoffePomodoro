import { alarms } from "./alarms";
import { changeEvent, clickEvent, getDOMElement } from "./helpers";

export const Settings = (state) => ({
  init: () => {
    const { sidebar, btnToggle, btnClose, alarm } = Settings(state).DOM();
    const btnToggleClickEvent = clickEvent(btnToggle, () => {
      sidebar.classList.toggle("active");
    });
    const btnCloseClickEvent = clickEvent(btnClose, () => {
      sidebar.classList.remove("active");
    });

    const alarmSelectEvent = changeEvent(alarm, (evt) => {
      localStorage.setItem("alarm", evt.target.value);

      const value = localStorage.getItem("alarm") || evt.target.value;

      state.setState({
        alarm: alarms[value],
      });
    });

    alarmSelectEvent.add();
    btnToggleClickEvent.add();
    btnCloseClickEvent.add();
  },
  DOM: () => ({
    sidebar: getDOMElement("#sidebar").select,
    btnToggle: getDOMElement(".setting").select,
    btnClose: getDOMElement(".btn__close").select,
    alarm: getDOMElement(".alarm").select,
  }),
});
