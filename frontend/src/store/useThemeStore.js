import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("StreamChat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("StreamChat-theme", theme);
    set({ theme });
  },
}));