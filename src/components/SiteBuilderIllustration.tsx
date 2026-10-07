import { Code2, Image, LayoutTemplate, MousePointer2, Palette, Type } from "lucide-react";

const library = [
  { icon: LayoutTemplate, label: "Hero divisé" },
  { icon: Type, label: "Grand titre" },
  { icon: Image, label: "Image + texte" },
];

export function SiteBuilderIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-xl min-w-0 lg:mx-0 lg:max-w-none">
      <div className="overflow-hidden rounded-xl border bg-panel shadow-2xl">
        <div className="flex h-10 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-destructive" />
            <span className="size-2 rounded-full bg-badge-offer" />
            <span className="size-2 rounded-full bg-badge-form" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">campagne-print.spcbuild</span>
          <span className="rounded border px-2 py-0.5 font-mono text-[9px] text-muted-foreground">Enregistré</span>
        </div>

        <div className="grid h-80 grid-cols-[112px_1fr_96px] sm:h-96 sm:grid-cols-[140px_1fr_120px]">
          <aside className="border-r bg-background/40 p-3">
            <p className="mb-3 font-mono text-[8px] uppercase text-muted-foreground">Bibliothèque</p>
            <div className="space-y-2">
              {library.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded border bg-card p-2">
                  <Icon className="size-3 text-primary" />
                  <p className="mt-1.5 truncate text-[9px] font-medium">{label}</p>
                </div>
              ))}
            </div>
          </aside>

          <div className="grid-bg relative overflow-hidden bg-muted p-3 sm:p-5">
            <div className="mx-auto h-full max-w-xs overflow-hidden rounded border bg-canvas text-left text-background shadow-xl">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[8px] font-bold">NOVA STUDIO</span>
                <div className="flex gap-2 text-[6px] opacity-50"><span>Services</span><span>Contact</span></div>
              </div>
              <div className="grid grid-cols-[1.1fr_.9fr] items-center gap-3 px-4 py-6">
                <div>
                  <div className="mb-2 h-1 w-12 rounded bg-primary" />
                  <p className="text-sm font-bold leading-tight sm:text-lg">Une page qui transforme vos idées.</p>
                  <div className="mt-3 h-1.5 w-full rounded bg-background/15" />
                  <div className="mt-1 h-1.5 w-4/5 rounded bg-background/15" />
                  <div className="mt-4 inline-flex rounded bg-primary px-3 py-1.5 text-[7px] font-bold text-primary-foreground">Démarrer</div>
                </div>
                <div className="aspect-[4/3] rounded bg-background/10 p-2">
                  <div className="grid h-full grid-cols-2 gap-1">
                    <div className="rounded bg-primary/80" />
                    <div className="grid gap-1"><div className="rounded bg-badge-service/70" /><div className="rounded bg-background/20" /></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t px-4 py-4">
                {["Design", "Mobile", "Export"].map((label) => <div key={label} className="rounded border border-background/10 p-2 text-[7px] font-semibold">{label}</div>)}
              </div>
            </div>
            <div className="absolute left-[38%] top-[45%] rounded bg-primary p-1 text-primary-foreground shadow-lg">
              <MousePointer2 className="size-3" />
            </div>
          </div>

          <aside className="border-l bg-background/40 p-3">
            <p className="mb-3 font-mono text-[8px] uppercase text-muted-foreground">Style</p>
            <div className="space-y-4">
              <div><p className="text-[8px] text-muted-foreground">Couleurs</p><div className="mt-2 flex gap-1"><span className="size-4 rounded-sm bg-primary" /><span className="size-4 rounded-sm bg-canvas" /><span className="size-4 rounded-sm bg-badge-service" /></div></div>
              <div><p className="text-[8px] text-muted-foreground">Espacement</p><div className="mt-2 h-1 rounded bg-muted"><div className="h-1 w-3/5 rounded bg-primary" /></div></div>
              <div className="space-y-2"><div className="h-6 rounded border" /><div className="h-6 rounded border" /></div>
            </div>
          </aside>
        </div>

        <div className="flex h-11 items-center justify-between border-t px-4 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Palette className="size-3 text-primary" /> Édition visuelle</span>
          <span className="inline-flex items-center gap-1.5"><Code2 className="size-3 text-badge-service" /> HTML propre</span>
          <span>375 · 768 · 1440 px</span>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-xl sm:flex">
        <span className="grid size-8 place-items-center rounded-md bg-primary font-display font-bold text-primary-foreground">36</span>
        <span className="text-xs"><strong className="block text-foreground">Blocs & éléments</strong><span className="text-muted-foreground">prêts à assembler</span></span>
      </div>
    </div>
  );
}