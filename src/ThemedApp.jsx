import { useState, createContext, useContext, useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import { brown, deepPurple, grey, red, teal } from "@mui/material/colors";

export const AppContext = createContext();
export function useApp() {
  return useContext(AppContext);
}
export default function ThemedApp() {
  const [mode, setMode] = useState("light");
  const [showForm, setShowForm] = useState(false);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: teal,
        banner: mode === "dark" ? grey[800] : grey[200],
        text: {
          fade: grey[500],
        },
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ showForm, setShowForm, mode, setMode }}>
        <App />
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
