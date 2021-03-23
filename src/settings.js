import { suscribeEvent } from "./utils/suscribeEvent";

const btnToggle = document.querySelector(".btn_open");
const btnClose = document.querySelector(".btn_close");
const sidebar = document.getElementById("sidebar");
const alarm = document.querySelector(".alarm");

const btnEvent = suscribeEvent(btnToggle, "click", toggleSideBar);
btnEvent.suscribe();

function toggleSideBar() {
  sidebar.classList.toggle("active");
}

export function selectAlarm() {
  const value = alarm.value;
  localStorage.setItem("alarm", value);
  console.log(localStorage.getItem("alarm"));
  return localStorage.getItem("alarm") || value;
}
