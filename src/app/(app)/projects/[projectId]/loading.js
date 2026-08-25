// Make sure "export default" is included at the start!
export default function Loading() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6 animate-pulse">
      {/* Skeleton Header */}
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      
      {/* Skeleton Content Card */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>
    </div>
  );
}
