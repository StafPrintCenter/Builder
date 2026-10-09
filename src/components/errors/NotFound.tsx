import { Link } from "@tanstack/react-router";
import { ArrowLeft, Blocks, FilePlus2, Home, Layers3, LayoutTemplate, MousePointer2, PanelTop, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground select-none">
      {/* Barre supérieure de l'éditeur */}
      <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-md sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <LayoutTemplate className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight">
              SPC Build
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              VISUAL_EDITOR / 404
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-destructive sm:px-3 sm:text-xs">
          <span className="size-1.5 animate-pulse rounded-full bg-destructive" />
          ROUTE_NOT_FOUND
        </div>
      </header>

      {/* Zone de travail */}
      <main className="relative flex flex-1 items-center justify-center overflow-hidden p-5 sm:p-8">
        {/* Grille de l'éditeur */}
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />

        {/* Halo décoratif */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl sm:size-96" />

        <div className="relative z-10 grid w-full max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Illustration : canvas perdu */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-card/70 p-3 shadow-2xl backdrop-blur-sm sm:p-5">
              {/* Barre d'outils fictive */}
              <div className="flex h-8 items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-destructive/80" />
                  <span className="size-2 rounded-full bg-amber-400/80" />
                  <span className="size-2 rounded-full bg-emerald-500/80" />
                </div>

                <span className="font-mono text-[9px] text-muted-foreground sm:text-[10px]">
                  untitled-page.spc
                </span>

                <Layers3 className="size-3.5 text-muted-foreground" />
              </div>

              {/* Canvas quadrillé */}
              <div className="relative mt-3 flex h-[calc(100%-2.75rem)] items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted/30">
                {/* Cadre de sélection */}
                <div className="absolute left-[13%] top-[17%] h-[66%] w-[74%] rounded-lg border border-primary/40">
                  <span className="absolute -left-1 -top-1 size-2 rounded-sm bg-primary" />
                  <span className="absolute -right-1 -top-1 size-2 rounded-sm bg-primary" />
                  <span className="absolute -bottom-1 -left-1 size-2 rounded-sm bg-primary" />
                  <span className="absolute -bottom-1 -right-1 size-2 rounded-sm bg-primary" />
                </div>

                {/* Blocs de contenu égarés */}
                <div className="absolute left-[20%] top-[25%] w-[35%] -rotate-6 rounded-lg border border-border bg-card p-2.5 shadow-lg">
                  <div className="mb-2 h-1.5 w-2/3 rounded-full bg-primary/70" />
                  <div className="mb-1 h-1 w-full rounded-full bg-muted-foreground/20" />
                  <div className="h-1 w-3/4 rounded-full bg-muted-foreground/20" />
                  <div className="mt-3 h-4 w-1/2 rounded bg-primary/20" />
                </div>

                <div className="absolute bottom-[21%] right-[15%] flex size-16 rotate-6 items-center justify-center rounded-xl border border-border bg-card shadow-lg sm:size-20">
                  <Smartphone className="size-7 text-muted-foreground/70 sm:size-9" />
                </div>

                {/* Bloc manquant */}
                <div className="absolute right-[12%] top-[16%] flex size-9 rotate-12 items-center justify-center rounded-lg border border-dashed border-destructive/50 bg-destructive/10 text-destructive sm:size-11">
                  <Blocks className="size-5" />
                </div>

                {/* Curseur de déplacement */}
                <div className="absolute bottom-[17%] left-[23%] text-primary drop-shadow-md">
                  <MousePointer2 className="size-6 fill-primary/20 sm:size-7" />
                </div>

                {/* Indicateur de position */}
                <div className="absolute bottom-2 left-2 rounded bg-card/90 px-2 py-1 font-mono text-[9px] text-muted-foreground">
                  X: ??? / Y: ???
                </div>

                <div className="absolute right-2 top-2 rounded border border-destructive/20 bg-destructive/10 px-2 py-1 font-mono text-[9px] font-bold text-destructive">
                  404
                </div>
              </div>
            </div>

            {/* Cartouche flottant */}
            <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 shadow-xl sm:left-7 sm:px-4">
              <div className="flex size-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <PanelTop className="size-4" />
              </div>
              <div>
                <p className="text-xs font-semibold">Page introuvable</p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  canvas: null
                </p>
              </div>
            </div>
          </div>

          {/* Texte et actions */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:text-xs">
              <Blocks className="size-3.5 text-primary" />
              ÉDITEUR VISUEL / ERREUR 404
            </div>

            <h1 className="mt-5 max-w-lg font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Cette page n'est pas dans le{" "}
              <span className="text-primary">canvas.</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Le bloc que tu recherches semble avoir quitté le projet.
              Cette adresse est introuvable, ou la page a été déplacée
              ou supprimée. Même le glisser-déposer a ses limites.
            </p>

            {/* Diagnostic */}
            <div className="mt-6 w-full max-w-md rounded-xl border border-border bg-card/60 p-3.5 font-mono text-[10px] sm:text-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">État du canvas</span>
                <span className="font-semibold text-destructive">
                  NOT_FOUND
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Rendu de la page</span>
                <span className="text-foreground">Interrompu</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Blocs récupérés</span>
                <span className="text-foreground">0</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:flex-1">
                <Link to="/">
                  <Home className="mr-2 size-4" />
                  Accueil
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:flex-1"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 size-4" />
                Page précédente
              </Button>
            </div>

            <Link
              to="/editor"
              search={{ id: undefined }}
              className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <FilePlus2 className="size-3.5" />
              Créer une nouvelle page
            </Link>
          </div>
        </div>
      </main>

      {/* Barre de statut */}
      <footer className="relative z-10 flex h-9 shrink-0 items-center justify-between border-t border-border bg-card px-4 font-mono text-[9px] text-muted-foreground sm:px-6 sm:text-[10px]">
        <div className="flex items-center gap-3 sm:gap-5">
          <span>SPC_BUILD</span>
          <span className="hidden sm:inline">VISUAL_MODE: READY</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-destructive" />
          <span>PAGE: MISSING</span>
        </div>
      </footer>
    </div>
  );
}