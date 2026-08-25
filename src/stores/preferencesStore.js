import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePreferencesStore = create(
  persist(
    (set) => ({
      theme: "light",
      viewMode: "cards",

      setTheme: (theme) => {
        set({ theme });
      },

      setViewMode: (viewMode) => {
        set({ viewMode });
      },

      toggleTheme: () => {
        set((state) => ({
          theme:
            state.theme === "light"
              ? "dark"
              : "light",
        }));
      },
    }),
    {
      name: "focusboard-preferences",
    }
  )
);