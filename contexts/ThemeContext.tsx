import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Theme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/theme/theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  currentTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeProvider");
  }
  return context;
};

interface ThemeModeProviderProps {
  children: ReactNode;
}

export const ThemeModeProvider = ({ children }: ThemeModeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    if (savedTheme) {
      setMode(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  const currentTheme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
