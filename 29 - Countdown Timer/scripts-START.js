'use strict'


document.getElementsByClassName('timer__controls')[0]
    .onclick = ev => {
    const time = ev.target.dataset.time
    if (!time) return

    resetTimer()
    setTimer(+time)
}

document.forms[0].onsubmit = ev => {
    ev.preventDefault()

    resetTimer()
    setTimer(ev.target.minutes.value * 60)

    ev.target.reset()
}

const [
    displayTimeLeft,
    displayEndTime
] = document.querySelectorAll(['.display__time-left', '.display__end-time'])

function getTimeFromSec(_sec) {
    return `${Math.floor(_sec / 60)}:${String(_sec % 60).padStart(2, '0')}`
}

let timerID

function resetTimer() {
    timerID && clearInterval(timerID)
}

function setTimer(sec) {
    let _sec = sec
    let nowSec = new Date().getSeconds()

    displayTimeLeft.textContent = getTimeFromSec(_sec)
    --_sec

    timerID = setInterval(() => {
        if(_sec < 0)
            resetTimer()

        if (nowSec === new Date().getSeconds())
            return

        displayTimeLeft.textContent = getTimeFromSec(_sec)
        nowSec = new Date().getSeconds()
        --_sec
    }, 500)

    displayEndTime.textContent =
        new Date(Date.now() + sec * 1000)
            .toLocaleTimeString()
}