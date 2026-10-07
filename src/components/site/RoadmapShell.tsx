import type { ReactNode } from "react";
import { PageHeader, PageFooter, CommandPalette, CookieConsent } from ".";

export function RoadmapShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageHeader />
      <main className="flex-1 pt-34 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</div>
      </main>
      <PageFooter />
      <CommandPalette />
      <CookieConsent />
    </div>
  );
}
