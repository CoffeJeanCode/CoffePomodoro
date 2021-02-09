import { selectAlarm } from './settings'

let countDown
const timerDisplay = document.getElementsByClassName('display_time_left')
const endTime = document.getElementsByClassName('display_end_time')

const buttons = document.querySelectorAll('#timer-button')
const sound = document.getElementsByClassName('.sound')

function timer(seconds) {
  clearInterval(countDown)

  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  displayEndTime(then)

  countDown = setInterval(async () => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)

    if (secondsLeft <= 0) {
      const valueAlarm = selectAlarm()
      sound.setAttribute('src', `./src/sounds/${valueAlarm}.mp3`)
      sound.play()
      clearTimeout(countDown)
      return
    }

    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remaiderSeconds = seconds % 60
  const adjuestedSeconds = remaiderSeconds < 10 ? '0' : ''
  const display = `${minutes}:${adjuestedSeconds}${remaiderSeconds}`

  document.title = `${display} | Pomodoro's Timer`

  timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const adjuestedHour = hour > 12 ? hour - 12 : hour
  const minutes = end.getMinutes()
  endTime.textContent = `Be Back at ${adjuestedHour}:${minutes}`
}

function startTimer() {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

buttons.forEach((button) => {
  button.addEventListener('click', startTimer)
})
