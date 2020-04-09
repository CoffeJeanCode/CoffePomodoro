// Sidebar of settings
const btnToggle = document.querySelector(".btn_toggle");
const btnClose = document.querySelector(".btn_close");
const sidebar = document.querySelector(".sidebar");

btnToggle.addEventListener("click", openSideBar);
btnClose.addEventListener("click", closeSideBar);

function openSideBar() {
  sidebar.classList.toggle("active");
}
function closeSideBar() {
  sidebar.classList.toggle("active");
}

// Settings

const alarm = document.querySelector(".alarm");

export function selectAlarm() {
  const value = alarm.value;
  localStorage.setItem("alarm", value);
  console.log(localStorage.getItem("alarm"));
  return localStorage.getItem("alarm") || value;

  /* 

function setjflkdjs () {
  const vlaue = getVAluue();

}

*/
}
