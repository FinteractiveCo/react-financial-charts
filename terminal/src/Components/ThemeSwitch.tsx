import { useMantineColorScheme, ActionIcon, Group, Text } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import { useHotkeys } from "@mantine/hooks";

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
