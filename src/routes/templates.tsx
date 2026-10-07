import { createFileRoute } from "@tanstack/react-router";
import { LayoutGrid, Sparkles } from "lucide-react";
import { BuilderShell } from "@/components/site";
import { TemplateCard } from "@/components/TemplateCard";
import { BLOCKS, TEMPLATES } from "@/lib/builderRegistry";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Modèles SPC - SPC Site Builder" },
      { name: "description", content: "Galerie de modèles de landing pages pré-construits par STAF PRINT CENTER." },
      { property: "og:title", content: "Modèles SPC - SPC Site Builder" },
      { property: "og:description", content: "Choisissez un modèle et personnalisez-le en quelques minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Templates,
});

function Templates() {
  return (
    <BuilderShell>
      <main className="w-full flex-1">
        <section className="border-b bg-panel/45">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase text-primary"><Sparkles className="size-4" /> Collection SPC</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">Un point de départ professionnel pour chaque projet.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">Prévisualisez une page complète, choisissez votre base, puis adaptez chaque détail dans l’éditeur visuel.</p>
            <div className="mt-8 flex gap-6 font-mono text-xs uppercase text-muted-foreground"><span>{TEMPLATES.length} modèles</span><span>{BLOCKS.length} éléments disponibles</span></div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-center gap-3"><LayoutGrid className="size-5 text-primary" /><h2 className="text-xl font-semibold">Tous les modèles</h2></div>
          <div className="mt-8 grid gap-7 md:grid-cols-2">{TEMPLATES.map((t) => <TemplateCard key={t.id} template={t} />)}</div>
        </section>
      </main>
    </BuilderShell>
  );
}
