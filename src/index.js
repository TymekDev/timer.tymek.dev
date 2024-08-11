import { timeToSeconds, secondsToHMS } from "./time.js";

const countdown = /** @type {Countdown} */ (
  document.getElementById("countdown")
);

/**
 * @param {Object} hms
 * @param {number} hms.seconds
 * @param {number} hms.minutes
 * @param {number} hms.hours
 */
function setCountdown({ seconds, minutes, hours }) {
  countdown.setAttribute("seconds", String(seconds));
  countdown.setAttribute("minutes", String(minutes));
  countdown.setAttribute("hours", String(hours));
}

let seconds = 600;
const timeFromQuery = new URLSearchParams(location.search).get("t");
if (timeFromQuery !== null) {
  try {
    seconds = timeToSeconds(timeFromQuery);
    setTimeout(() => countdown.start(), 0);
  } catch {
    console.warn(`query parameter t=${timeFromQuery} has an invalid format`);
  }
}
setCountdown(secondsToHMS(seconds));
