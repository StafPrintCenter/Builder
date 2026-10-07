import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
// import { ThemeToggle } from "./";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SpcDeskLogo } from "@/components/site";

export function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <SpcDeskLogo className="mx-auto h-12 w-auto" />
    </Link>
  );
}

export function AppHeader() {
  const link = "text-sm text-muted-foreground hover:text-foreground transition-colors";
  const links = (
    <>
      <Link
        to="/dashboard"
        className={link}
        activeProps={{ className: "text-foreground" }}
      >
        Projets
      </Link>

      <Link
        to="/templates"
        className={link}
        activeProps={{ className: "text-foreground" }}>
        Modèles
      </Link>

      <Button
        asChild size="sm">
        <Link to="/editor" search={{ id: undefined }}>
          Page vierge
        </Link>
      </Button>
    </>
  );
  return (
    <header className="sticky top-0 z-20 border-b bg-panel/90 backdrop-blur">
      <div className="mx-auto grid h-14 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 sm:px-6">
        <div className="min-w-0"><Logo /></div>
        <nav className="hidden items-center gap-6 md:flex">
          {links}
          <div className="mx-0.5 h-4 w-px bg-border/80" />
          <ThemeToggle />
        </nav>

        <div className="flex shrink-0 items-center md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Ouvrir la navigation"><Menu /></Button></SheetTrigger>
            <SheetContent className="flex w-72 flex-col gap-6 p-6">
              <SheetTitle>Navigation</SheetTitle>
              <nav className="flex flex-col items-start gap-5">{links}</nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function EcosystemBanner() {
  return (
    <div className="border-t bg-panel px-6 py-3 text-center text-xs text-muted-foreground">
      Besoin d'éléments graphiques sur mesure ? Commandez un pack sur{" "}
      <a href="https://brief.stafprint.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">brief.stafprint.com</a>
      {" · "}Optimisez images et couleurs sur{" "}
      <a href="https://tools.stafprint.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">tools.stafprint.com</a>
    </div>
  );
}
