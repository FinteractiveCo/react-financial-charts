import styles from "../styles/styles";
import React from "react";
import { useLocalStorage } from "@mantine/hooks";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { AppProps } from "next/app";
import "../styles/app.css";
import DatacenterClient, { Resolution } from "datacenter-js-client";

const apiClient = new DatacenterClient("https://api-atc.finteractive.co/dev");
apiClient
  .getCandles({
    symbol: "EURUSD",
    resolution: Resolution.M5,
    fromTimestamp: 1685577600,
    toTimestamp: 1685664000,
  })
  .then(console.log.bind(undefined, "lol"));

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
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
        <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
          <Notifications />
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
