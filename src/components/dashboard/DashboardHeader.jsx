export default function DashboardHeader(){
    return(
        <div>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Team Oveview
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                Have a nice Day, User!
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base dark:text-gray-400">
                Here is what happening across your projects and tasks today.
            </p>
        </div>
    )
}