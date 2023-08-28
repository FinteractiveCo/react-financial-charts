import { Button, Menu } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React from "react";
import { DaysTimeFrame, MinutesTimeFrame, SecondsTimeFrame, TimeFrame } from "../types/TimeFrame";

const TimeFramePicker = ({}) => {
  const [timeframe, setTimeframe] = useLocalStorage<TimeFrame>({
    key: "timeframe",
  });

  return (
    <Menu shadow="md" width={100} onChange={console.log}>
      <Menu.Target>
        <Button variant="subtle">{timeframe}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Seconds</Menu.Label>
        {Object.values(SecondsTimeFrame).map((key, index) => (
          <Menu.Item key={key} onClick={() => setTimeframe(key)}>
            {key}
          </Menu.Item>
        ))}

        <Menu.Divider />

        <Menu.Label>Minutes</Menu.Label>
        {Object.values(MinutesTimeFrame).map((key, index) => (
          <Menu.Item key={key} onClick={() => setTimeframe(key)}>
            {key}
          </Menu.Item>
        ))}
        <Menu.Divider />

        <Menu.Label>Days</Menu.Label>
        {Object.values(DaysTimeFrame).map((key, index) => (
          <Menu.Item key={key} onClick={() => setTimeframe(key)}>
            {key}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default TimeFramePicker;
