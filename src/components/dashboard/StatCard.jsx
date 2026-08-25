import Link from "next/link";
export default function StatCard({
    title,value,description,icon,href,variant="default",
}){
    const variants={
         default:
      "bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800",

    warning:
      "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900",

    danger:
      "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900",

    success:
      "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900",
    };
    const content=(
        <div className={`rounded-xl border p-5 shadow-sm transition ${variant[variant]} ${href ? "hover:shadow-md":""}`}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {title}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {value}  
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                </div>

                {icon &&(
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                        {icon}
                    </div>
                )}

            </div>

        </div>
    );
    if(href){
        return <Link href={href}>{content}</Link>
    }
    return content;

}