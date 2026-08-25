
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: {
    default: "FocusBoard",
    template: "%s | FocusBoard",
  },
  description: "A modern team project and task management dashboard.",
};

export default function RootLayout({ children, modal }) {
  return (
    // 1. Adding "h-full" to html and body locks down dimensions natively
    <html lang="en" className="h-full antialiased">
      <body className="h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden">
        <Providers>
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}
