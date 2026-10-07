import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SpcDeskLogo } from "@/components/site";

export function PageHeader() {
  const link = "text-sm text-muted-foreground hover:text-foreground transition-colors";
  const links = (
    <>
      <Link
        to="/dashboard"
        className={link}
        activeProps={{ className: "text-primary" }}
      >
        Projets
      </Link>

      <Link
        to="/templates"
        className={link}
        activeProps={{ className: "text-primary" }}>
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
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <SpcDeskLogo className="mx-auto h-12 w-auto" />
        </Link>

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
