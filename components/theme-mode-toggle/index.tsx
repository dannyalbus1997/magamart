"use client";

import { useTheme as useNextTheme } from "next-themes";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeModeToggle() {
  const { theme, setTheme } = useNextTheme();

  return (
    <IconButton
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="small"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
    </IconButton>
  );
}
