import { format } from "d3-format";
import { useMantineColorScheme, ActionIcon, Group, Text } from "@mantine/core";
import React, { useMemo, useState } from "react";
import SplitPane, { Pane } from "split-pane-react";

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
  ZoomButtons,
  withDeviceRatio,
  withSize,
} from "react-financial-charts";
import { IOHLCData, withOHLCData, withUpdatingData } from "../../data";
import { darkTheme, lightTheme } from "./theme";

export interface StockChartStyle {
  readonly backgroundColor: string;
  readonly showGridLines: boolean;
  readonly strokeWidth: number;
  readonly arrowWidth?: number;
}

export interface StockChartProps {
  readonly data: IOHLCData[];
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

const StockChart = ({
  data: initialData,
  dateTimeFormat = "%d %b",
  height,
  ratio,
  width,
  style = defaultStyle,
}: StockChartProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [sizes, setSizes] = useState([100, "30%", "auto"]);

  const getColor = (propperty: string) => {
    return colorScheme === "dark"
      ? darkTheme[propperty]
      : lightTheme[propperty];
  };

  const margin = { left: 0, right: 48, top: 0, bottom: 24 };
  const pricesDisplayFormat = format(".2f");
  const xScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d: IOHLCData) => d.date
    );

  const ema12 = useMemo(
    () =>
      ema()
        .id(1)
        .options({ windowSize: 12 })
        .merge((d: any, c: any) => {
          d.ema12 = c;
        })
        .accessor((d: any) => d.ema12),
    []
  );

  const ema26 = useMemo(
    () =>
      ema()
        .id(2)
        .options({ windowSize: 26 })
        .merge((d: any, c: any) => {
          d.ema26 = c;
        })
        .accessor((d: any) => d.ema26),
    []
  );

  const elder = useMemo(() => elderRay(), []);
  const calculatedData = useMemo(
    () => elder(ema26(ema12(initialData))),
    [initialData, elder, ema26, ema12]
  );

  const { data, xScale, xAccessor, displayXAccessor } = useMemo(
    () => xScaleProvider(calculatedData),
    [calculatedData, xScaleProvider]
  );

  // Rest of the component...

  const barChartExtents = (data: IOHLCData) => data.volume;
  const candleChartExtents = (data: IOHLCData) => [data.high, data.low];
  const yEdgeIndicator = (data: IOHLCData) => data.close;

  const volumeColor = (data: IOHLCData) =>
    data.close > data.open
      ? getColor("volumePositive")
      : getColor("volumeNegative");

  const volumeSeries = (data: IOHLCData) => data.volume;
  const openCloseColor = (data: IOHLCData) =>
    data.close > data.open
      ? getColor("candlePositive")
      : getColor("candleNegative");

  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;

  const elderRayHeight = 123;
  const elderRayOrigin = (_: number, h: number) => [0, h - elderRayHeight];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_: number, h: number) => [
    0,
    h - barChartHeight - elderRayHeight,
  ];
  const chartHeight = gridHeight - elderRayHeight;

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
      <Chart
        id={2}
        height={barChartHeight}
        origin={barChartOrigin}
        yExtents={barChartExtents}
      >
        <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
      </Chart>
      <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        <XAxis
          showGridLines={style.showGridLines}
          showTicks={false}
          showTickLabel={false}
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
          fill={(data: IOHLCData) =>
            data.close > data.open
              ? getColor("candlePositive")
              : getColor("candleNegative")
          }
        />
        <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
        <CurrentCoordinate
          yAccessor={ema26.accessor()}
          fillStyle={ema26.stroke()}
        />
        <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
        <CurrentCoordinate
          yAccessor={ema12.accessor()}
          fillStyle={ema12.stroke()}
        />
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

        <EdgeIndicator
          itemType="last"
          rectWidth={margin.right}
          fill={ema12.stroke()}
          lineStroke={ema12.stroke()}
          displayFormat={pricesDisplayFormat}
          yAccessor={ema12.accessor()}
          arrowWidth={style.arrowWidth}
        />
        <EdgeIndicator
          itemType="last"
          rectWidth={margin.right}
          fill={ema26.stroke()}
          lineStroke={ema26.stroke()}
          displayFormat={pricesDisplayFormat}
          yAccessor={ema26.accessor()}
          arrowWidth={style.arrowWidth}
        />

        <MovingAverageTooltip
          origin={[8, 24]}
          labelFill={getColor("labelSecondary")}
          textFill={getColor("label")}
          options={[
            {
              yAccessor: ema26.accessor(),
              type: "EMA",
              stroke: ema26.stroke(),
              windowSize: ema26.options().windowSize,
            },
            {
              yAccessor: ema12.accessor(),
              type: "EMA",
              stroke: ema12.stroke(),
              windowSize: ema12.options().windowSize,
            },
          ]}
        />

        {/* <ZoomButtons /> */}
        <OHLCTooltip
          origin={[8, 16]}
          labelFill={getColor("labelSecondary")}
          textFill={getColor("label")}
        />
      </Chart>
      <Chart
        id={4}
        height={elderRayHeight}
        yExtents={[0, elder.accessor()]}
        origin={elderRayOrigin}
        padding={{ top: 8, bottom: 8 }}
      >
        <XAxis
          showGridLines={style.showGridLines}
          strokeStyle={getColor("strokeStyle")}
          tickLabelFill={getColor("label")}
          gridLinesStrokeStyle={getColor("gridLinesStrokeStyle")}
          strokeWidth={style.strokeWidth}
        />
        <YAxis
          ticks={4}
          tickLabelFill={getColor("label")}
          showGridLines={style.showGridLines}
          tickFormat={pricesDisplayFormat}
          strokeStyle={getColor("strokeStyle")}
          strokeWidth={style.strokeWidth}
        />

        <MouseCoordinateX
          displayFormat={timeDisplayFormat}
          fill={getColor("mouseCoordinate")}
          textFill={getColor("mouseCoordinateText")}
        />
        <MouseCoordinateY
          rectWidth={margin.right}
          arrowWidth={style.arrowWidth}
          displayFormat={pricesDisplayFormat}
        />

        <ElderRaySeries yAccessor={elder.accessor()} />

        <SingleValueTooltip
          yAccessor={elder.accessor()}
          yLabel="Elder Ray"
          yDisplayFormat={(d: any) =>
            `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
              d.bearPower
            )}`
          }
          origin={[8, 16]}
        />
      </Chart>
      <CrossHairCursor strokeStyle={getColor("crossHairCursorColor")} />
    </ChartCanvas>
  );
};

export default withOHLCData("MINUTES")(
  withUpdatingData()(
    withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
  )
);
