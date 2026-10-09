import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home, Sparkles, Unlink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";

export function NotFoundComponent() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background p-4 text-foreground select-none sm:p-6">
      {/* Grille de fond subtile */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

      {/* Halo lumineux en arrière-plan */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96" />

      {/* Carte principale */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border/80 bg-card/80 p-6 text-center shadow-xl backdrop-blur-md sm:p-8">
        {/* Badge d'en-tête */}
        <div className="mx-auto mb-4 inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 font-mono text-xs font-medium text-destructive">
          <Unlink className="size-3.5" />
          <span>404 · Page introuvable</span>
        </div>

        {/* Grand chiffre décoratif */}
        <div className="my-2 font-mono text-6xl font-black tracking-tighter text-foreground/15 sm:text-7xl">
          404
        </div>

        {/* Titre & Description */}
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Rien à afficher ici
        </h1>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          La page ou le projet que vous cherchez n'existe pas, a été déplacé ou est momentanément indisponible.
        </p>

        {/* Actions de retour */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center">
          <Button asChild className="w-full gap-2 font-medium sm:w-auto">
            <Link to="/">
              <Home className="size-4" />
              Accueil
            </Link>
          </Button>

          <Button
            variant="outline"
            className="w-full gap-2 font-medium bg-card sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="size-4" />
            Retour
          </Button>
        </div>
      </div>

      {/* Pied de page discret */}
      <div className="relative z-10 mt-8 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
        <Sparkles className="size-3 text-primary" />
        <span>{SITE.tool}</span>
      </div>
    </div>
  );
}