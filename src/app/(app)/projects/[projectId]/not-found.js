import Link from "next/link";
import { ArrowLeft, FolderX } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <FolderX
            size={26}
            className="text-gray-500 dark:text-gray-400"
          />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
          Project not found
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          The project you are looking for does not exist or may
          have been removed.
        </p>

        <Link
          href="/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>
    </div>
  );
}