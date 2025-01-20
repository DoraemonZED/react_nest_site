// originally written by @imoaazahmed

import { useEffect, useMemo } from "react";
import { create } from 'zustand';

const ThemeProps = {
  key: "theme",
  light: "light",
  dark: "dark",
} as const;

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;

// Create a Zustand store
const useThemeStore = create<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>((set) => ({
  theme: (localStorage.getItem(ThemeProps.key) as Theme) || ThemeProps.light,
  setTheme: (theme: Theme) => {
    localStorage.setItem(ThemeProps.key, theme);
    document.documentElement.classList.remove(ThemeProps.light, ThemeProps.dark);
    document.documentElement.classList.add(theme);
    set({ theme });
  },
}));

export const useTheme = (defaultTheme?: Theme) => {
  const { theme, setTheme } = useThemeStore();

  const isDark = useMemo(() => {
    return theme === ThemeProps.dark;
  }, [theme]);

  const isLight = useMemo(() => {
    return theme === ThemeProps.light;
  }, [theme]);

  const setLightTheme = () => setTheme(ThemeProps.light);

  const setDarkTheme = () => setTheme(ThemeProps.dark);

  const toggleTheme = () =>
    theme === ThemeProps.dark ? setLightTheme() : setDarkTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return { theme, isDark, isLight, setLightTheme, setDarkTheme, toggleTheme };
};
