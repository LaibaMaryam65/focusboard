"use client";

import {
  LayoutGrid,
  List,
} from "lucide-react";

import {
  usePreferencesStore,
} from "@/stores/preferencesStore";

export default function ViewSetting() {
  const viewMode =
    usePreferencesStore(
      (state) => state.viewMode
    );

  const setViewMode =
    usePreferencesStore(
      (state) => state.setViewMode
    );

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Dashboard View
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Choose how projects and tasks are displayed.
          </p>
        </div>

        <div
          className="grid grid-cols-2 rounded-lg bg-gray-100 p-1 dark:bg-gray-800"
          role="group"
          aria-label="Dashboard view preference"
        >
          <button
            type="button"
            onClick={() =>
              setViewMode("cards")
            }
            aria-pressed={
              viewMode === "cards"
            }
            className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              viewMode === "cards"
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <LayoutGrid size={16} />
            Cards
          </button>

          <button
            type="button"
            onClick={() =>
              setViewMode("list")
            }
            aria-pressed={
              viewMode === "list"
            }
            className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              viewMode === "list"
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <List size={16} />
            List
          </button>
        </div>
      </div>
    </section>
  );
}