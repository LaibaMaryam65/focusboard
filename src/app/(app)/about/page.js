export const metadata = {
  title: "About FocusBoard",
  description:
    "Learn about FocusBoard and its frontend architecture.",
};

export default function AboutPage() {
  return (
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
        <div className="max-w-4xl">
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            About
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            FocusBoard
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
            FocusBoard is a lightweight team project and task
            dashboard designed to help teams organize projects,
            monitor work, and keep track of deadlines.
          </p>
        </div>

        <div className="mt-8 grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <InfoCard
            title="Projects"
            description="Browse projects and quickly access their tasks."
          />

          <InfoCard
            title="Tasks"
            description="Create, edit, inspect and delete team tasks."
          />

          <InfoCard
            title="Focus"
            description="Keep important work visible and organized."
          />
        </div>

        <section className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Built with modern frontend patterns
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-400">
            FocusBoard demonstrates practical React and Next.js
            patterns including dynamic routing, client-side server
            state, validated forms, reusable components, responsive
            layouts, loading states, error handling, and accessible
            interactions.
          </p>
        </section>
      </div>
    </div>
  );
}

function InfoCard({ title, description }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition hover:shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <h2 className="font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </article>
  );
}