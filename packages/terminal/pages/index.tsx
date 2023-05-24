import { Button, Group } from "@mantine/core";
import Image from "next/image";
import StockChart from "../components/Chart";
import ThemeSwitch from "@/components/ThemeSwitch";

export default function About() {
  return (
    <>
      <Group>
        <ThemeSwitch />
      </Group>
      <StockChart />
    </>
  );
}
