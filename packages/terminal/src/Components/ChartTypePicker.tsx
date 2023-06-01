import { Button, Menu } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React from "react";
import { ChartType } from "../types/ChartType";

const ChartTypePicker = ({}) => {
  const [chartType, setChartType] = useLocalStorage<ChartType>({
    key: "chartType",
  });

  return (
    <Menu shadow="md" width={100} onChange={console.log}>
      <Menu.Target>
        <Button variant="subtle">{chartType}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {Object.values(ChartType).map((key, index) => (
          <Menu.Item onClick={() => setChartType(key)}>{key}</Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ChartTypePicker;
