import { useLocalStorage } from "@mantine/hooks";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import "./App.css";
import styles from "./styles";


function MyApp() {
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
        ahoj
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
