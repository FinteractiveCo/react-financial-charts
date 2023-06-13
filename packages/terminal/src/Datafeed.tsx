import { useEffect, useState } from "react";
import React from "react";
import DatacenterClient, { Resolution } from "datacenter-js-client";
import TimeFrame from "./types/TimeFrame";
import { ICandle } from "react-financial-charts";

const apiClient = new DatacenterClient("https://api-atc.finteractive.co/dev");

interface WithOHLCDataProps {
  readonly data: ICandle[];
}

interface WithOHLCState {
  data?: ICandle[];
  message: string;
}

export function withData(
  timeframe: TimeFrame = "1D",
  symbol: string,
  fromTimestamp: number = 0,
  toTimestamp: number = Math.ceil(Date.now() / 1000)
) {
  const getData = async () => {
    const data = await apiClient.getCandles({
      symbol,
      resolution: timeframe as Resolution,
      fromTimestamp,
      toTimestamp,
    });
    return data.map((candle: any) => ({
      time: new Date(candle.time),
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
      bidVolume: candle.bidVolume,
      askVolume: candle.askVolume,
    }));
  };

  return <TProps extends WithOHLCDataProps>(
    OriginalComponent: React.ComponentType<TProps>
  ) => {
    const WithOHLCData: React.FC<Omit<TProps, "data">> = (props) => {
      const [data, setData] = useState<ICandle[]>();
      const [message, setMessage] = useState(`Loading data...`);

      useEffect(() => {
        getData()
          .then((data) => {
            setData(data);
          })
          .catch((error) => {
            setMessage(`Error loading data: ${error.message}`);
          });
      }, []);

      if (data === undefined) {
        return <div className="center">{message}</div>;
      }

      return <OriginalComponent {...(props as TProps)} data={data} />;
    };

    return WithOHLCData;
  };
}
