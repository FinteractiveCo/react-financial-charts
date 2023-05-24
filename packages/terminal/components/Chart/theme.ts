import { ColorScheme, useMantineColorScheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

const darkTheme: any = {
  gridLinesStrokeStyle: "blue",
  strokeStyle: "#666",
  candleNegative: "#ef5350",
  candlePositive: "#26a69a",
  volumeNegative: "#ef5350",
  volumePositive: "#26a69a",
  crossHairCursorColor: "#ffaa00",
  label: "#ffaa00",
  labelSecondary: "#ffffff",
};

const lightTheme: any = {
  gridLinesStrokeStyle: "#e0e0e0",
  strokeStyle: "#000000",
  candleNegative: "#ef5350",
  candlePositive: "#26a69a",
  volumeNegative: "#ef5350",
  volumePositive: "#26a69a",
  crossHairCursorColor: "#666",
  label: "#ccc",
  labelSecondary: "#ffaa00",
};

export { darkTheme, lightTheme };
