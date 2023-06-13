import { Button, Divider, Group, Stack } from "@mantine/core";
import Image from "next/image";
import { Terminal } from "charts-terminal";
import ThemeSwitch from "@/components/ThemeSwitch";
import SplitPane, { Pane } from "split-pane-react";
import { memo, useState } from "react";

const Chart = memo(Terminal);

export default function About() {
  const [sizes, setSizes] = useState<(number | string)[]>(["50%", "auto"]);
  const [sizes1, setSizes1] = useState<(number | string)[]>(["50%", "auto"]);
  const [sizes2, setSizes2] = useState<(number | string)[]>(["50%", "auto"]);

  const layoutCSS = {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "400px",
  };

  return (
    <div style={{ ...layoutCSS }}>
      <Chart />
    </div>
  );
}
