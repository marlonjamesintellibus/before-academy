import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Before Academy",
  description:
    "Learn to tell AI, automation, and traditional software apart — free, about twenty minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-(--radius-control) focus:bg-primary focus:px-4 focus:py-2 focus:text-surface"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
