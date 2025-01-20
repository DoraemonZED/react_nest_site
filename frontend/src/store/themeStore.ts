import { create } from 'zustand';

const ThemeProps = {
  key: "theme",
  light: "light",
  dark: "dark",
} as const;

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;

// Create a Zustand store
export const useThemeStore = create<{
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

export { ThemeProps };
export type { Theme }; 