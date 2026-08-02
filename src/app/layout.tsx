import type { Metadata } from "next";
import "./globals.css";
import { AppFooter } from "@/components/ui/app-footer";
import { AppHeader } from "@/components/ui/app-header";
import { PostHogInit } from "@/lib/analytics";

export const metadata: Metadata = {
  title: {
    default: "Before Academy",
    template: "%s · Before Academy",
  },
  description:
    "Learn to tell AI, automation, and traditional software apart - free, about twenty minutes.",
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
        <PostHogInit />
        <AppHeader />
        {children}
        <AppFooter />
      </body>
    </html>
  );
}
