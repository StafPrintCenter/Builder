import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { openCommandPalette } from "./CommandPalette";
import { useState } from "react";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { NAV, PAGE_META } from "@/data/site";
import { SpcDeskLogo } from "@/components/site";

export function PageHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const meta = PAGE_META[pathname] ?? {
    title: "Détail de la fonctionnalité",
    subtitle: "Suivi détaillé, votes et échanges autour de cette évolution.",
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <SpcDeskLogo className="mx-auto h-12 w-auto" />
          </Link>
          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/submit"
            className="hidden rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep sm:inline-flex"
          >
            Proposer une idée
          </Link>
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Recherche globale"
            className="flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="size-4" />
            <kbd className="hidden font-mono text-[10px] md:inline">Ctrl K</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid size-10 place-items-center rounded-xl border border-border bg-card lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {[...NAV, { to: "/submit", label: "Proposer une idée" } as const].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-lg px-3 py-2.5 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <div className="border-t border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <h1 className="truncate text-base font-bold sm:text-lg">{meta.title}</h1>
          <p className="truncate text-xs text-muted-foreground sm:text-sm">{meta.subtitle}</p>
        </div>
      </div>
    </header>
  );
}
