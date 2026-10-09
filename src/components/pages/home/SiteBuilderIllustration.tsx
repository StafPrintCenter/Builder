import {
  Code2,
  Image,
  LayoutTemplate,
  MousePointer2,
  Palette,
  Type,
} from "lucide-react";
import { SITE } from "@/data/site";

const library = [
  { icon: LayoutTemplate, label: "Hero divisé" },
  { icon: Type, label: "Grand titre" },
  { icon: Image, label: "Image + texte" },
];

export function SiteBuilderIllustration() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-xl lg:mx-0 lg:max-w-none">
      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-border bg-panel shadow-2xl">
        {/* Barre supérieure */}
        <div className="flex h-10 min-w-0 items-center justify-between gap-2 border-b border-border px-3 sm:px-4">
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <span className="size-2 rounded-full bg-destructive" />
            <span className="size-2 rounded-full bg-badge-offer" />
            <span className="size-2 rounded-full bg-badge-form" />
          </div>

          <span className="min-w-0 flex-1 truncate text-center font-mono text-[9px] text-muted-foreground sm:text-[10px]">
            campagne-print.spcbuild
          </span>

          <span className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[8px] text-muted-foreground sm:px-2 sm:text-[9px]">
            <span className="sm:hidden">OK</span>
            <span className="hidden sm:inline">Enregistré</span>
          </span>
        </div>

        {/* Éditeur : panneaux adaptatifs */}
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] sm:grid-cols-[88px_minmax(0,1fr)] md:grid-cols-[112px_minmax(0,1fr)_88px] lg:grid-cols-[112px_minmax(0,1fr)_96px]">
          {/* Bibliothèque : masquée sur mobile */}
          <aside className="hidden min-w-0 border-r border-border bg-background/40 p-2 md:block lg:p-3">
            <p className="mb-3 truncate font-mono text-[8px] uppercase text-muted-foreground">
              Bibliothèque
            </p>

            <div className="space-y-2">
              {library.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="min-w-0 rounded border border-border bg-card p-2"
                >
                  <Icon className="size-3 text-primary" />
                  <p className="mt-1.5 truncate text-[9px] font-medium">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </aside>

          {/* Zone de création */}
          <div className="grid-bg relative min-w-0 overflow-hidden bg-muted p-2.5 sm:p-3 md:p-3 lg:p-5">
            <div className="mx-auto min-h-[250px] w-full max-w-xs overflow-hidden rounded border border-border bg-foreground text-left text-background shadow-xl sm:min-h-[300px] md:min-h-[320px]">
              {/* Navigation du site */}
              <div className="flex items-center justify-between gap-2 px-2.5 py-2.5 sm:px-3 sm:py-3">
                <span className="min-w-0 truncate text-[8px] font-bold sm:text-[9px]">
                  {SITE.tool}
                </span>

                <div className="flex shrink-0 gap-2 text-[6px] opacity-60 sm:gap-3 sm:text-[7px]">
                  <span>Services</span>
                  <span>Contact</span>
                </div>
              </div>

              {/* Hero de la landing page */}
              <div className="grid grid-cols-1 items-center gap-3 px-3 py-4 min-[420px]:grid-cols-[1.1fr_.9fr] min-[420px]:px-3 min-[420px]:py-5 sm:gap-3 sm:px-4 sm:py-6">
                <div className="min-w-0">
                  <div className="mb-2 h-1 w-10 rounded bg-primary sm:w-12" />

                  <p className="text-base font-bold leading-tight min-[420px]:text-sm sm:text-lg">
                    Une page qui transforme vos idées.
                  </p>

                  <div className="mt-3 space-y-1">
                    <div className="h-1.5 w-full rounded bg-background/15" />
                    <div className="h-1.5 w-4/5 rounded bg-background/15" />
                  </div>

                  <div className="mt-3 inline-flex rounded bg-primary px-2.5 py-1.5 text-[7px] font-bold text-primary-foreground sm:mt-4 sm:px-3">
                    Démarrer
                  </div>
                </div>

                {/* Visuel de la page */}
                <div className="hidden aspect-[4/3] min-w-0 rounded bg-background/10 p-2 min-[420px]:block">
                  <div className="grid h-full grid-cols-2 gap-1">
                    <div className="rounded bg-primary/80" />
                    <div className="grid min-h-0 gap-1">
                      <div className="rounded bg-badge-service/70" />
                      <div className="rounded bg-background/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cartes de services */}
              <div className="grid grid-cols-3 gap-1.5 border-t border-background/10 px-2.5 py-3 sm:gap-2 sm:px-4 sm:py-4">
                {["Design", "Mobile", "Export"].map((label) => (
                  <div
                    key={label}
                    className="min-w-0 rounded border border-background/10 p-1.5 text-center text-[7px] font-semibold sm:p-2"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Curseur de sélection */}
            <div className="pointer-events-none absolute left-[45%] top-[45%] rounded bg-primary p-1 text-primary-foreground shadow-lg">
              <MousePointer2 className="size-3" />
            </div>
          </div>

          {/* Panneau Style : masqué sur mobile et petit écran */}
          <aside className="hidden min-w-0 border-l border-border bg-background/40 p-2 lg:block">
            <p className="mb-3 font-mono text-[8px] uppercase text-muted-foreground">
              Style
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-[8px] text-muted-foreground">Couleurs</p>
                <div className="mt-2 flex gap-1">
                  <span className="size-3.5 rounded-sm bg-primary" />
                  <span className="size-3.5 rounded-sm bg-foreground" />
                  <span className="size-3.5 rounded-sm bg-badge-service" />
                </div>
              </div>

              <div>
                <p className="text-[8px] text-muted-foreground">
                  Espacement
                </p>
                <div className="mt-2 h-1 rounded bg-muted">
                  <div className="h-1 w-3/5 rounded bg-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-6 rounded border border-border" />
                <div className="h-6 rounded border border-border" />
              </div>
            </div>
          </aside>
        </div>

        {/* Barre inférieure responsive */}
        <div className="flex min-h-10 items-center justify-between gap-2 border-t border-border px-2.5 py-2 text-[9px] text-muted-foreground sm:px-4 sm:text-[10px]">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <Palette className="size-3 shrink-0 text-primary" />
            <span className="truncate">Édition visuelle</span>
          </span>

          <span className="hidden items-center gap-1.5 min-[420px]:inline-flex">
            <Code2 className="size-3 shrink-0 text-badge-service" />
            <span>HTML propre</span>
          </span>

          <span className="shrink-0 font-mono text-[8px] sm:text-[9px]">
            375 · 768 · 1440 px
          </span>
        </div>
      </div>

      {/* Badge flottant */}
      <div className="absolute -bottom-5 left-2 hidden items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 shadow-xl sm:flex sm:px-4 sm:py-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary font-display font-bold text-primary-foreground">
          36
        </span>

        <span className="text-xs">
          <strong className="block text-foreground">
            Blocs & éléments
          </strong>
          <span className="text-muted-foreground">
            prêts à assembler
          </span>
        </span>
      </div>
    </div>
  );
}