import React, { memo, useState } from "react";
import "./App.css";
import styles from "./styles";
import { ColorScheme, ColorSchemeProvider, Group, MantineProvider, Menu, Stack } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import ThemeSwitch from "./Components/ThemeSwitch";
import Divider = Menu.Divider;
import SplitPane, { Pane } from 'react-split-pane';
import Terminal from "./Terminal";


const Chart = memo(Terminal);

function App() {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

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
    <div className="App">
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{
                    colorScheme,
                    ...styles,
                }}
                withCSSVariables
                withGlobalStyles
                withNormalizeCSS
            >
                <Stack h={"100vh"} spacing={0}>
                    <Group p={"xs"}>
                        <ThemeSwitch />
                    </Group>
                    <Divider />
                    cicina sssssssds
                    <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        resizerSize={1}
      >
        <Pane minSize={400}>
          <SplitPane
            sizes={sizes1}
            onChange={setSizes1}
            resizerSize={1}
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
            resizerSize={1}
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
            </MantineProvider>
        </ColorSchemeProvider>
    </div>
  );
}

export default App;
