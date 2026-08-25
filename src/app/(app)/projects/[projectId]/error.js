
"use client";

import { useEffect } from "react";

export default function ProjectDetailError({
  error,
  reset,
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div
        role="alert"
        className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/20"
      >
        <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">
          Unable to load project
        </h2>

        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          Something went wrong while loading this project.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}