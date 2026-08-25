

export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Back Link Skeleton */}
      <div className="h-5 w-28 bg-gray-200 dark:bg-gray-800 rounded" />
      
      {/* Project Header Skeleton */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3 w-full max-w-xl">
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-full" />
                  <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
              <div className="h-10 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg shrink-0" />
          </div>
      </section>

      {/* Summary Cards Skeleton */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 space-y-3">
                  <div className="flex justify-between items-center">
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                      <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded" />
                  </div>
                  <div className="h-8 w-12 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
          ))}
      </section>

      {/* Tasks List Skeleton */}
      <section className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800 flex justify-between items-center">
              <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
              <div className="h-5 w-14 bg-gray-200 dark:bg-gray-800 rounded-full" />
          </div>
          <div className="p-5 space-y-6">
              {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                      <div className="flex items-start gap-3 w-full">
                          <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded-full shrink-0" />
                          <div className="space-y-2 w-1/2">
                              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
                          </div>
                      </div>
                      <div className="h-9 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  </div>
              ))}
          </div>
      </section>
    </div>
  );
}
