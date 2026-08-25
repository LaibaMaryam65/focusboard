"use client";

import {
  Check,
  Palette,
  Rows3,
} from "lucide-react";

import ThemeSetting from "./ThemeSetting";
import ViewSetting from "./ViewSetting";

export default function SettingsClient() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
    
      <div>
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Preferences
        </p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Settings
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Customize your FocusBoard experience.
        </p>
      </div>

      
      <div className="space-y-4">
        <ThemeSetting />

        <ViewSetting/>
      </div>

     
      <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <div className="flex gap-3">
          <div className="mt-0.5 text-indigo-600 dark:text-indigo-400">
            <Check size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              Preferences are saved automatically
            </h2>

            {/* <p className="mt-1 text-sm leading-6 text-indigo-700 dark:text-indigo-300">
             Your appearance and dashboard view preferences are stored locally and will remain available after refreshing the page.
            </p> */}
          </div>
        </div>
      </section>

   
      
    </div>
  );
}

