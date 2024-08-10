import { expect, test } from "vitest";
import { secondsToClock, timeToSeconds, validateTime, Clock } from "./time";

test.each([
  "123h123m123s",
  "123h123m",
  "123h123s",
  "123h",
  "123m123s",
  "123m",
  "123s",
  "1h0m0s",
  "0h1m0s",
  "0h0m1s",
  "11111111h2222222222222m3333333333333s",
])('validateTime("%s") does not throw', (time) => {
  expect(validateTime(time)).to.not.throw;
});

test.each(["", "1s1m1h", "1s1h", "1s1m", "1hm1s", "-1h", "0h-1m", "0h0m-1s"])(
  'validateTime("%s") throws',
  (time) => {
    expect(() => validateTime(time)).to.throw;
  },
);

test.each([
  ["0s", 0],
  ["1s", 1],
  ["10s", 10],
  ["999s", 999],
  ["100m999s", 60 * 100 + 999],
  ["1h2m3s", 3600 + 2 * 60 + 3],
  ["99h0m3s", 99 * 3600 + 3],
])('timeToSeconds("%s") -> %d', (time, expected) => {
  expect(timeToSeconds(time)).to.equal(expected);
});

test.each([
  [10, { seconds: 10, minutes: 0, hours: 0 }],
  [60, { seconds: 0, minutes: 1, hours: 0 }],
  [3600, { seconds: 0, minutes: 0, hours: 1 }],
  [3600 + 2 * 60 + 3, { seconds: 3, minutes: 2, hours: 1 }],
  [3600 * 99 + 59 * 60 + 59, { seconds: 59, minutes: 59, hours: 99 }],
  [3600 * 9999, { seconds: 59, minutes: 59, hours: 99 }],
])("secondsToClock(%d) -> %s", (seconds, expected) => {
  expect(secondsToClock(seconds)).toEqual(expected);
});

test.each([
  [
    { seconds: 1, minutes: 0, hours: 0 },
    { seconds: 0, minutes: 0, hours: 0 },
  ],
  [
    { seconds: 0, minutes: 1, hours: 0 },
    { seconds: 59, minutes: 0, hours: 0 },
  ],
  [
    { seconds: 0, minutes: 0, hours: 1 },
    { seconds: 59, minutes: 59, hours: 0 },
  ],
  [
    { seconds: 3, minutes: 2, hours: 1 },
    { seconds: 2, minutes: 2, hours: 1 },
  ],
])(
  "Clock($seconds, $minutes, $hours).tick() reduces time by 1 second",
  (seconds, expected) => {
    const clock = new Clock(seconds.seconds, seconds.minutes, seconds.hours);
    clock.tick();
    expect(clock).toEqual(expected);
  },
);

test("Clock.tick() throws when it has 0 seconds, 0 minutes, and 0 hours", () => {
  const clock = new Clock(0, 0, 0);
  expect(() => clock.tick()).to.throw;
});
