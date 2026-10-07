import { Link } from "@tanstack/react-router";
import { BookOpen, LifeBuoy } from "lucide-react";
import { SITE, SITE_LINK } from "@/data/site";
import { SiteBuilderIllustration } from "./SiteBuilderIllustration";
import { BLOCKS, TEMPLATES } from "@/lib/builderRegistry";

export function HeroSection() {
  const nBlocks = BLOCKS.filter((b) => b.category !== "element").length;
  const nEls = BLOCKS.length - nBlocks;

  return (
    <section className="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:items-center lg:gap-10">
      <div className="flex flex-col items-start text-left">
        <a
          href={SITE_LINK.landingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <BookOpen className="h-3.5 w-3.5 text-primary" />
          Le constructeur visuel de {SITE.name}
        </a>

        <h1 className="mt-7 text-balance text-4xl font-extralight leading-[1.08] tracking-tight sm:text-6xl">
          Maîtrisez <span className="font-black">{SITE.name}</span><br />
          en glissant <span className="text-primary">quelques blocs.</span>
        </h1>

        <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          Créez une landing page pour votre activité en quelques minutes, sans écrire une ligne de code.
        </p>

        <div className="mt-8 flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link
            to="/dashboard"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            <BookOpen className="size-4" />
            Mes projets
          </Link>
          <Link
            to="/templates"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary  /50 sm:w-auto"
          >
            <LifeBuoy className="size-4 text-primary" />
            Voir les modèles
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase text-muted-foreground">
          <span>{nBlocks} blocs</span><span>{nEls} éléments</span><span>{TEMPLATES.length} modèles</span>
        </div>
      </div>

      <SiteBuilderIllustration />
    </section>
  );
}