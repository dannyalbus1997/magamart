import { createTheme, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    grayscale: Record<number, string>;
    ink: Record<number, string>;
  }
  interface PaletteOptions {
    grayscale?: Record<number, string>;
    ink?: Record<number, string>;
  }
  interface CommonColors {
    primaryShadow?: string;
  }
}

const grayscale: Record<number, string> = {
  0: "#FFFFFF",
  50: "#F9FAFB",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
};

const ink: Record<number, string> = {
  0: "#FFFFFF",
  100: "#F0F0FF",
  200: "#E0E0FF",
  300: "#C7C7FF",
  400: "#A5A5FF",
  500: "#8080FF",
  600: "#6363F1",
  700: "#4F46E5",
  800: "#3730A3",
  900: "#1E1B4B",
};

const palette: PaletteOptions = {
  primary: {
    main: "#6366F1",
    light: "#818CF8",
    dark: "#4F46E5",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#8B5CF6",
    light: "#A78BFA",
    dark: "#7C3AED",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#EF4444",
    light: "#FCA5A5",
    dark: "#DC2626",
  },
  warning: {
    main: "#F59E0B",
    light: "#FCD34D",
    dark: "#D97706",
  },
  success: {
    main: "#10B981",
    light: "#6EE7B7",
    dark: "#059669",
  },
  info: {
    main: "#3B82F6",
    light: "#93C5FD",
    dark: "#2563EB",
  },
  grayscale,
  ink,
  common: {
    white: "#FFFFFF",
    black: "#000000",
    primaryShadow: "rgba(99,102,241,0.24)",
  },
};

const theme = createTheme({
  palette,
  typography: {
    fontFamily: "var(--font-outfit), sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

export default theme;
