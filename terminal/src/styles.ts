import { MantineThemeOverride } from "@mantine/core";

export const fontFamilyMonospace = "Monaco, Courier, monospace";
export const fontFamily = "Inter, sans-serif";

const styles: MantineThemeOverride = {
  primaryColor: "blue",
  fontFamily,
  fontFamilyMonospace,
  headings: {
    // properties for all headings
    fontWeight: 400,
    fontFamily,

    // properties for individual headings, all of them are optional
    sizes: {
      h1: { fontWeight: 500, fontSize: "32px", lineHeight: 1.4 },
      h2: { fontSize: "28px", lineHeight: 1.5 },
      // ...up to h6
    },
  },
  fontSizes: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px",
  },
  spacing: {
    xs: "5px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  },
  focusRingStyles: {
    // reset styles are applied to <button /> and <a /> elements
    // in &:focus:not(:focus-visible) selector to mimic
    // default browser behavior for native <button /> and <a /> elements
    resetStyles: () => ({ outline: "none" }),

    // styles applied to all elements expect inputs based on Input component
    // styled are added with &:focus selector
    styles: (theme) => ({ outline: `3px solid ${theme.primaryColor}` }),

    // focus styles applied to components that are based on Input
    // styled are added with &:focus selector
    inputStyles: (theme) => ({ outline: `3px solid ${theme.primaryColor}` }),
  },
  globalStyles: (theme) => ({
    "*, *::before, *::after": {
      //boxSizing: 'border-box',
    },
    "a, a:link": {
      cursor: "pointer",
    },
    "a:hover": {
      textDecoration: "none",
    },
    ".font-mono": {
      fontFamily: fontFamilyMonospace,
    },
    main: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
    },
    ".no-underline": {
      textDecoration: "none",
      ":hover": {
        textDecoration: "underline",
      },
    },
    body: {
      userSelect: "none",
      ...theme.fn.fontStyles(),
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      lineHeight: theme.lineHeight,
    },
  }),

  components: {
    Button: {
      defaultProps: {
        size: "xs",
        radius: 0,
      },
    },
    Select: {
      defaultProps: {
        size: "xs",
        variant: "unstyled",
      },
    },
    Header: {
      styles: (theme) => ({
        root: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.fn.rgba(theme.colors.dark[6], 0.5)
              : theme.fn.rgba(theme.white, 0.2),
          backdropFilter: "blur(5px)",
        },
      }),
    },
    LoadingOverlay: {
      defaultProps: {},
    },
    MenuDropdown: {
      styles: {
        root: { border: 0 },
      },
    },
    Menu: {
      styles: {
        root: { border: "0" },
      },
      defaultProps: {
        border: 0,
      },
    },
    Title: {
      styles: (theme) => ({
        root: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
          fontWeight: 500,
        },
      }),
    },
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 1180,
          lg: 1400,
          xl: 1600,
        },
      },
    },
  },
};

export default styles;
