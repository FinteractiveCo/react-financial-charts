import { Divider, Group, Select, Stack } from "@mantine/core";
import ChartRenderer from "./StockChart";
import React from "react";
import TimeFramePicker from "./Components/TimeFramePicker";
import ChartTypePicker from "./Components/ChartTypePicker";
import { withData } from "./Datafeed";

// @ts-ignore
const Chart = withData("D1", "EURUSD")(ChartRenderer);

const Terminal = (): React.ReactElement<any> => {
  return (
    <Stack h={"100%"} spacing={0}>
      <Group spacing={0}>
        <Select
          placeholder="Pick one"
          searchable
          defaultValue={"EURUSD"}
          nothingFound="No options"
          data={["EURUSD", "Angular", "Svelte", "Vue"]}
        />
        <Divider orientation="vertical" />
        <TimeFramePicker />
        <Divider orientation="vertical" />
        <ChartTypePicker />
      </Group>
      <Chart />
    </Stack>
  );
};

export { Terminal };

export default Terminal;
