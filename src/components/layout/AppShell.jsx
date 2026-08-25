import NavigationWrapper from "./NavigationWrapper";

export default function AppShell({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            <NavigationWrapper>
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </NavigationWrapper>
        </div>
    );
}