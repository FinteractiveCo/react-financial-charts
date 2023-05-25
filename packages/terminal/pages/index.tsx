import { Button, Divider, Group, Stack } from "@mantine/core";
import Image from "next/image";
import StockChart from "../components/Chart";
import ThemeSwitch from "@/components/ThemeSwitch";
import SplitPane, { Pane } from "split-pane-react";
import { memo, useState } from "react";

const Chart = memo(StockChart);

export default function About() {
  const [sizes, setSizes] = useState<(number | string)[]>(["50%", "auto"]);
  const [sizes1, setSizes1] = useState<(number | string)[]>(["50%", "auto"]);
  const [sizes2, setSizes2] = useState<(number | string)[]>(["50%", "auto"]);

  const layoutCSS = {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    minWidth: "400px",
  };

  return (
    <Stack h={"100vh"} spacing={0}>
      <Group p={"xs"}>
        <ThemeSwitch />
      </Group>
      <Divider />
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        resizerSize={5}
      >
        <Pane minSize={400}>
          <SplitPane
            sizes={sizes1}
            onChange={setSizes1}
            resizerSize={5}
            split="horizontal"
          >
            <Pane minSize={400}>
              <div style={{ ...layoutCSS }}>
                <Chart />
              </div>
            </Pane>
            <Pane minSize={400}>
              <div style={{ ...layoutCSS }}>
                <Chart />
              </div>
            </Pane>
          </SplitPane>
        </Pane>

        <Pane minSize={400}>
          <SplitPane
            sizes={sizes2}
            onChange={setSizes2}
            resizerSize={5}
            split="horizontal"
          >
            <Pane minSize={400}>
              <div style={{ ...layoutCSS }}>
                <Chart />
              </div>
            </Pane>
            <Pane minSize={400}>
              <div style={{ ...layoutCSS }}>
                <Chart />
              </div>
            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    </Stack>
  );
}
