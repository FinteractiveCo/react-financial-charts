export interface ICandle {
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
  readonly time: Date;
  readonly askVolume: number;
  readonly bidVolume: number;
}
