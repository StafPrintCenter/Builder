import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Code2,
  Columns,
  CornerDownRight,
  EyeOff,
  Home,
  Layers,
  Layout,
  MousePointer2,
  Move,
  Palette,
  Plus,
  RotateCcw,
  Sliders,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundComponent() {
  return (
    <div className="flex h-dvh w-full flex-col bg-background text-foreground select-none overflow-hidden font-sans">
      {/* 1. TOPBAR : BARRE D'OUTILS ET DE NAVIGATION EDITEUR */}
      <header className="flex h-12 w-full shrink-0 items-center justify-between border-b border-border bg-card/80 px-3 sm:px-4 text-xs font-medium backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-destructive animate-pulse" />
            <span className="font-mono text-[11px] font-bold tracking-tight text-foreground">
              SPC_BUILD<span className="text-muted-foreground">/STUDIO</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
            <span>page_slug:</span>
            <span className="text-destructive font-semibold">/404-undefined</span>
          </div>
        </div>

        {/* Action / État de la page */}
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex items-center gap-1 rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-destructive">
            <EyeOff className="size-3" /> Branche non répertoriée
          </span>
          <Button variant="ghost" size="sm" className="h-7 text-xs font-mono" onClick={() => window.location.reload()}>
            <RotateCcw className="mr-1.5 size-3" /> Recharger
          </Button>
        </div>
      </header>

      {/* 2. ESPACE DE TRAVAIL : GRID SYSTEM & CANVAS */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR GAUCHE : ARBORESCENCE & BLOCS */}
        <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-card/30 p-3 font-mono text-[11px] justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-muted-foreground mb-2 pb-1.5 border-b border-border/60">
                <span className="flex items-center gap-1.5 font-bold text-foreground">
                  <Layers className="size-3.5 text-primary" /> CALQUES DU SITE
                </span>
                <Plus className="size-3.5 opacity-40" />
              </div>

              {/* Fausse arborescence de composants */}
              <div className="space-y-1 text-muted-foreground/60">
                <div className="flex items-center gap-1.5 p-1 rounded hover:bg-muted/40">
                  <ChevronRight className="size-3" />
                  <Layout className="size-3.5" />
                  <span>Header_Global</span>
                </div>

                <div className="flex flex-col gap-1 pl-3">
                  <div className="flex items-center justify-between p-1 rounded bg-destructive/10 text-destructive border border-destructive/20 font-semibold">
                    <span className="flex items-center gap-1.5 truncate">
                      <AlertCircle className="size-3.5" />
                      <span>404_Page_Wrapper</span>
                    </span>
                    <span className="text-[9px] bg-destructive text-destructive-foreground px-1 rounded">ERR</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 pl-4 text-destructive/70">
                    <CornerDownRight className="size-3" />
                    <span>&lt;MissingRoute /&gt;</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 p-1 rounded hover:bg-muted/40 opacity-40">
                  <ChevronRight className="size-3" />
                  <Columns className="size-3.5" />
                  <span>Footer_Section</span>
                </div>
              </div>
            </div>

            {/* Bibliothèque de composants rapides */}
            <div className="pt-2">
              <span className="block text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">
                Composants disponibles
              </span>
              <div className="grid grid-cols-2 gap-1.5 opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-1.5 p-2 rounded border border-border bg-card text-[10px]">
                  <Type className="size-3 text-primary" /> Titre
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded border border-border bg-card text-[10px]">
                  <Columns className="size-3 text-primary" /> Grille
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border/80 bg-muted/30 p-2 text-[10px] text-muted-foreground">
            <span className="font-bold block text-foreground">STATUT DU BUILDER</span>
            Rendu interrompu : composant introuvable.
          </div>
        </aside>

        {/* CANVA CENTRAL DE COMPOSITION */}
        <main className="relative flex flex-1 flex-col items-center justify-center p-4 sm:p-8 bg-muted/20 overflow-y-auto">
          {/* Trame de grille arrière-plan (Surface Grid) */}
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

          {/* COMPOSANT FLOTTANT DE LA PAGE 404 */}
          <div className="relative w-full max-w-lg min-w-0">
            {/* Barre d'outils contextuelle du composant sélectionné */}
            <div className="absolute -top-10 left-0 right-0 flex items-center justify-between px-1 font-mono text-[10px]">
              <div className="flex items-center gap-1.5 rounded-t-lg bg-primary px-3 py-1 font-semibold text-primary-foreground shadow-sm">
                <Move className="size-3" />
                <span>Selected: Section#404_Missing</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
                <span>W: 100%</span>
                <span>H: Auto</span>
                <span>X: 0 Y: 0</span>
              </div>
            </div>

            {/* Carte du canevas principal encadrée */}
            <div className="relative rounded-2xl border-2 border-primary bg-card p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              {/* Handles visuels de sélection (Poignées de redimensionnement) */}
              <span className="absolute -top-1.5 -left-1.5 size-3 rounded-sm border border-primary bg-background shadow-sm" />
              <span className="absolute -top-1.5 -right-1.5 size-3 rounded-sm border border-primary bg-background shadow-sm" />
              <span className="absolute -bottom-1.5 -left-1.5 size-3 rounded-sm border border-primary bg-background shadow-sm" />
              <span className="absolute -bottom-1.5 -right-1.5 size-3 rounded-sm border border-primary bg-background shadow-sm" />

              {/* Contenu visuel 404 */}
              <div className="text-center">
                <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3.5 py-1 font-mono text-xs font-semibold text-destructive">
                  <AlertCircle className="size-3.5" />
                  <span>ERROR_404_PAGE_NOT_FOUND</span>
                </div>

                <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  Cette page n'existe pas.
                </h1>

                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  La route web demandée n'est rattachée à aucun modèle ou composant actif dans cet espace de travail.
                </p>

                {/* Inspecteur d'erreur formaté */}
                <div className="mt-6 rounded-xl border border-border bg-muted/40 p-3 text-left font-mono text-[11px] space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Target Route:</span>
                    <span className="text-destructive font-bold truncate max-w-[180px]">/unknown-path</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Status Code:</span>
                    <span className="text-foreground">404 (Not Found)</span>
                  </div>
                </div>

                {/* Actions de redirection */}
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-2.5 w-full justify-center">
                  <Button asChild size="default" className="w-full sm:w-auto rounded-xl font-semibold shadow-md">
                    <Link to="/">
                      <Home className="mr-2 size-4" />
                      Tableau de bord
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="default"
                    className="w-full sm:w-auto rounded-xl font-semibold bg-card"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="mr-2 size-4" />
                    Retour à l'éditeur
                  </Button>
                </div>
              </div>
            </div>

            {/* Curseur utilisateur simulé sur le canevas */}
            <div className="absolute -bottom-6 -right-4 hidden sm:flex items-center gap-1.5 rounded-lg bg-foreground px-2.5 py-1 text-[10px] font-mono text-background shadow-xl">
              <MousePointer2 className="size-3.5 fill-current text-primary" />
              <span>Visitor (Cursor_Lost)</span>
            </div>
          </div>
        </main>

        {/* SIDEBAR DROITE : PROPRIÉTÉS ET STYLE VISUEL */}
        <aside className="hidden xl:flex w-64 shrink-0 flex-col border-l border-border bg-card/30 p-4 font-mono text-xs justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-2 text-muted-foreground">
              <span className="flex items-center gap-1.5 font-bold text-foreground">
                <Sliders className="size-3.5 text-primary" /> PROPRIÉTÉS
              </span>
              <span className="text-[10px] text-destructive font-semibold">VERROUILLÉ</span>
            </div>

            {/* Faux réglages de mise en page */}
            <div className="space-y-4 opacity-40 pointer-events-none">
              <div>
                <span className="text-[10px] text-muted-foreground block mb-1.5">Mise en page (Display)</span>
                <div className="grid grid-cols-3 gap-1">
                  <div className="rounded border border-border bg-muted p-1.5 text-center text-[10px]">Block</div>
                  <div className="rounded border border-primary bg-primary/10 p-1.5 text-center text-[10px] font-bold text-primary">Flex</div>
                  <div className="rounded border border-border bg-muted p-1.5 text-center text-[10px]">Grid</div>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground block mb-1.5">Espacement (Padding)</span>
                <div className="h-12 w-full rounded-lg border border-dashed border-border bg-muted/40 p-2 flex items-center justify-center text-[10px] text-muted-foreground">
                  32px · 24px · 32px · 24px
                </div>
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground block mb-1.5">Code généré</span>
                <div className="rounded-lg bg-muted p-2 text-[10px] text-muted-foreground flex items-center gap-2">
                  <Code2 className="size-3.5" /> &lt;ErrorView status={404} /&gt;
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <Palette className="size-3.5 text-primary" />
            <span>Thème actuel : System Active</span>
          </div>
        </aside>
      </div>

      {/* 3. FOOTER : BARRE DE STATUT DU BUILDER */}
      <footer className="flex h-8 w-full shrink-0 items-center justify-between border-t border-border bg-card/80 px-3 sm:px-4 font-mono text-[10px] text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Layout className="size-3" /> RESPONSIVE_CANVAS
          </span>
          <span className="hidden sm:inline">ENGINE: SPC_BUILD_V2</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-destructive font-semibold">ROUTE_UNMAPPED</span>
          <span className="hidden sm:inline">100% Zoom</span>
        </div>
      </footer>
    </div>
  );
}