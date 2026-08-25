"use client";

import { useEffect } from "react";

import {
  usePreferencesStore,
} from "@/stores/preferencesStore";

export default function ThemeSync() {
  const theme =
    usePreferencesStore(
      (state) => state.theme
    );

  useEffect(() => {
    const root =
      document.documentElement;

    root.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme]);

  return null;
}