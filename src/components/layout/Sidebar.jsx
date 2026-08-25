
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Settings, X, Info } from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  }
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  
  return (
    <>
      {mobileOpen && (
        <button 
          type="button" 
          aria-label="Close menu" 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}
      
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 dark:border-gray-800 dark:bg-gray-950 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5 dark:border-gray-800">
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              F
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              FocusBoard
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav 
          className="flex-1 overflow-y-auto space-y-1 p-4"
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isActive 
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon size={19} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              FocusBoard
            </p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              Team Productivity workspace
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
