import { FC, useEffect, useState } from "react";
import { IOHLCData } from "./iOHLCData";
import React from "react";

function generateRandomData(
  dataLength = 100,
  changeLastCandleTimes = 5,
  time = new Date().getTime()
) {
  let data = [];
  let open = Math.random() * 100;

  for (let i = 0; i < dataLength; i++) {
    let close = open + Math.random() - 0.5;
    let high = Math.max(open, close) + Math.random() / 5;
    let low = Math.min(open, close) - Math.random() / 5;
    let volume = Math.random() * 1000;

    data.push({
      date: new Date(time),
      open: open,
      close: close,
      high: high,
      low: low,
      volume: volume,
    });

    time += 24 * 60 * 60 * 1000; // Increment by one day
    open = close; // The next day's opening price is today's closing price
  }

  return data;
}

interface WithOHLCDataProps {
  readonly data: IOHLCData[];
}

interface WithOHLCState {
  data?: IOHLCData[];
  message: string;
}

function modifyLastCandle(data: IOHLCData[]) {
  data[data.length - 1] = {
    ...data[data.length - 1],
    close: data[data.length - 1].close + Math.random() / 100 - 0.05,
  };
  return data;
}

export function withOHLCData(dataSet = "DAILY") {
  return <TProps extends WithOHLCDataProps>(
    OriginalComponent: React.ComponentType<TProps>
  ) => {
    const WithOHLCData: React.FC<Omit<TProps, "data">> = (props) => {
      const [data, setData] = useState<IOHLCData[]>(
        generateRandomData(120, 20)
      );
      const [message, setMessage] = useState(`Loading ${dataSet} data...`);

      if (data === undefined) {
        return <div className="center">{message}</div>;
      }

      return <OriginalComponent {...(props as TProps)} data={data} />;
    };

    return WithOHLCData;
  };
}
