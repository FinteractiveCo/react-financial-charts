import { format } from "d3-format";
import { useMantineColorScheme } from "@mantine/core";
import React, { useMemo, useState } from "react";

import { timeFormat } from "d3-time-format";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  withDeviceRatio,
  withSize,
} from "react-financial-charts";
import { darkTheme, lightTheme } from "./theme";
import { ICandle } from "./types/ICandle";

export interface StockChartStyle {
  readonly backgroundColor: string;
  readonly showGridLines: boolean;
  readonly strokeWidth: number;
  readonly arrowWidth?: number;
}

export interface StockChartProps {
  readonly data: ICandle[];
  readonly height: number;
  readonly dateTimeFormat?: string;
  readonly width: number;
  readonly ratio: number;
  readonly style?: StockChartStyle;
}

const defaultStyle: StockChartStyle = {
  backgroundColor: "#131722",
  showGridLines: false,
  strokeWidth: 0.5,
  arrowWidth: 10,
};

const ChartRenderer = ({
  data: initialData,
  dateTimeFormat = "%d %b",
  height,
  ratio,
  width,
  style = defaultStyle,
}: StockChartProps): React.ReactElement<StockChartProps> => {
  const { colorScheme } = useMantineColorScheme();

  const getColor = (propperty: string) => {
    return colorScheme === "dark"
      ? darkTheme[propperty]
      : lightTheme[propperty];
  };

  const margin = { left: 0, right: 48, top: 0, bottom: 24 };
  const pricesDisplayFormat = format(".3f");

  if (!initialData) {
    return <div>Loading...</div>;
  }

  const xScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d: ICandle) => d.time
    );

  const { data, xScale, xAccessor, displayXAccessor } = useMemo(
    () => xScaleProvider(initialData),
    [initialData, xScaleProvider]
  );

  // Rest of the component...

  const candleChartExtents = (data: ICandle) => [data.high, data.low];
  const yEdgeIndicator = (data: ICandle) => data.close;
  const openCloseColor = (data: ICandle) =>
    data.close > data.open
      ? getColor("candlePositive")
      : getColor("candleNegative");

  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom - 60;

  const chartHeight = gridHeight;

  const timeDisplayFormat = timeFormat(dateTimeFormat);
  return (
    <ChartCanvas
      height={height}
      ratio={ratio}
      width={width}
      margin={margin}
      data={data}
      displayXAccessor={displayXAccessor}
      seriesName="Data"
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      zoomAnchor={lastVisibleItemBasedZoomAnchor}
    >
      <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        <XAxis
          showGridLines={style.showGridLines}
          showTicks={true}
          showTickLabel={true}
          strokeStyle={getColor("strokeStyle")}
          gridLinesStrokeStyle={getColor("gridLinesStrokeStyle")}
          tickLabelFill={getColor("label")}
          strokeWidth={style.strokeWidth}
        />
        <YAxis
          showTicks={false}
          showGridLines={style.showGridLines}
          tickFormat={pricesDisplayFormat}
          gridLinesStrokeStyle={getColor("gridLinesStrokeStyle")}
          strokeStyle={getColor("strokeStyle")}
          tickLabelFill={getColor("label")}
          strokeWidth={style.strokeWidth}
          zoomEnabled={true}
        />
        <CandlestickSeries
          fill={(data: ICandle) =>
            data.close > data.open
              ? getColor("candlePositive")
              : getColor("candleNegative")
          }
        />

        <MouseCoordinateX displayFormat={timeDisplayFormat} />
        <MouseCoordinateY
          arrowWidth={style.arrowWidth}
          rectWidth={margin.right}
          displayFormat={pricesDisplayFormat}
          fill={getColor("mouseCoordinate")}
          textFill={getColor("mouseCoordinateText")}
        />
        <EdgeIndicator
          itemType="last"
          rectWidth={margin.right}
          fill={openCloseColor}
          lineStroke={openCloseColor}
          displayFormat={pricesDisplayFormat}
          yAccessor={yEdgeIndicator}
          arrowWidth={style.arrowWidth}
        />

        <OHLCTooltip
          origin={[8, 16]}
          labelFill={getColor("labelSecondary")}
          textFill={getColor("label")}
        />
      </Chart>
      <CrossHairCursor strokeStyle={getColor("crossHairCursorColor")} />
    </ChartCanvas>
  );
};

const ChartRenderer_ = withSize({ style: { minHeight: 600 } })(
  withDeviceRatio()(ChartRenderer)
);

export default ChartRenderer_;
