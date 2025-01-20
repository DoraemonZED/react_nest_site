// originally written by @imoaazahmed

import { useEffect, useMemo } from "react";
import { useThemeStore, ThemeProps, Theme } from '../store/themeStore';

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
