export default function CreateTaskLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />

        <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-800" />

        <div className="rounded-xl border border-gray-200 p-7 dark:border-gray-800">
          <div className="space-y-5">
            <div className="h-11 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-32 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-11 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-11 rounded bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}