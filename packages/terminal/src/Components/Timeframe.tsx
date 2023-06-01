import { Button, Menu, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React from "react";
import {
  DaysTimeframe,
  MinutesTimeframe,
  SecondsTimeframe,
  Timeframe,
} from "../types/TimeFrame";

const TimeFrame = ({}) => {
  const [timeframe, setTimeframe] = useLocalStorage<Timeframe>({
    key: "timeframe",
  });

  return (
    <Menu shadow="md" width={100} onChange={console.log}>
      <Menu.Target>
        <Button variant="subtle">{timeframe}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Seconds</Menu.Label>
        {Object.values(SecondsTimeframe).map((key, index) => (
          <Menu.Item onClick={() => setTimeframe(key)}>{key}</Menu.Item>
        ))}

        <Menu.Divider />

        <Menu.Label>Minutes</Menu.Label>
        {Object.values(MinutesTimeframe).map((key, index) => (
          <Menu.Item onClick={() => setTimeframe(key)}>{key}</Menu.Item>
        ))}
        <Menu.Divider />

        <Menu.Label>Days</Menu.Label>
        {Object.values(DaysTimeframe).map((key, index) => (
          <Menu.Item onClick={() => setTimeframe(key)}>{key}</Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default TimeFrame;
