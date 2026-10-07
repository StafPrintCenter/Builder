import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, MonitorSmartphone, MousePointer2, RotateCcw, Save, ShieldCheck } from "lucide-react";
import { BuilderShell } from "@/components/site";
import { HeroSection } from "@/components/pages/home";
import { TemplateCard } from "@/components/TemplateCard";
import { Button } from "@/components/ui/button";
import { BLOCKS, TEMPLATES } from "@/lib/builderRegistry";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPC Site Builder — Créez votre landing page sans coder" },
      { name: "description", content: "Constructeur visuel de STAF PRINT CENTER : glissez des blocs, éditez vos textes et exportez un code HTML/Tailwind propre, 100 % dans le navigateur." },
      { property: "og:title", content: "SPC Site Builder — Créez votre landing page sans coder" },
      { property: "og:description", content: "Glissez, éditez, exportez. Le constructeur de pages de STAF PRINT CENTER." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});

const STEPS = [
  { n: "01", t: "Choisissez un point de départ", d: "Un modèle prêt à l'emploi ou une page vierge." },
  { n: "02", t: "Glissez blocs et éléments", d: "Sections complètes ou éléments simples : titre, bouton, image…" },
  { n: "03", t: "Personnalisez en direct", d: "Cliquez sur un texte pour le réécrire, réglez couleurs, liens et images." },
  { n: "04", t: "Exportez", d: "Code HTML/Tailwind, fichier ZIP ou sauvegarde .spcbuild." },
];

const FEATURES = [
  { icon: ShieldCheck, t: "Zéro serveur, zéro compte", d: "Vos projets restent dans votre navigateur. Rien n'est envoyé ailleurs." },
  { icon: MonitorSmartphone, t: "Aperçu multi-écrans", d: "Basculez ordinateur, tablette et mobile pour vérifier le rendu." },
  { icon: Code2, t: "Code propre", d: "Un HTML lisible, prêt à héberger où vous voulez." },
  { icon: RotateCcw, t: "Annuler / rétablir", d: "Ctrl+Z et Ctrl+Y pour expérimenter sans risque." },
  { icon: MousePointer2, t: "Liens configurables", d: "Chaque bouton a son adresse et s'ouvre dans le même ou un nouvel onglet." },
  { icon: Save, t: "Sauvegarde portable", d: "Exportez un .spcbuild et réimportez-le sur un autre appareil." },
];

function Home() {
  const nBlocks = BLOCKS.filter((b) => b.category !== "element").length;
  const nEls = BLOCKS.length - nBlocks;

  return (
    <BuilderShell>
      <main className="flex-1">
        <HeroSection />

        <section className="border-y bg-panel/45">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="flex items-center gap-5"><h2 className="font-mono text-xs font-semibold uppercase text-muted-foreground">Comment ça marche</h2><span className="h-px flex-1 bg-border" /></div>
            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {STEPS.map((s) => (
                <div key={s.n} className="group rounded-lg border bg-background/40 p-6 transition hover:border-primary/40">
                  <p className="font-display text-4xl font-bold text-muted transition group-hover:text-primary/30">{s.n}</p>
                  <p className="mt-4 font-display font-semibold">{s.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex items-center gap-5"><h2 className="font-mono text-xs font-semibold uppercase text-muted-foreground">Pourquoi SPC Site Builder</h2><span className="h-px flex-1 bg-border" /></div>
          <div className="mt-10 grid overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, ...f }) => (
              <div key={f.t} className="bg-background p-7 transition hover:bg-card">
                <Icon className="size-5 text-primary" />
                <p className="mt-5 font-display text-lg font-semibold">{f.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t bg-panel/45">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><p className="font-mono text-xs uppercase text-primary">Démarrer rapidement</p><h2 className="mt-3 text-3xl font-bold">Modèles optimisés</h2></div>
              <Button asChild variant="ghost"><Link to="/templates">Voir toute la galerie <ArrowRight /></Link></Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{TEMPLATES.map((t) => <TemplateCard key={t.id} template={t} />)}</div>
          </div>
        </section>
      </main>
    </BuilderShell>
  );
}
