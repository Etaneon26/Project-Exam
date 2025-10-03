let hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0;
let timer = null;
let running = false;
let lapCount = 0;

const display = document.querySelector("#display");
const lapsList = document.querySelector("#laps");

function format(num, size) {
  let str = num.toString();
  while (str.length < size) str = "0" + str;
  return str;
}

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds.toString().length < 3
      ? ("00" + milliseconds).slice(-3)
      : milliseconds;

  display.textContent = `${h}:${m}:${s}.${ms}`;
}

function tick() {
  milliseconds += 10;
  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

function startTimer() {
  if (!running) {
    running = true;
    timer = setInterval(tick, 10);
  }
}

function stopTimer() {
  running = false;
  clearInterval(timer);
}

function resetTimer() {
  running = false;
  clearInterval(timer);
  hours = minutes = seconds = milliseconds = 0;
  lapCount = 0;
  updateDisplay();
  lapsList.innerHTML = "";
}

function lapTime() {
  if (running) {
    lapCount++;
    let li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${display.textContent}`;
    lapsList.appendChild(li);
  }
}
