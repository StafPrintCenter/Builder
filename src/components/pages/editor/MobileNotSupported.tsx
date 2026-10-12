import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Monitor, Smartphone } from "lucide-react";
import { SITE } from "@/data/site";
import { Button } from "@/components/ui/button";
import { SpcDeskLogo, ThemeToggle } from "@/components/site";

export function MobileNotSupported() {
  const nav = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b bg-panel px-4">
        <div className="flex items-center gap-2">
          <SpcDeskLogo className="h-9 w-auto sm:h-10" />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground">
            <Smartphone className="h-3.5 w-3.5 text-amber-500" />
            <span>Version Mobile</span>
          </div>
        </div>

      </header>

      {/* Contenu principal */}
      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md space-y-5 rounded-2xl border bg-panel p-6 shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Monitor className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight">
              Éditeur disponible sur ordinateur
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              L'éditeur de glisser-déposer de <span className="font-medium text-foreground">{SITE.tool}</span> requiert un écran plus large pour une expérience optimale.
            </p>
          </div>

          <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
            📱 La version d'édition mobile arrive bientôt !
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Button
              className="w-full"
              onClick={() => nav({ to: "/" })}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retourner à l'accueil
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="shrink-0 border-t bg-panel px-4 py-3 text-center text-[11px] text-muted-foreground space-y-1">
        <div>
          Besoin de visuels sur mesure ?{" "}
          <a
            href="https://brief.stafprint.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            brief.stafprint.com
          </a>
        </div>
        <div>
          Outils images & couleurs :{" "}
          <a
            href="https://tools.stafprint.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            tools.stafprint.com
          </a>
        </div>
      </footer>
    </div>
  );
}