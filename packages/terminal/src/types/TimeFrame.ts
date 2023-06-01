export enum SecondsTimeframe {
  "1S" = "1S",
  "5S" = "5S",
  "10S" = "10S",
  "15S" = "15S",
  "30S" = "30S",
}
export enum MinutesTimeframe {
  "1M" = "1M",
  "3M" = "3M",
  "5M" = "5M",
  "15M" = "15M",
  "30M" = "30M",
  "45M" = "45M",
}
export enum HoursTimeframe {
  "1H" = "1H",
  "2H" = "2H",
  "3H" = "3H",
  "4H" = "4H",
}
export enum DaysTimeframe {
  "1D" = "1D",
  "1W" = "1W",
  "M1" = "M1",
  "M6" = "M6",
  "Y" = "Y",
}

export type Timeframe =
  | SecondsTimeframe
  | MinutesTimeframe
  | HoursTimeframe
  | DaysTimeframe;
