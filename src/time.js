/**
 * A string representing time. Consists of up to three components:
 *  1. hours (h)
 *  2. minutes (m)
 *  3. seconds (s)
 * The order above has to be preserved.
 * @typedef {string} Time
 */

/**
 * @param {number} s seconds
 * @returns {Clock}
 */
export function secondsToClock(s) {
  let seconds = s % 60;
  const m = (s - seconds) / 60;
  let minutes = m % 60;
  const h = (m - minutes) / 60;
  if (h > 99) {
    seconds = 59;
    minutes = 59;
    console.warn("capping time at 99:59:59");
  }
  const hours = h % 100;
  return new Clock(seconds, minutes, hours);
}

/**
 * @param {Time} time
 * @returns {number} seconds
 */
export function timeToSeconds(time) {
  validateTime(time);
  let hours = "0";
  let minutes = "0";
  let seconds = "0";
  if (/^\d+h/.test(time)) {
    [hours, time] = time.split("h");
  }
  if (/^\d+m/.test(time)) {
    [minutes, time] = time.split("m");
  }
  if (/^\d+s$/.test(time)) {
    seconds = time.slice(0, -1);
  }
  return (
    Number.parseInt(hours, 10) * 3600 +
    Number.parseInt(minutes, 10) * 60 +
    Number.parseInt(seconds, 10)
  );
}

/**
 * @param {Time} time
 */
export function validateTime(time) {
  if (time === "" || !/^(\d+h)?(\d+m)?(\d+s)?$/.test(time)) {
    throw new Error("invalid time format");
  }
}

export class Clock {
  /**
   * @param {number} seconds
   * @param {number} minutes
   * @param {number} hours
   */
  constructor(seconds, minutes, hours) {
    this.seconds = seconds;
    this.minutes = minutes;
    this.hours = hours;
  }

  tick() {
    if (this.seconds > 0) {
      this.seconds -= 1;
      return;
    }
    if (this.minutes > 0) {
      this.seconds = 59;
      this.minutes -= 1;
      return;
    }
    if (this.hours > 0) {
      this.seconds = 59;
      this.minutes = 59;
      this.hours -= 1;
      return;
    }
    throw new Error("time has run out");
  }

  /**
   * @param {(seconds: number, minutes: number, hours: number) => void} callback
   */
  run(callback) {
    this.interval = setInterval(() => {
      this.tick();
      callback(this.seconds, this.minutes, this.hours);
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}
