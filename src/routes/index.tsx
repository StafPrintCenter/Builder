import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BuilderShell } from "@/components/site";
import { HeroSection, WhySection } from "@/components/pages/home";
import { TemplateCard } from "@/components/TemplateCard";
import { Button } from "@/components/ui/button";
import { TEMPLATES } from "@/lib/builderRegistry";

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

function Home() {
  return (
    <BuilderShell>
      <main className="flex-1">
        <HeroSection />
        <WhySection />

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
