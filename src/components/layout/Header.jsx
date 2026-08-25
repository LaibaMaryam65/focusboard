"use client";

import { Menu, Bell } from "lucide-react";

export default function Header({onMenuClick}){
    return(
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 dark:border-gray-800 dark:bg-gray-950">
            <button type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <Menu size={22}/>
            </button>
            <div className="hidden lg:block">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Team workspace
                </p>
            </div>
            <div className="ml-auto flex items-center gap-3">
                <button type="button" 
                className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Notifications"
                >
                    <Bell size={20}/>
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-600"/>
                </button>
                <div className="flex items-center gap-2 border-1 border-gray-200 pl-3 dark:border-gray-800">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        LM
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Laiba
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Team Member
                        </p>
                    </div>

                </div>
            </div>
        </header>
    );
}