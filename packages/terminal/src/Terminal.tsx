import { Divider, Group, Select, Stack } from "@mantine/core";
import ChartRenderer_ from "./StockChart";
import React from "react";
import TimeFrame from "./Components/Timeframe";
import ChartTypePicker from "./Components/ChartTypePicker";

const Terminal = ({}): React.ReactElement<any> => {
  return (
    <Stack h={"100%"}>
      <Group spacing={0}>
        <Select
          placeholder="Pick one"
          searchable
          defaultValue={"EURUSD"}
          nothingFound="No options"
          data={["EURUSD", "Angular", "Svelte", "Vue"]}
        />
        <Divider orientation="vertical" />
        <TimeFrame />
        <Divider orientation="vertical" />
        <ChartTypePicker />
      </Group>
      <ChartRenderer_ />
    </Stack>
  );
};

export { Terminal };

export default Terminal;
