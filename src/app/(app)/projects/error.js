"use client";

import { useEffect } from "react";

export default function ProjectsError({
  error,
  reset,
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/20">
      <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
        Unable to load projects
      </h2>

      <p className="mt-2 text-sm text-red-700 dark:text-red-400">
        Something went wrong while loading the projects.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}