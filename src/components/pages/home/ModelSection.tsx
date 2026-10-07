import { Link } from "@tanstack/react-router";
import { ArrowRight, Code2, MonitorSmartphone, MousePointer2, RotateCcw, Save, ShieldCheck } from "lucide-react";
import { TemplateCard } from "@/components/TemplateCard";
import { Button } from "@/components/ui/button";
import { TEMPLATES } from "@/lib/builderRegistry";

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

export function WhySection() {
  return (
    <div>
      <section className="border-t bg-panel/45">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="font-mono text-xs uppercase text-primary">Démarrer rapidement</p><h2 className="mt-3 text-3xl font-bold">Modèles optimisés</h2></div>
            <Button asChild variant="ghost"><Link to="/templates">Voir toute la galerie <ArrowRight /></Link></Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{TEMPLATES.map((t) => <TemplateCard key={t.id} template={t} />)}</div>
        </div>
      </section>
    </div>
  );
}
