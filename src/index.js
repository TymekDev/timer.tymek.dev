import { timeToSeconds, secondsToHMS } from "./time.js";

const countdown = /** @type {Countdown} */ (
  document.getElementById("countdown")
);

let nSeconds = 600;
const timeFromQuery = new URLSearchParams(location.search).get("t");
if (timeFromQuery !== null) {
  try {
    nSeconds = timeToSeconds(timeFromQuery);
    setTimeout(() => countdown.start(), 0);
  } catch {
    console.warn(`query parameter t=${timeFromQuery} has an invalid format`);
  }
}

const { seconds, minutes, hours } = secondsToHMS(nSeconds);
setTimeout(() => countdown.set(seconds, minutes, hours), 0);
