import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FilePlus2, FolderKanban, LayoutTemplate, Menu, PanelsTopLeft, X } from "lucide-react";
import { ThemeToggle } from "./";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SpcDeskLogo } from "@/components/site";

const navItems = [
  {
    to: "/projects" as const,
    label: "Mes projets",
    icon: FolderKanban,
  },
  {
    to: "/templates" as const,
    label: "Modèles",
    icon: LayoutTemplate,
  },
];

const linkClass =
  "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";

const activeLinkClass = "bg-accent text-primary";

export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-panel/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center"
          aria-label="SPC Build, accueil"
        >
          <SpcDeskLogo className="h-9 w-auto sm:h-10" />
        </Link>

        {/* Navigation desktop */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={linkClass}
              activeProps={{
                className: activeLinkClass,
              }}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <ThemeToggle />

          <Button asChild size="sm" className="gap-2">
            <Link to="/editor" search={{ id: undefined }}>
              <FilePlus2 className="size-4" />
              Nouvelle page
            </Link>
          </Button>
        </div>

        {/* Actions mobile */}
        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Ouvrir le menu de navigation"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[min(85vw,320px)] flex-col gap-0 p-0"
            >
              {/* En-tête du panneau */}
              <SheetHeader className="border-b border-border p-5 text-left">
                <SheetTitle className="flex items-center gap-2">
                  <PanelsTopLeft className="size-5 text-primary" />
                  SPC Build
                </SheetTitle>
                <p className="text-sm text-muted-foreground">
                  Votre espace de création web
                </p>
              </SheetHeader>

              {/* Action principale */}
              <div className="border-b border-border p-4">
                <SheetClose asChild>
                  <Button asChild className="w-full justify-center gap-2">
                    <Link to="/editor" search={{ id: undefined }}>
                      <FilePlus2 className="size-4" />
                      Créer une nouvelle page
                    </Link>
                  </Button>
                </SheetClose>
              </div>

              {/* Liens de navigation */}
              <nav
                aria-label="Navigation mobile"
                className="flex flex-1 flex-col gap-1 p-3"
              >
                <p className="mb-2 px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Espace de travail
                </p>

                {navItems.map(({ to, label, icon: Icon }) => (
                  <SheetClose asChild key={to}>
                    <Link
                      to={to}
                      className={`${linkClass} w - full`}
                      activeProps={{
                        className: `${activeLinkClass} w - full`,
                      }}
                    >
                      <Icon className="size-4 shrink-0" />
                      {label}
                      <ArrowUpRight className="ml-auto size-3.5 opacity-40" />
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {/* Pied du panneau */}
              <div className="border-t border-border p-4">
                <SheetClose asChild>
                  <Link
                    to="/"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <PanelsTopLeft className="size-4" />
                    Accueil de SPC Build
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}