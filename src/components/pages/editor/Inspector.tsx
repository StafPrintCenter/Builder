import type React from "react";
import { CATEGORY_META, getBlock, type BlockInstance } from "@/lib/builderRegistry";

const PALETTES = [
  { name: "SPC Ambre", bg: "#fdfbf7", text: "#0f172a", accent: "#f97316" },
  { name: "Nuit", bg: "#0f172a", text: "#f8fafc", accent: "#f97316" },
  { name: "Océan", bg: "#ecfeff", text: "#083344", accent: "#0891b2" },
  { name: "Forêt", bg: "#f0fdf4", text: "#052e16", accent: "#059669" },
  { name: "Indigo", bg: "#eef2ff", text: "#1e1b4b", accent: "#4f46e5" },
];

const STYLE_KEYS = new Set([
  "backgroundColor",
  "textColor",
  "accentColor",
  "padY",
  "align",
  "hideMobile",
  "hideDesktop",
]);

interface InspectorProps {
  inst: BlockInstance | undefined;
  onChange: (k: string, v: string) => void;
}

export function Inspector({ inst, onChange }: InspectorProps) {
  if (!inst) {
    return (
      <aside className="w-72 shrink-0 overflow-y-auto border-l bg-panel p-5 text-sm text-muted-foreground">
        <h2 className="text-xs font-semibold uppercase tracking-wider">Inspecteur</h2>
        <p className="mt-4">
          Sélectionnez un bloc dans la page pour modifier ses couleurs, images et espacements.
        </p>
        <p className="mt-3">Astuce : cliquez directement sur un texte pour le réécrire.</p>
      </aside>
    );
  }

  const block = getBlock(inst.blockId)!;
  const c: Record<string, any> = { ...block.defaultContent, ...inst.customContent };
  const imgKeys = Array.from(block.htmlTemplate.matchAll(/data-img="(\w+)"/g)).map((m) => m[1]!);
  const linkBases = Object.keys(c)
    .filter((k) => k.endsWith("Target"))
    .map((k) => k.slice(0, -6));
  const linkKeys = new Set(linkBases.flatMap((b) => [`${b}Url`, `${b}Target`]));
  const textKeys = Object.keys(c).filter(
    (k) => !STYLE_KEYS.has(k) && !imgKeys.includes(k) && !linkKeys.has(k)
  );
  const label = "mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground";
  const input =
    "w-full rounded-md border bg-background px-2.5 py-1.5 text-sm focus:border-primary focus:outline-none";

  return (
    <aside className="w-72 shrink-0 overflow-y-auto border-l bg-panel p-5">
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${CATEGORY_META[block.category].className}`}
      >
        {CATEGORY_META[block.category].label}
      </span>
      <h2 className="mt-2 text-lg font-semibold">{block.name}</h2>

      <Group title="Palette">
        <div className="flex flex-wrap gap-2">
          {PALETTES.map((p) => (
            <button
              key={p.name}
              title={p.name}
              onClick={() => {
                onChange("backgroundColor", p.bg);
                onChange("textColor", p.text);
                onChange("accentColor", p.accent);
              }}
              className="flex h-7 overflow-hidden rounded-md border hover:border-primary"
            >
              <span className="w-4" style={{ background: p.bg }} />
              <span className="w-4" style={{ background: p.text }} />
              <span className="w-4" style={{ background: p.accent }} />
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {(
            [
              ["backgroundColor", "Fond"],
              ["textColor", "Texte"],
              ["accentColor", "Accent"],
            ] as const
          ).map(([k, l]) => (
            <label key={k} className="text-center">
              <input
                type="color"
                value={c[k]}
                onChange={(e) => onChange(k, e.target.value)}
                className="h-9 w-full cursor-pointer rounded border bg-transparent"
              />
              <span className="text-[11px] text-muted-foreground">{l}</span>
            </label>
          ))}
        </div>
      </Group>

      {imgKeys.length > 0 && (
        <Group title="Médias">
          {imgKeys.map((k) => (
            <div key={k} className="mb-3">
              <img src={c[k]} alt="" className="mb-2 aspect-video w-full rounded object-cover" />
              <input
                className={input}
                value={c[k]?.startsWith("data:") ? "(image importée)" : c[k]}
                placeholder="URL de l'image"
                onChange={(e) => onChange(k, e.target.value)}
              />
              <label className="mt-1.5 block cursor-pointer text-center text-xs text-primary hover:underline">
                Importer depuis l'appareil
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const r = new FileReader();
                    r.onload = () => onChange(k, String(r.result));
                    r.readAsDataURL(f);
                  }}
                />
              </label>
            </div>
          ))}
        </Group>
      )}

      {linkBases.length > 0 && (
        <Group title="Liens">
          {linkBases.map((b) => (
            <div key={b} className="mb-3">
              <label className={label}>
                Lien du bouton « {String(c[`${b}Text`] ?? c[b] ?? b)} »
              </label>
              <input
                className={input}
                value={c[`${b}Url`] ?? ""}
                placeholder="https://… ou #contact"
                onChange={(e) => onChange(`${b}Url`, e.target.value)}
              />
              <label className={`${label} mt-2`}>Ouverture</label>
              <div className="flex rounded-md border p-0.5">
                {[
                  ["_self", "Même onglet"],
                  ["_blank", "Nouvel onglet"],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    onClick={() => onChange(`${b}Target`, v!)}
                    className={`flex-1 rounded px-2 py-1 text-xs ${(c[`${b}Target`] || "_self") === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </Group>
      )}

      <Group title="Mise en page">
        <label className={label}>Espacement vertical · {c['padY']}px</label>
        <input
          type="range"
          min={0}
          max={200}
          step={8}
          value={c['padY']}
          onChange={(e) => onChange("padY", e.target.value)}
          className="w-full accent-primary"
        />
        <label className={`${label} mt-3`}>Alignement</label>
        <div className="flex rounded-md border p-0.5">
          {[
            ["left", "Gauche"],
            ["center", "Centre"],
            ["right", "Droite"],
          ].map(([v, l]) => (
            <button
              key={v}
              onClick={() => onChange("align", v!)}
              className={`flex-1 rounded px-2 py-1 text-xs ${c['align'] === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              {l}
            </button>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="accent-primary"
            checked={!!c['hideMobile']}
            onChange={(e) => onChange("hideMobile", e.target.checked ? "1" : "")}
          />
          Masquer sur mobile
        </label>
        <label className="mt-1.5 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="accent-primary"
            checked={!!c['hideDesktop']}
            onChange={(e) => onChange("hideDesktop", e.target.checked ? "1" : "")}
          />
          Masquer sur ordinateur
        </label>
      </Group>

      {textKeys.length > 0 && (
        <Group title="Contenu">
          {textKeys.map((k) => (
            <div key={k} className="mb-2.5">
              <label className={label}>{k}</label>
              <textarea
                rows={String(c[k]).length > 50 ? 3 : 1}
                className={`${input} resize-none`}
                value={c[k]}
                onChange={(e) => onChange(k, e.target.value)}
              />
            </div>
          ))}
        </Group>
      )}
    </aside>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}