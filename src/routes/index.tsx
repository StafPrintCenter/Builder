import { createFileRoute } from "@tanstack/react-router";
import { BuilderShell } from "@/components/site";
import { HeroSection, WhySection, ModelSection } from "@/components/pages/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPC Site Builder - Créez votre landing page sans coder" },
      { name: "description", content: "Constructeur visuel de STAF PRINT CENTER : glissez des blocs, éditez vos textes et exportez un code HTML/Tailwind propre, 100 % dans le navigateur." },
      { property: "og:title", content: "SPC Site Builder - Créez votre landing page sans coder" },
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
        <ModelSection />
      </main>
    </BuilderShell>
  );
}
