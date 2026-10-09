import { Code2, Image, LayoutTemplate, MousePointer2, Palette, Type } from "lucide-react";
import { SITE } from "@/data/site";

const library = [
  { icon: LayoutTemplate, label: "Hero divisé" },
  { icon: Type, label: "Grand titre" },
  { icon: Image, label: "Image + texte" },
];

export function SiteBuilderIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-xl min-w-0 lg:mx-0 lg:max-w-none">
      {/* Halo lumineux de fond */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl" />

      <div className="overflow-hidden rounded-xl border bg-panel shadow-2xl">
        {/* En-tête du mock */}
        <div className="flex h-10 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-destructive/80" />
            <span className="size-2 rounded-full bg-badge-offer/80" />
            <span className="size-2 rounded-full bg-badge-form/80" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground truncate max-w-37.5 sm:max-w-none">
            campagne-print.spcbuild
          </span>
          <span className="rounded border px-2 py-0.5 font-mono text-[9px] text-muted-foreground">Enregistré</span>
        </div>

        {/* Layout principal de l'éditeur */}
        <div className="grid h-80 grid-cols-[80px_1fr_64px] xs:grid-cols-[100px_1fr_80px] sm:h-96 sm:grid-cols-[140px_1fr_120px]">
          {/* Panneau latéral gauche (Composants) */}
          <aside className="border-r bg-background/40 p-2 sm:p-3">
            <p className="mb-3 font-mono text-[8px] uppercase text-muted-foreground truncate">Bibliothèque</p>
            <div className="space-y-2">
              {library.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded border bg-card p-1.5 xs:p-2 hover:border-primary/50 cursor-grab transition-colors">
                  <Icon className="size-3 text-primary" />
                  <p className="mt-1 xs:mt-1.5 truncate text-[8px] xs:text-[9px] font-medium text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </aside>

          {/* Zone de canvas principal (Le site en construction) */}
          <div className="grid-bg relative overflow-hidden bg-muted p-2 xs:p-3 sm:p-5">
            {/* Aperçu du site (Mobile-first dans l'aperçu) */}
            <div className="mx-auto h-full max-w-60:max-w-xs overflow-hidden rounded border bg-foreground text-left text-background shadow-xl">
              {/* Header factice */}
              <div className="flex items-center justify-between px-3 py-2.5 xs:px-4 xs:py-3 border-b border-background/10">
                <span className="text-[7px] xs:text-[8px] font-bold">{SITE.tool}</span>
                <div className="flex gap-1.5 xs:gap-2 text-[5px] xs:text-[6px] opacity-50">
                  <span>Services</span><span>Contact</span>
                </div>
              </div>

              {/* Section Héro factice */}
              <div className="grid grid-cols-[1fr_.8fr] items-center gap-2.5 xs:gap-3 px-3 py-4 xs:px-4 xs:py-6">
                <div>
                  <div className="mb-1.5 xs:mb-2 h-1 w-10 xs:w-12 rounded bg-primary" />
                  <p className="text-xs xs:text-sm font-bold leading-tight sm:text-lg">Une page qui transforme vos idées.</p>
                  <div className="mt-2.5 xs:mt-3 h-1 w-full rounded bg-background/15" />
                  <div className="mt-1 h-1 w-4/5 rounded bg-background/15" />
                  <div className="mt-3.5 xs:mt-4 inline-flex rounded bg-primary px-2.5 py-1 xs:px-3 xs:py-1.5 text-[6px] xs:text-[7px] font-bold text-primary-foreground">
                    Démarrer
                  </div>
                </div>
                {/* Image factice */}
                <div className="aspect-4/3 rounded bg-background/10 p-1.5 xs:p-2">
                  <div className="grid h-full grid-cols-2 gap-1">
                    <div className="rounded bg-primary/80" />
                    <div className="grid gap-1">
                      <div className="rounded bg-badge-service/70" />
                      <div className="rounded bg-background/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Grille de caractéristiques factice */}
              <div className="grid grid-cols-3 gap-1.5 xs:gap-2 border-t border-background/10 px-3 py-3 xs:px-4 xs:py-4">
                {["Design", "Mobile", "Export"].map((label) => (
                  <div key={label} className="rounded border border-background/10 p-1.5 xs:p-2 text-[6px] xs:text-[7px] font-semibold text-center truncate">
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Curseur de souris flottant */}
            <div className="absolute left-[45%] top-[50%] xs:left-[38%] xs:top-[45%] rounded bg-primary p-1 text-primary-foreground shadow-lg drop-shadow-md">
              <MousePointer2 className="size-3" />
            </div>
          </div>

          {/* Panneau latéral droit (Style/Propriétés) */}
          <aside className="border-l bg-background/40 p-2 sm:p-3">
            <p className="mb-3 font-mono text-[8px] uppercase text-muted-foreground truncate">Style</p>
            <div className="space-y-4">
              <div>
                <p className="text-[8px] text-muted-foreground">Couleurs</p>
                <div className="mt-2 flex gap-1 flex-wrap">
                  <span className="size-3.5 xs:size-4 rounded-sm bg-primary" />
                  <span className="size-3.5 xs:size-4 rounded-sm bg-foreground" />
                  <span className="size-3.5 xs:size-4 rounded-sm bg-badge-service" />
                </div>
              </div>
              <div>
                <p className="text-[8px] text-muted-foreground">Espacement</p>
                <div className="mt-2 h-1 rounded bg-muted">
                  <div className="h-1 w-3/5 rounded bg-primary" />
                </div>
              </div>
              <div className="space-y-1.5 xs:space-y-2">
                <div className="h-5 xs:h-6 rounded border border-border/60 bg-card" />
                <div className="h-5 xs:h-6 rounded border border-border/60 bg-card" />
              </div>
            </div>
          </aside>
        </div>

        {/* Barre de pied du mock */}
        <div className="flex h-11 items-center justify-between border-t px-4 text-[9px] xs:text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Palette className="size-3 text-primary" /> Édition visuelle</span>
          <span className="inline-flex items-center gap-1.5"><Code2 className="size-3 text-badge-service" /> HTML propre</span>
          <span className="font-mono hidden xs:inline">375 · 768 · 1440 px</span>
        </div>
      </div>

      {/* Badge flottant inférieur (Caché sur mobile) */}
      <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-xl sm:flex">
        <span className="grid size-8 place-items-center rounded-md bg-primary font-display font-bold text-primary-foreground">36</span>
        <span className="text-xs">
          <strong className="block text-foreground">Blocs & éléments</strong>
          <span className="text-muted-foreground">prêts à assembler</span>
        </span>
      </div>
    </div>
  );
}