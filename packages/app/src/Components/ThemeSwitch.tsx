import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import { useHotkeys } from "@mantine/hooks";
import React from "react";

export function ThemeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ActionIcon title="Theme switch" onClick={() => toggleColorScheme()}>
      {colorScheme === "dark" ? (
        <IconSun size={"14"} />
      ) : (
        <IconMoonStars size={"14"} />
      )}
    </ActionIcon>
  );
}

export default ThemeSwitch;
