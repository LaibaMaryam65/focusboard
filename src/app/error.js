"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center dark:border-red-900/50 dark:bg-gray-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
          !
        </div>

        <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          We could not load this part of FocusBoard. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </main>
  );
}