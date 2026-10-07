import { Code2, MonitorSmartphone, MousePointer2, RotateCcw, Save, ShieldCheck } from "lucide-react";

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
    </div>
  );
}
