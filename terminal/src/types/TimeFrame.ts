const SecondsTimeFrame = {
  S1: "S1",
  S5: "S5",
  S15: "S15",
  S30: "S30",
};
const MinutesTimeFrame = {
  M1: "M1",
  M5: "M5",
  M15: "M15",
  M30: "M30",
};
const HoursTimeFrame = {
  H1: "H1",
  H4: "H4",
  H6: "H6",
  H12: "H12",
};
const DaysTimeFrame = {
  D1: "D1",
  W1: "W1",
  MN1: "MN1",
  Q1: "Q1",
  Y1: "Y1",
};

const TimeFrame = {
  ...SecondsTimeFrame,
  ...MinutesTimeFrame,
  ...DaysTimeFrame,
} as const;
type TimeFrame = (typeof TimeFrame)[keyof typeof TimeFrame];

export {
  TimeFrame,
  SecondsTimeFrame,
  MinutesTimeFrame,
  HoursTimeFrame,
  DaysTimeFrame,
};
export default TimeFrame;
