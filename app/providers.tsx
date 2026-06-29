"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Store, Persistor } from "@store/index";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import theme from "@root/theme";
import AuthInitializer from "@root/hoc/auth-initializer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={Store as any}>
      <PersistGate loading={null} persistor={Persistor}>
        <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <AuthInitializer>
                {children}
                <Toaster position="top-right" />
              </AuthInitializer>
            </LocalizationProvider>
          </MuiThemeProvider>
        </NextThemeProvider>
      </PersistGate>
    </Provider>
  );
}
