import { createFileRoute } from "@tanstack/react-router";
import { BuilderShell } from "@/components/site";
import { HeroSection, WhySection, ModelSection } from "@/components/pages/home";
import { SITE } from "@/data/site";

const PAGE_TITLE = `${SITE.tool} - Créez votre landing page sans coder | ${SITE.name}`;
const PAGE_DESC = `Constructeur visuel de ${SITE.name} : glissez des blocs, éditez vos textes et exportez un code HTML/Tailwind propre, 100 % dans le navigateur.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
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
