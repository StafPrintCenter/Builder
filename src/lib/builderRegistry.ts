export type BlockType = "hero" | "about" | "services" | "pricing" | "portfolio" | "contact" | "footer" | "nav" | "cta" | "testimonials" | "faq" | "team" | "steps" | "element";
export type BlockCategory = "element" | "hero" | "offer" | "service" | "form";

export interface BlockSchema {
  id: string;
  type: BlockType;
  name: string;
  thumbnail: string;
  category: BlockCategory;
  defaultContent: {
    title?: string;
    subtitle?: string;
    body?: string;
    ctaText?: string;
    imageUrl?: string;
    backgroundColor?: string;
    [key: string]: string | undefined;
  };
  htmlTemplate: string;
}

export interface BlockInstance {
  instanceId: string;
  blockId: string;
  customContent: Record<string, any>;
}

export interface ProjectState {
  id: string;
  title: string;
  updatedAt: string;
  blocks: BlockInstance[];
}

export const CATEGORY_META: Record<BlockCategory, { label: string; className: string }> = {
  element: { label: "Éléments simples", className: "bg-primary/15 text-primary" },
  hero: { label: "Hero & En-têtes", className: "bg-badge-hero/15 text-badge-hero" },
  offer: { label: "Offres & Tarifs", className: "bg-badge-offer/15 text-badge-offer" },
  service: { label: "Services & Portfolios", className: "bg-badge-service/15 text-badge-service" },
  form: { label: "Formulaires & Footers", className: "bg-badge-form/15 text-badge-form" },
};

/** Style keys handled by the inspector, shared by every block. */
export const STYLE_DEFAULTS = {
  backgroundColor: "#fdfbf7",
  textColor: "#0f172a",
  accentColor: "#f97316",
  padY: "80",
  align: "left",
  hideMobile: "",
  hideDesktop: "",
};

const IMG = (seed: string) => `https://picsum.photos/seed/${seed}/1200/800`;

const btn = `display:inline-block;background:var(--a);color:#fff;padding:14px 26px;border-radius:999px;font-weight:600;text-decoration:none`;

export const BLOCKS: BlockSchema[] = [
  {
    id: "hero-split",
    type: "hero",
    category: "hero",
    name: "Hero divisé",
    thumbnail: "Titre + image côte à côte",
    defaultContent: {
      title: "Votre image de marque, imprimée avec précision",
      subtitle: "STAF PRINT CENTER · PORTO-NOVO",
      body: "Cartes, flyers, bâches et sites web : un seul partenaire pour toute votre communication.",
      ctaText: "Demander un devis",
      ctaUrl: "#contact",
      ctaTarget: "_self",
      imageUrl: IMG("spc-hero"),
    },
    htmlTemplate: `<div class="max-w-6xl mx-auto px-6 grid gap-10 items-center @3xl:grid-cols-2">
  <div>
    <p data-field="subtitle" style="color:var(--a);letter-spacing:.2em;font-size:12px;font-weight:700">{{subtitle}}</p>
    <h1 data-field="title" class="mt-4 text-4xl @3xl:text-6xl font-bold leading-tight">{{title}}</h1>
    <p data-field="body" class="mt-6 text-lg opacity-75">{{body}}</p>
    <a href="{{ctaUrl}}" target="{{ctaTarget}}" rel="noopener" data-field="ctaText" class="mt-8" style="${btn}">{{ctaText}}</a>
  </div>
  <img data-img="imageUrl" src="{{imageUrl}}" alt="" class="w-full rounded-2xl object-cover aspect-4/3" />
</div>`,
  },
  {
    id: "hero-centered",
    type: "hero",
    category: "hero",
    name: "Hero centré",
    thumbnail: "Grand titre centré + CTA",
    defaultContent: {
      title: "Lancez votre présence en ligne aujourd'hui",
      subtitle: "Nouveau",
      body: "Une page claire, rapide et prête à convertir vos visiteurs en clients.",
      ctaText: "Commencer",
      ctaUrl: "#",
      ctaTarget: "_self",
      backgroundColor: "#0f172a",
      textColor: "#f8fafc",
      align: "center",
      padY: "120",
    },
    htmlTemplate: `<div class="max-w-3xl mx-auto px-6">
  <span data-field="subtitle" style="border:1px solid var(--a);color:var(--a);padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600">{{subtitle}}</span>
  <h1 data-field="title" class="mt-6 text-4xl @3xl:text-7xl font-bold leading-tight">{{title}}</h1>
  <p data-field="body" class="mt-6 text-lg opacity-70">{{body}}</p>
  <div class="mt-10"><a href="{{ctaUrl}}" target="{{ctaTarget}}" rel="noopener" data-field="ctaText" style="${btn}">{{ctaText}}</a></div>
</div>`,
  },
  {
    id: "about-text",
    type: "about",
    category: "service",
    name: "Présentation",
    thumbnail: "Texte d'introduction + chiffres",
    defaultContent: {
      title: "Plus de 10 ans au service des entreprises béninoises",
      body: "Nous accompagnons commerçants, ONG et institutions dans la conception et l'impression de supports qui marquent les esprits.",
      stat1: "2 500+", stat1Label: "Clients servis",
      stat2: "48h", stat2Label: "Délai moyen",
      stat3: "98%", stat3Label: "Satisfaction",
    },
    htmlTemplate: `<div class="max-w-5xl mx-auto px-6">
  <h2 data-field="title" class="text-3xl @3xl:text-4xl font-bold max-w-2xl">{{title}}</h2>
  <p data-field="body" class="mt-5 text-lg opacity-75 max-w-2xl">{{body}}</p>
  <div class="mt-12 grid gap-8 @2xl:grid-cols-3">
    <div><p data-field="stat1" class="text-4xl font-bold" style="color:var(--a)">{{stat1}}</p><p data-field="stat1Label" class="opacity-60">{{stat1Label}}</p></div>
    <div><p data-field="stat2" class="text-4xl font-bold" style="color:var(--a)">{{stat2}}</p><p data-field="stat2Label" class="opacity-60">{{stat2Label}}</p></div>
    <div><p data-field="stat3" class="text-4xl font-bold" style="color:var(--a)">{{stat3}}</p><p data-field="stat3Label" class="opacity-60">{{stat3Label}}</p></div>
  </div>
</div>`,
  },
  {
    id: "services-cards",
    type: "services",
    category: "service",
    name: "Cartes services",
    thumbnail: "3 cartes de services print",
    defaultContent: {
      title: "Nos services",
      subtitle: "Tout pour votre communication",
      s1: "Impression numérique", s1d: "Flyers, cartes de visite, brochures en haute définition.",
      s2: "Grand format", s2d: "Bâches, kakémonos et enseignes résistantes.",
      s3: "Création web", s3d: "Sites vitrines rapides et optimisés mobile.",
      backgroundColor: "#ffffff",
    },
    htmlTemplate: `<div class="max-w-6xl mx-auto px-6">
  <p data-field="subtitle" style="color:var(--a);font-weight:600">{{subtitle}}</p>
  <h2 data-field="title" class="mt-2 text-3xl @3xl:text-4xl font-bold">{{title}}</h2>
  <div class="mt-10 grid gap-6 @3xl:grid-cols-3">
    <div class="p-7 rounded-2xl" style="border:1px solid rgba(0,0,0,.08)"><div style="width:40px;height:4px;background:var(--a);border-radius:4px"></div><h3 data-field="s1" class="mt-5 text-xl font-semibold">{{s1}}</h3><p data-field="s1d" class="mt-2 opacity-70">{{s1d}}</p></div>
    <div class="p-7 rounded-2xl" style="border:1px solid rgba(0,0,0,.08)"><div style="width:40px;height:4px;background:var(--a);border-radius:4px"></div><h3 data-field="s2" class="mt-5 text-xl font-semibold">{{s2}}</h3><p data-field="s2d" class="mt-2 opacity-70">{{s2d}}</p></div>
    <div class="p-7 rounded-2xl" style="border:1px solid rgba(0,0,0,.08)"><div style="width:40px;height:4px;background:var(--a);border-radius:4px"></div><h3 data-field="s3" class="mt-5 text-xl font-semibold">{{s3}}</h3><p data-field="s3d" class="mt-2 opacity-70">{{s3d}}</p></div>
  </div>
</div>`,
  },
  {
    id: "pricing-grid",
    type: "pricing",
    category: "offer",
    name: "Grille de tarifs",
    thumbnail: "3 offres Print / Web",
    defaultContent: {
      title: "Des offres claires",
      p1: "Starter", p1p: "25 000 FCFA", p1d: "500 cartes de visite · Design inclus",
      p2: "Business", p2p: "95 000 FCFA", p2d: "Pack identité + flyers + bâche",
      p3: "Web", p3p: "180 000 FCFA", p3d: "Site vitrine 5 pages · Hébergement 1 an",
      ctaText: "Choisir",
      ctaUrl: "#contact",
      ctaTarget: "_self",
      align: "center",
    },
    htmlTemplate: `<div class="max-w-6xl mx-auto px-6">
  <h2 data-field="title" class="text-3xl @3xl:text-4xl font-bold">{{title}}</h2>
  <div class="mt-12 grid gap-6 @3xl:grid-cols-3 text-left">
    <div class="p-8 rounded-2xl" style="border:1px solid rgba(0,0,0,.1)"><p data-field="p1" class="font-semibold">{{p1}}</p><p data-field="p1p" class="mt-3 text-3xl font-bold">{{p1p}}</p><p data-field="p1d" class="mt-3 opacity-70">{{p1d}}</p></div>
    <div class="p-8 rounded-2xl" style="background:var(--a);color:#fff"><p data-field="p2" class="font-semibold">{{p2}}</p><p data-field="p2p" class="mt-3 text-3xl font-bold">{{p2p}}</p><p data-field="p2d" class="mt-3 opacity-90">{{p2d}}</p><a href="{{ctaUrl}}" target="{{ctaTarget}}" rel="noopener" data-field="ctaText" class="mt-6" style="display:inline-block;background:#fff;color:#111;padding:10px 20px;border-radius:999px;font-weight:600;text-decoration:none">{{ctaText}}</a></div>
    <div class="p-8 rounded-2xl" style="border:1px solid rgba(0,0,0,.1)"><p data-field="p3" class="font-semibold">{{p3}}</p><p data-field="p3p" class="mt-3 text-3xl font-bold">{{p3p}}</p><p data-field="p3d" class="mt-3 opacity-70">{{p3d}}</p></div>
  </div>
</div>`,
  },
  {
    id: "portfolio-gallery",
    type: "portfolio",
    category: "service",
    name: "Galerie réalisations",
    thumbnail: "Grille de 3 images",
    defaultContent: {
      title: "Nos réalisations",
      img1: IMG("spc-p1"), img2: IMG("spc-p2"), img3: IMG("spc-p3"),
    },
    htmlTemplate: `<div class="max-w-6xl mx-auto px-6">
  <h2 data-field="title" class="text-3xl @3xl:text-4xl font-bold">{{title}}</h2>
  <div class="mt-10 grid gap-4 @2xl:grid-cols-3">
    <img data-img="img1" src="{{img1}}" alt="" class="w-full aspect-square object-cover rounded-xl" />
    <img data-img="img2" src="{{img2}}" alt="" class="w-full aspect-square object-cover rounded-xl" />
    <img data-img="img3" src="{{img3}}" alt="" class="w-full aspect-square object-cover rounded-xl" />
  </div>
</div>`,
  },
  {
    id: "contact-form",
    type: "contact",
    category: "form",
    name: "Formulaire de contact",
    thumbnail: "Coordonnées + formulaire",
    defaultContent: {
      title: "Parlons de votre projet",
      body: "Réponse sous 24h. Passez aussi nous voir à Porto-Novo.",
      phone: "+229 00 00 00 00",
      email: "contact@exemple.com",
      ctaText: "Envoyer",
    },
    htmlTemplate: `<div id="contact" class="max-w-5xl mx-auto px-6 grid gap-10 @3xl:grid-cols-2">
  <div>
    <h2 data-field="title" class="text-3xl @3xl:text-4xl font-bold">{{title}}</h2>
    <p data-field="body" class="mt-4 opacity-75">{{body}}</p>
    <p data-field="phone" class="mt-6 font-semibold">{{phone}}</p>
    <p data-field="email" class="font-semibold" style="color:var(--a)">{{email}}</p>
  </div>
  <form class="grid gap-3" onsubmit="return false">
    <input placeholder="Nom" class="px-4 py-3 rounded-lg" style="border:1px solid rgba(0,0,0,.15);background:transparent" />
    <input placeholder="Email" class="px-4 py-3 rounded-lg" style="border:1px solid rgba(0,0,0,.15);background:transparent" />
    <textarea placeholder="Message" rows="4" class="px-4 py-3 rounded-lg" style="border:1px solid rgba(0,0,0,.15);background:transparent"></textarea>
    <button type="submit" data-field="ctaText" style="${btn};border:0">{{ctaText}}</button>
  </form>
</div>`,
  },
  {
    id: "footer-simple",
    type: "footer",
    category: "form",
    name: "Footer simple",
    thumbnail: "Marque + mentions",
    defaultContent: {
      title: "Ma Marque",
      body: "© 2026 Tous droits réservés · Propulsé par SPC Site Builder",
      backgroundColor: "#020617",
      textColor: "#cbd5e1",
      padY: "40",
    },
    htmlTemplate: `<div class="max-w-6xl mx-auto px-6 flex flex-col @2xl:flex-row gap-3 @2xl:items-center @2xl:justify-between">
  <p data-field="title" class="text-lg font-bold" style="color:var(--a)">{{title}}</p>
  <p data-field="body" class="text-sm opacity-70">{{body}}</p>
</div>`,
  },
];

BLOCKS.push(...EXTRA_BLOCKS());

export const getBlock = (id: string) => BLOCKS.find((b) => b.id === id);

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function makeInstance(blockId: string): BlockInstance {
  const b = getBlock(blockId)!;
  return { instanceId: uid(), blockId, customContent: { ...STYLE_DEFAULTS, ...b.defaultContent } };
}

const esc = (s: string) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Inner HTML for a block (template with values injected). */
export function renderBlockInner(inst: BlockInstance) {
  const b = getBlock(inst.blockId);
  if (!b) return "";
  return b.htmlTemplate.replace(/\{\{(\w+)\}\}/g, (_, k) => esc(inst.customContent[k] ?? b.defaultContent[k] ?? ""));
}

export function sectionStyle(c: Record<string, any>) {
  return `background:${c['backgroundColor']};color:${c['textColor']};--a:${c['accentColor']};padding:${c['padY']}px 0;text-align:${c['align']}`;
}

/** Clean exportable HTML document. */
export function exportHtml(p: ProjectState) {
  const sections = p.blocks
    .map((inst) => {
      const c = inst.customContent;
      const hide = [c['hideMobile'] ? "max-md:hidden" : "", c['hideDesktop'] ? "md:hidden" : ""].filter(Boolean).join(" ");
      const inner = renderBlockInner(inst).replace(/\s(data-field|data-img)="[^"]*"/g, "");
      return `<section${hide ? ` class="${hide}"` : ""} style="${sectionStyle(c)}">\n${inner}\n</section>`;
    })
    .join("\n\n");
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(p.title)}</title>
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
<style>body{margin:0;font-family:'Space Grotesk',system-ui,sans-serif}</style>
</head>
<body>
<main class="@container">
${sections}
</main>
</body>
</html>`;
}

export interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  blocks: string[];
}

export const TEMPLATES: TemplatePreset[] = [
  { id: "imprimerie", name: "Imprimerie complète", description: "Hero, services, tarifs, réalisations et contact.", blocks: ["hero-split", "services-cards", "pricing-grid", "portfolio-gallery", "contact-form", "footer-simple"] },
  { id: "lancement", name: "Lancement produit", description: "Page courte pour annoncer une offre.", blocks: ["hero-centered", "about-text", "pricing-grid", "footer-simple"] },
  { id: "portfolio", name: "Portfolio graphiste", description: "Mettez vos créations en avant.", blocks: ["hero-centered", "portfolio-gallery", "about-text", "contact-form", "footer-simple"] },
  { id: "vide", name: "Page vierge", description: "Partez de zéro.", blocks: [] },
];

/** Additional sections + simple elements (title, paragraph, button, image…). */
function EXTRA_BLOCKS(): BlockSchema[] {
  const card = `class="p-7 rounded-2xl" style="border:1px solid rgba(0,0,0,.08)"`;
  const el = (id: string, name: string, thumbnail: string, defaultContent: BlockSchema["defaultContent"], htmlTemplate: string): BlockSchema =>
    ({ id, type: "element", category: "element", name, thumbnail, defaultContent: { padY: "16", ...defaultContent }, htmlTemplate });
  return [
    // ---- Simple elements
    el("el-heading", "Titre", "Un titre H2", { title: "Votre titre ici" },
      `<div class="max-w-5xl mx-auto px-6"><h2 data-field="title" class="text-3xl @3xl:text-5xl font-bold leading-tight">{{title}}</h2></div>`),
    el("el-subheading", "Sous-titre", "Petit titre accentué", { title: "SOUS-TITRE" },
      `<div class="max-w-5xl mx-auto px-6"><p data-field="title" style="color:var(--a);letter-spacing:.2em;font-size:13px;font-weight:700">{{title}}</p></div>`),
    el("el-paragraph", "Paragraphe", "Bloc de texte", { body: "Écrivez ici votre texte. Cliquez pour le modifier directement dans la page." },
      `<div class="max-w-3xl mx-auto px-6"><p data-field="body" class="text-lg leading-relaxed opacity-80">{{body}}</p></div>`),
    el("el-button", "Bouton", "Bouton avec lien", { ctaText: "Cliquez ici", ctaUrl: "#", ctaTarget: "_self" },
      `<div class="max-w-5xl mx-auto px-6"><a href="{{ctaUrl}}" target="{{ctaTarget}}" rel="noopener" data-field="ctaText" style="${btn}">{{ctaText}}</a></div>`),
    el("el-image", "Image", "Image pleine largeur", { imageUrl: IMG("spc-el"), alt: "Description de l'image" },
      `<div class="max-w-5xl mx-auto px-6"><img data-img="imageUrl" src="{{imageUrl}}" alt="{{alt}}" class="w-full rounded-2xl object-cover" /></div>`),
    el("el-quote", "Citation", "Texte mis en avant", { body: "« La qualité n'est jamais un accident. »", author: "- John Ruskin" },
      `<div class="max-w-3xl mx-auto px-6"><blockquote style="border-left:4px solid var(--a);padding-left:20px"><p data-field="body" class="text-2xl italic">{{body}}</p><p data-field="author" class="mt-3 opacity-60">{{author}}</p></blockquote></div>`),
    el("el-list", "Liste", "3 points à puces", { i1: "Premier avantage", i2: "Deuxième avantage", i3: "Troisième avantage" },
      `<div class="max-w-3xl mx-auto px-6"><ul class="grid gap-3 text-lg" style="list-style:none;padding:0">${[1, 2, 3].map((n) => `<li style="display:flex;gap:12px;align-items:center"><span style="color:var(--a);font-weight:700">✓</span><span data-field="i${n}">{{i${n}}}</span></li>`).join("")}</ul></div>`),
    el("el-video", "Vidéo YouTube", "Lecteur intégré", { videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      `<div class="max-w-4xl mx-auto px-6"><iframe src="{{videoUrl}}" class="w-full aspect-video rounded-2xl" style="border:0" allowfullscreen></iframe></div>`),
    el("el-divider", "Séparateur", "Ligne horizontale", {},
      `<div class="max-w-5xl mx-auto px-6"><hr style="border:0;border-top:1px solid currentColor;opacity:.15" /></div>`),
    el("el-spacer", "Espace", "Espace vide réglable", { padY: "32" }, `<div></div>`),
    el("el-heading-xl", "Grand titre", "Titre H1 d'accroche", { title: "Un titre qui accroche" },
      `<div class="max-w-5xl mx-auto px-6"><h1 data-field="title" class="text-4xl @3xl:text-7xl font-bold leading-tight">{{title}}</h1></div>`),
    el("el-badge", "Badge", "Étiquette arrondie", { title: "Nouveau" },
      `<div class="max-w-5xl mx-auto px-6"><span data-field="title" style="display:inline-block;border:1px solid var(--a);color:var(--a);padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600">{{title}}</span></div>`),
    el("el-link", "Lien texte", "Lien souligné", { linkText: "En savoir plus →", linkUrl: "#", linkTarget: "_self" },
      `<div class="max-w-5xl mx-auto px-6"><a href="{{linkUrl}}" target="{{linkTarget}}" rel="noopener" data-field="linkText" style="color:var(--a);font-weight:600;text-decoration:underline">{{linkText}}</a></div>`),
    el("el-buttons", "Deux boutons", "Bouton principal + secondaire", { ctaText: "Commencer", ctaUrl: "#", ctaTarget: "_self", cta2Text: "En savoir plus", cta2Url: "#", cta2Target: "_self" },
      `<div class="max-w-5xl mx-auto px-6" style="display:flex;gap:12px;flex-wrap:wrap;justify-content:inherit"><a href="{{ctaUrl}}" target="{{ctaTarget}}" rel="noopener" data-field="ctaText" style="${btn}">{{ctaText}}</a><a href="{{cta2Url}}" target="{{cta2Target}}" rel="noopener" data-field="cta2Text" style="${btn};background:transparent;color:inherit;border:1px solid currentColor">{{cta2Text}}</a></div>`),
    el("el-two-cols", "Deux colonnes", "Texte sur 2 colonnes", { c1: "Première colonne de texte.", c2: "Deuxième colonne de texte." },
      `<div class="max-w-5xl mx-auto px-6 grid gap-8 @2xl:grid-cols-2"><p data-field="c1" class="opacity-80">{{c1}}</p><p data-field="c2" class="opacity-80">{{c2}}</p></div>`),
    el("el-image-text", "Image + texte", "Image à gauche, texte à droite", { imageUrl: IMG("spc-it"), title: "Titre", body: "Un court texte d'explication à côté de l'image." },
      `<div class="max-w-5xl mx-auto px-6 grid gap-8 items-center @2xl:grid-cols-2"><img data-img="imageUrl" src="{{imageUrl}}" alt="" class="w-full rounded-2xl object-cover aspect-4/3" /><div><h3 data-field="title" class="text-2xl font-bold">{{title}}</h3><p data-field="body" class="mt-3 opacity-75">{{body}}</p></div></div>`),
    el("el-card", "Carte", "Encadré titre + texte", { title: "Titre de la carte", body: "Texte de la carte." },
      `<div class="max-w-md mx-auto px-6"><div class="p-7 rounded-2xl" style="border:1px solid rgba(0,0,0,.1)"><div style="width:40px;height:4px;background:var(--a);border-radius:4px"></div><h3 data-field="title" class="mt-4 text-xl font-semibold">{{title}}</h3><p data-field="body" class="mt-2 opacity-70">{{body}}</p></div></div>`),
    el("el-alert", "Encadré info", "Message mis en valeur", { body: "ℹ️ Information importante pour vos visiteurs." },
      `<div class="max-w-3xl mx-auto px-6"><p data-field="body" class="p-4 rounded-xl" style="background:color-mix(in srgb, var(--a) 12%, transparent);border:1px solid var(--a)">{{body}}</p></div>`),
    el("el-numbered", "Liste numérotée", "3 points numérotés", { i1: "Première étape", i2: "Deuxième étape", i3: "Troisième étape" },
      `<div class="max-w-3xl mx-auto px-6"><ol class="grid gap-3 text-lg" style="list-style:none;padding:0">${[1, 2, 3].map((n) => `<li style="display:flex;gap:12px;align-items:center"><span style="color:var(--a);font-weight:700">${n}.</span><span data-field="i${n}">{{i${n}}}</span></li>`).join("")}</ol></div>`),
    el("el-stat", "Chiffre clé", "Gros chiffre + légende", { title: "2 500+", body: "Clients satisfaits" },
      `<div class="max-w-5xl mx-auto px-6"><p data-field="title" class="text-5xl font-bold" style="color:var(--a)">{{title}}</p><p data-field="body" class="opacity-60">{{body}}</p></div>`),
    el("el-map", "Carte Google", "Plan intégré", { mapQuery: "Porto-Novo, Bénin" },
      `<div class="max-w-5xl mx-auto px-6"><iframe src="https://maps.google.com/maps?q={{mapQuery}}&output=embed" class="w-full rounded-2xl" style="border:0;height:360px" loading="lazy"></iframe></div>`),
    el("el-social", "Réseaux sociaux", "Liens Facebook, WhatsApp…", { s1: "Facebook", s1Url: "https://facebook.com", s1Target: "_blank", s2: "WhatsApp", s2Url: "https://wa.me/22900000000", s2Target: "_blank", s3: "Instagram", s3Url: "https://instagram.com", s3Target: "_blank" },
      `<div class="max-w-5xl mx-auto px-6" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:inherit">${[1, 2, 3].map((n) => `<a href="{{s${n}Url}}" target="{{s${n}Target}}" rel="noopener" data-field="s${n}" style="border:1px solid currentColor;padding:8px 16px;border-radius:999px;text-decoration:none;color:inherit;font-size:14px">{{s${n}}}</a>`).join("")}</div>`),

    // ---- Sections
    {
      id: "nav-bar", type: "nav", category: "hero", name: "Barre de navigation", thumbnail: "Logo + liens + bouton",
      defaultContent: { title: "Ma Marque", l1: "Services", l2: "Tarifs", l3: "Contact", ctaText: "Devis", ctaUrl: "#contact", ctaTarget: "_self", padY: "20" },
      htmlTemplate: `<div class="max-w-6xl mx-auto px-6 flex items-center justify-between gap-6">
  <p data-field="title" class="text-xl font-bold">{{title}}</p>
  <nav class="hidden @3xl:flex gap-8 opacity-75"><span data-field="l1">{{l1}}</span><span data-field="l2">{{l2}}</span><span data-field="l3">{{l3}}</span></nav>
  <a href="{{ctaUrl}}" target="{{ctaTarget}}" rel="noopener" data-field="ctaText" style="${btn};padding:10px 20px">{{ctaText}}</a>
</div>`,
    },
    {
      id: "cta-banner", type: "cta", category: "offer", name: "Bandeau d'appel", thumbnail: "Titre + bouton sur fond accent",
      defaultContent: { title: "Prêt à lancer votre projet ?", body: "Obtenez votre devis gratuit en moins de 24h.", ctaText: "Contactez-nous", ctaUrl: "#contact", ctaTarget: "_self", backgroundColor: "#f97316", textColor: "#ffffff", accentColor: "#0f172a", align: "center", padY: "72" },
      htmlTemplate: `<div class="max-w-3xl mx-auto px-6">
  <h2 data-field="title" class="text-3xl @3xl:text-5xl font-bold">{{title}}</h2>
  <p data-field="body" class="mt-4 text-lg opacity-90">{{body}}</p>
  <div class="mt-8"><a href="{{ctaUrl}}" target="{{ctaTarget}}" rel="noopener" data-field="ctaText" style="${btn}">{{ctaText}}</a></div>
</div>`,
    },
    {
      id: "testimonials", type: "testimonials", category: "service", name: "Témoignages", thumbnail: "3 avis clients",
      defaultContent: { title: "Ils nous font confiance", t1: "Travail impeccable et livré à temps.", a1: "Aïcha, commerçante", t2: "Des bâches d'une qualité remarquable.", a2: "Koffi, ONG locale", t3: "Notre site a doublé nos demandes.", a3: "Rachid, restaurateur", backgroundColor: "#ffffff" },
      htmlTemplate: `<div class="max-w-6xl mx-auto px-6">
  <h2 data-field="title" class="text-3xl @3xl:text-4xl font-bold">{{title}}</h2>
  <div class="mt-10 grid gap-6 @3xl:grid-cols-3 text-left">${[1, 2, 3].map((n) => `<div ${card}><p style="color:var(--a)">★★★★★</p><p data-field="t${n}" class="mt-3 text-lg">{{t${n}}}</p><p data-field="a${n}" class="mt-4 text-sm opacity-60">{{a${n}}}</p></div>`).join("")}</div>
</div>`,
    },
    {
      id: "faq", type: "faq", category: "form", name: "FAQ", thumbnail: "Questions fréquentes",
      defaultContent: { title: "Questions fréquentes", q1: "Quels sont vos délais ?", r1: "48h en moyenne pour l'impression numérique.", q2: "Livrez-vous ?", r2: "Oui, partout à Porto-Novo et Cotonou.", q3: "Comment payer ?", r3: "Espèces, Mobile Money ou virement." },
      htmlTemplate: `<div class="max-w-3xl mx-auto px-6">
  <h2 data-field="title" class="text-3xl @3xl:text-4xl font-bold">{{title}}</h2>
  <div class="mt-8 grid gap-3 text-left">${[1, 2, 3].map((n) => `<details class="p-5 rounded-xl" style="border:1px solid rgba(0,0,0,.1)" open><summary data-field="q${n}" class="font-semibold cursor-pointer">{{q${n}}}</summary><p data-field="r${n}" class="mt-2 opacity-70">{{r${n}}}</p></details>`).join("")}</div>
</div>`,
    },
    {
      id: "team", type: "team", category: "service", name: "Équipe", thumbnail: "3 membres avec photo",
      defaultContent: { title: "Notre équipe", img1: IMG("spc-t1"), n1: "Prénom Nom", r1: "Directeur", img2: IMG("spc-t2"), n2: "Prénom Nom", r2: "Graphiste", img3: IMG("spc-t3"), n3: "Prénom Nom", r3: "Développeur", align: "center" },
      htmlTemplate: `<div class="max-w-5xl mx-auto px-6">
  <h2 data-field="title" class="text-3xl @3xl:text-4xl font-bold">{{title}}</h2>
  <div class="mt-10 grid gap-8 @2xl:grid-cols-3">${[1, 2, 3].map((n) => `<div><img data-img="img${n}" src="{{img${n}}}" alt="" class="mx-auto w-32 h-32 rounded-full object-cover" /><p data-field="n${n}" class="mt-4 font-semibold">{{n${n}}}</p><p data-field="r${n}" class="text-sm opacity-60">{{r${n}}}</p></div>`).join("")}</div>
</div>`,
    },
    {
      id: "steps", type: "steps", category: "service", name: "Étapes / Process", thumbnail: "3 étapes numérotées",
      defaultContent: { title: "Comment ça marche", s1: "Brief", s1d: "Décrivez votre besoin.", s2: "Maquette", s2d: "Validez le design proposé.", s3: "Livraison", s3d: "Recevez vos supports." },
      htmlTemplate: `<div class="max-w-6xl mx-auto px-6">
  <h2 data-field="title" class="text-3xl @3xl:text-4xl font-bold">{{title}}</h2>
  <div class="mt-10 grid gap-6 @3xl:grid-cols-3">${[1, 2, 3].map((n) => `<div><p class="text-5xl font-bold" style="color:var(--a)">0${n}</p><h3 data-field="s${n}" class="mt-3 text-xl font-semibold">{{s${n}}}</h3><p data-field="s${n}d" class="mt-1 opacity-70">{{s${n}d}}</p></div>`).join("")}</div>
</div>`,
    },
  ];
}
