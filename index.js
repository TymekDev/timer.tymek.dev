const presets = ["30s", "1m", "5m", "10m"];
const slots = {
  time: document.getElementById("time"),
  menu: document.querySelector("menu"),
};

initialize();

function initialize() {
  initializeTimeInput();
  slots.menu.append(...presets.map(timePresetButton));
}

function initializeTimeInput() {
  const query = new URLSearchParams(location.search);
  const time = query.get("t");
  try {
    updateTimeInput(time);
    presets.push(time);
  } catch ({ message }) {
    console.warn(`Ignoring query parameter 't' (${message})`);
  }
}

function timePresetButton(time) {
  const button = document.createElement("button");
  button.textContent = time;
  button.addEventListener("click", () => updateTimeInput(time));
  return button;
}

function updateTimeInput(time) {
  validateTime(time);
  slots.time.value = time;
}

function validateTime(time) {
  if (!/^(\d+m\d+s|\d+m|\d+s)$/.test(time)) {
    throw new Error("invalid time format", { cause: { time } });
  }
}

function timeToSeconds(time) {
  validateTime(time);
  let minutes = 0;
  let seconds = 0;
  if (/^\d+m/.test(time)) {
    [minutes, time] = time.split("m");
  }
  if (/^\d+s$/.test(time)) {
    seconds = time.slice(0, -1);
  }
  return parseInt(minutes) * 60 + parseInt(seconds);
}
