import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SpcDeskLogo } from "@/components/site";
import { DEVICES, DeviceSwitch, type Device } from "@/components/DeviceSwitch";
import { ThemeToggle } from "@/components/site";
import { BLOCKS, CATEGORY_META, getBlock, makeInstance, renderBlockInner, sectionStyle, uid, type BlockCategory, type BlockInstance, type ProjectState } from "@/lib/builderRegistry";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { createProject, getProject, saveProject } from "@/lib/projects";

export const Route = createFileRoute("/editor")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s['id'] === "string" ? s['id'] : undefined }),
  head: () => ({
    meta: [
      { title: "Éditeur - SPC Site Builder" },
      { name: "description", content: "Glissez vos blocs, éditez vos textes et ajustez vos styles en direct." },
      { property: "og:title", content: "Éditeur - SPC Site Builder" },
      { property: "og:description", content: "Éditeur visuel 3 panneaux de STAF PRINT CENTER." },
    ],
  }),
  component: Editor,
});

const PALETTES = [
  { name: "SPC Ambre", bg: "#fdfbf7", text: "#0f172a", accent: "#f97316" },
  { name: "Nuit", bg: "#0f172a", text: "#f8fafc", accent: "#f97316" },
  { name: "Océan", bg: "#ecfeff", text: "#083344", accent: "#0891b2" },
  { name: "Forêt", bg: "#f0fdf4", text: "#052e16", accent: "#059669" },
  { name: "Indigo", bg: "#eef2ff", text: "#1e1b4b", accent: "#4f46e5" },
];

function Editor() {
  const { id } = Route.useSearch();
  const nav = useNavigate();
  const [project, setProject] = useState<ProjectState | null>(null);
  const [past, setPast] = useState<BlockInstance[][]>([]);
  const [future, setFuture] = useState<BlockInstance[][]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [saved, setSaved] = useState(true);
  const [toDelete, setToDelete] = useState<string | null>(null);

  useEffect(() => {
    const p = id ? getProject(id) : undefined;
    if (p) { setProject(p); setPast([]); setFuture([]); }
    else { const np = createProject("Page vierge", []); nav({ to: "/editor", search: { id: np.id }, replace: true }); }
  }, [id, nav]);

  // Auto-save (debounced)
  useEffect(() => {
    if (!project) return;
    setSaved(false);
    const t = setTimeout(() => { saveProject(project); setSaved(true); }, 400);
    return () => clearTimeout(t);
  }, [project]);

  const commit = useCallback((fn: (b: BlockInstance[]) => BlockInstance[]) => {
    setProject((p) => {
      if (!p) return p;
      setPast((h) => [...h.slice(-49), p.blocks]);
      setFuture([]);
      return { ...p, blocks: fn(p.blocks) };
    });
  }, []);

  const undo = useCallback(() => {
    setPast((h) => {
      if (!h.length || !project) return h;
      setFuture((f) => [project.blocks, ...f]);
      setProject({ ...project, blocks: h[h.length - 1]! });
      return h.slice(0, -1);
    });
  }, [project]);
  const redo = useCallback(() => {
    setFuture((f) => {
      if (!f.length || !project) return f;
      setPast((h) => [...h, project.blocks]);
      setProject({ ...project, blocks: f[0]! });
      return f.slice(1);
    });
  }, [project]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.isContentEditable || ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") { e.preventDefault(); redo(); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [undo, redo]);

  if (!project) return <div className="grid h-screen place-items-center text-muted-foreground">Chargement…</div>;

  const updateField = (instanceId: string, key: string, value: string) =>
    commit((bs) => bs.map((b) => (b.instanceId === instanceId ? { ...b, customContent: { ...b.customContent, [key]: value } } : b)));

  const move = (i: number, dir: -1 | 1) => commit((bs) => {
    const j = i + dir; if (j < 0 || j >= bs.length) return bs;
    const n = [...bs];[n[i], n[j]] = [n[j]!, n[i]!]; return n;
  });

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const at = dropIndex ?? project.blocks.length;
    setDropIndex(null);
    const newId = e.dataTransfer.getData("spc/new");
    const from = e.dataTransfer.getData("spc/move");
    if (newId) {
      const inst = makeInstance(newId);
      commit((bs) => { const n = [...bs]; n.splice(at, 0, inst); return n; });
      setSelected(inst.instanceId);
    } else if (from !== "") {
      const f = Number(from);
      commit((bs) => { const n = [...bs]; const [m] = n.splice(f, 1); n.splice(at > f ? at - 1 : at, 0, m!); return n; });
    }
  };

  const sel = project.blocks.find((b) => b.instanceId === selected);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-panel px-4">
        <Link to="/" className="flex items-center">
          <SpcDeskLogo className="mx-auto h-10 w-auto" />
        </Link>
        <input value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })}
          className="w-48 rounded-md border-foreground bg-foreground/20 px-2 py-1 font-display text-sm hover:border focus:border focus:outline-none" />

        <span className="font-mono text-[10px] text-muted-foreground">{saved ? "● enregistré" : "○ enregistrement…"}</span>
        <div className="mx-auto"><DeviceSwitch value={device} onChange={setDevice} /></div>
        <div className="flex items-center gap-1">
          <IconBtn label="Annuler (Ctrl+Z)" onClick={undo} disabled={!past.length}>↶</IconBtn>
          <IconBtn label="Rétablir (Ctrl+Y)" onClick={redo} disabled={!future.length}>↷</IconBtn>
        </div>
        <Link to="/preview" search={{ id: project.id }} className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">Aperçu</Link>
        <Link to="/code-export" search={{ id: project.id }} className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Exporter</Link>
        <ThemeToggle />
      </header>

      <div className="flex min-h-0 flex-1">
        <Library onAdd={(bid) => { const inst = makeInstance(bid); commit((bs) => [...bs, inst]); setSelected(inst.instanceId); }} />

        {/* Canvas */}
        <main className="grid-bg flex-1 overflow-auto bg-background p-6" onClick={() => setSelected(null)}>
          <div
            className="spc-canvas @container mx-auto min-h-[60vh] bg-canvas shadow-2xl transition-[width] duration-300"
            style={{ width: DEVICES[device], maxWidth: "100%" }}
            onDragOver={(e) => { e.preventDefault(); if (!project.blocks.length) setDropIndex(0); }}
            onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropIndex(null); }}
            onDrop={onDrop}
          >
            {project.blocks.length === 0 && (
              <div className={`grid h-[60vh] place-items-center border-2 border-dashed text-sm text-muted-foreground ${dropIndex !== null ? "border-primary" : "border-muted-foreground/30"}`}>
                Glissez un bloc ici depuis la bibliothèque
              </div>
            )}
            {project.blocks.map((b, i) => (
              <div key={b.instanceId}>
                {dropIndex === i && <DropLine />}
                <CanvasBlock
                  inst={b} index={i} total={project.blocks.length} device={device}
                  selected={selected === b.instanceId}
                  onSelect={() => setSelected(b.instanceId)}
                  onField={(k, v) => updateField(b.instanceId, k, v)}
                  onDragOverHalf={(after) => setDropIndex(after ? i + 1 : i)}
                  onUp={() => move(i, -1)} onDown={() => move(i, 1)}
                  onDuplicate={() => commit((bs) => { const n = [...bs]; n.splice(i + 1, 0, { ...b, instanceId: uid(), customContent: { ...b.customContent } }); return n; })}
                  onDelete={() => setToDelete(b.instanceId)}
                />
              </div>
            ))}
            {dropIndex === project.blocks.length && project.blocks.length > 0 && <DropLine />}
          </div>
        </main>

        <ConfirmDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}
          title="Supprimer ce bloc ?" description="Le bloc sera retiré de la page. Vous pourrez l'annuler avec Ctrl+Z."
          onConfirm={() => { const d = toDelete; commit((bs) => bs.filter((x) => x.instanceId !== d)); setSelected(null); setToDelete(null); }} />
        <Inspector inst={sel} onChange={(k, v) => sel && updateField(sel.instanceId, k, v)} />
      </div>

      <div className="shrink-0 border-t bg-panel px-4 py-1.5 text-center text-[11px] text-muted-foreground">
        Besoin de visuels sur mesure ? <a href="https://brief.stafprint.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">brief.stafprint.com</a>
        {" · "}Outils images & couleurs : <a href="https://tools.stafprint.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">tools.stafprint.com</a>
      </div>
    </div>
  );
}

function DropLine() {
  return <div className="relative z-10 h-1 bg-primary shadow-[0_0_12px_var(--primary)]" />;
}

function IconBtn({ children, label, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return <button title={label} aria-label={label} {...p} className="grid h-8 w-8 place-items-center rounded-md text-base hover:bg-accent disabled:opacity-30">{children}</button>;
}

function Library({ onAdd }: { onAdd: (id: string) => void }) {
  const [tab, setTab] = useState<"blocks" | "elements">("blocks");
  const [q, setQ] = useState("");
  const match = (b: (typeof BLOCKS)[number]) => (b.name + b.thumbnail).toLowerCase().includes(q.toLowerCase());
  const cats = (Object.keys(CATEGORY_META) as BlockCategory[]).filter((c) => c !== "element");
  const drag = (id: string) => (e: React.DragEvent) => e.dataTransfer.setData("spc/new", id);
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r bg-panel">
      <div className="p-4 pb-0">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bibliothèque</h2>
        <div className="mt-3 flex rounded-md border p-0.5" role="tablist">
          {([["blocks", "Blocs"], ["elements", "Éléments"]] as const).map(([v, l]) => (
            <button key={v} role="tab" aria-selected={tab === v} onClick={() => setTab(v)} className={`flex-1 rounded px-2 py-1 text-xs font-medium ${tab === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{l}</button>
          ))}
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher…" className="mt-3 w-full rounded-md border bg-background px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none" />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tab === "elements" ? (
          <div className="grid grid-cols-2 gap-1.5">
            {BLOCKS.filter((b) => b.category === "element" && match(b)).map((b) => (
              <button key={b.id} draggable onDragStart={drag(b.id)} onClick={() => onAdd(b.id)} title={b.thumbnail}
                className="cursor-grab rounded-md border bg-card px-2 py-2 text-left transition hover:border-primary active:cursor-grabbing">
                <span className="block text-xs font-medium">{b.name}</span>
                <span className="block truncate text-[10px] text-muted-foreground">{b.thumbnail}</span>
              </button>
            ))}
          </div>
        ) : cats.map((c) => {
          const list = BLOCKS.filter((b) => b.category === c && match(b));
          if (!list.length) return null;
          return (
            <div key={c} className="mb-5">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${CATEGORY_META[c].className}`}>{CATEGORY_META[c].label}</span>
              <div className="mt-2 space-y-2">
                {list.map((b) => (
                  <div key={b.id} draggable onDragStart={drag(b.id)} onDoubleClick={() => onAdd(b.id)}
                    className="group cursor-grab rounded-lg border bg-card p-3 transition hover:border-primary active:cursor-grabbing">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{b.name}</p>
                      <button onClick={() => onAdd(b.id)} className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-primary" aria-label="Ajouter">+ ajouter</button>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{b.thumbnail}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <p className="mt-4 text-[11px] text-muted-foreground">Glissez dans la page, ou cliquez pour ajouter à la fin.</p>
      </div>
    </aside>
  );
}

interface CBProps {
  inst: BlockInstance; index: number; total: number; selected: boolean; device: Device;
  onSelect: () => void; onField: (k: string, v: string) => void; onDragOverHalf: (after: boolean) => void;
  onUp: () => void; onDown: () => void; onDuplicate: () => void; onDelete: () => void;
}

function CanvasBlock({ inst, index, total, selected, device, onSelect, onField, onDragOverHalf, onUp, onDown, onDuplicate, onDelete }: CBProps) {
  const ref = useRef<HTMLElement>(null);
  const html = renderBlockInner(inst);
  const c = inst.customContent;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || el.contains(document.activeElement)) return;
    el.innerHTML = html;
    el.querySelectorAll<HTMLElement>("[data-field]").forEach((n) => { n.contentEditable = "true"; n.spellcheck = false; });
    el.querySelectorAll("a").forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));
  }, [html]);

  const hidden = (device === "mobile" && c['hideMobile']) || (device !== "mobile" && c['hideDesktop']);
  const block = getBlock(inst.blockId);

  return (
    <motion.div layout transition={{ duration: 0.2 }}
      className={`group relative ${selected ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50"} ${hidden ? "opacity-30" : ""}`}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); const r = e.currentTarget.getBoundingClientRect(); onDragOverHalf(e.clientY > r.top + r.height / 2); }}
    >
      <div className={`absolute right-2 top-2 z-10 flex items-center gap-0.5 rounded-md border bg-panel p-0.5 text-foreground shadow-lg ${selected ? "flex" : "hidden group-hover:flex"}`}>
        <span draggable onDragStart={(e) => e.dataTransfer.setData("spc/move", String(index))} className="cursor-grab px-1.5 font-mono text-xs text-muted-foreground" title="Glisser pour déplacer">⠿ {block?.name}</span>
        <ToolBtn label="Monter" onClick={onUp} disabled={index === 0}>↑</ToolBtn>
        <ToolBtn label="Descendre" onClick={onDown} disabled={index === total - 1}>↓</ToolBtn>
        <ToolBtn label="Dupliquer" onClick={onDuplicate}>⧉</ToolBtn>
        <ToolBtn label="Supprimer" onClick={onDelete} danger>✕</ToolBtn>
      </div>
      {hidden && <span className="absolute left-2 top-2 z-10 rounded bg-panel px-2 py-0.5 text-[10px] text-muted-foreground">Masqué sur cet écran</span>}
      <section
        ref={ref}
        style={Object.fromEntries(sectionStyle(c).split(";").map((d) => { const [k = "", ...v] = d.split(":"); return [k.startsWith("--") ? k : k.replace(/-(\w)/g, (_, l) => l.toUpperCase()), v.join(":")]; }))}
        onBlur={(e) => {
          const t = e.target as HTMLElement; const k = t.dataset['field'];
          if (k && t.innerText !== String(c[k] ?? "")) onField(k, t.innerText);
        }}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); (e.target as HTMLElement).blur(); } }}
      />
    </motion.div>
  );
}

function ToolBtn({ children, label, danger, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string; danger?: boolean }) {
  return (
    <button title={label} aria-label={label} {...p}
      onClick={(e) => { e.stopPropagation(); p.onClick?.(e); }}
      className={`grid h-7 w-7 place-items-center rounded text-sm hover:bg-accent disabled:opacity-30 ${danger ? "hover:text-destructive" : ""}`}>{children}</button>
  );
}

const STYLE_KEYS = new Set(["backgroundColor", "textColor", "accentColor", "padY", "align", "hideMobile", "hideDesktop"]);

function Inspector({ inst, onChange }: { inst: BlockInstance | undefined; onChange: (k: string, v: string) => void }) {
  if (!inst) {
    return (
      <aside className="w-72 shrink-0 overflow-y-auto border-l bg-panel p-5 text-sm text-muted-foreground">
        <h2 className="text-xs font-semibold uppercase tracking-wider">Inspecteur</h2>
        <p className="mt-4">Sélectionnez un bloc dans la page pour modifier ses couleurs, images et espacements.</p>
        <p className="mt-3">Astuce : cliquez directement sur un texte pour le réécrire.</p>
      </aside>
    );
  }
  const block = getBlock(inst.blockId)!;
  const c: Record<string, any> = { ...block.defaultContent, ...inst.customContent };
  const imgKeys = Array.from(block.htmlTemplate.matchAll(/data-img="(\w+)"/g)).map((m) => m[1]!);
  const linkBases = Object.keys(c).filter((k) => k.endsWith("Target")).map((k) => k.slice(0, -6));
  const linkKeys = new Set(linkBases.flatMap((b) => [`${b}Url`, `${b}Target`]));
  const textKeys = Object.keys(c).filter((k) => !STYLE_KEYS.has(k) && !imgKeys.includes(k) && !linkKeys.has(k));
  const label = "mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground";
  const input = "w-full rounded-md border bg-background px-2.5 py-1.5 text-sm focus:border-primary focus:outline-none";

  return (
    <aside className="w-72 shrink-0 overflow-y-auto border-l bg-panel p-5">
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${CATEGORY_META[block.category].className}`}>{CATEGORY_META[block.category].label}</span>
      <h2 className="mt-2 text-lg font-semibold">{block.name}</h2>

      <Group title="Palette">
        <div className="flex flex-wrap gap-2">
          {PALETTES.map((p) => (
            <button key={p.name} title={p.name} onClick={() => { onChange("backgroundColor", p.bg); onChange("textColor", p.text); onChange("accentColor", p.accent); }}
              className="flex h-7 overflow-hidden rounded-md border hover:border-primary">
              <span className="w-4" style={{ background: p.bg }} /><span className="w-4" style={{ background: p.text }} /><span className="w-4" style={{ background: p.accent }} />
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {([["backgroundColor", "Fond"], ["textColor", "Texte"], ["accentColor", "Accent"]] as const).map(([k, l]) => (
            <label key={k} className="text-center">
              <input type="color" value={c[k]} onChange={(e) => onChange(k, e.target.value)} className="h-9 w-full cursor-pointer rounded border bg-transparent" />
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
              <input className={input} value={c[k]?.startsWith("data:") ? "(image importée)" : c[k]} placeholder="URL de l'image" onChange={(e) => onChange(k, e.target.value)} />
              <label className="mt-1.5 block cursor-pointer text-center text-xs text-primary hover:underline">
                Importer depuis l'appareil
                <input type="file" accept="image/*" hidden onChange={(e) => {
                  const f = e.target.files?.[0]; if (!f) return;
                  const r = new FileReader(); r.onload = () => onChange(k, String(r.result)); r.readAsDataURL(f);
                }} />
              </label>
            </div>
          ))}
        </Group>
      )}

      {linkBases.length > 0 && (
        <Group title="Liens">
          {linkBases.map((b) => (
            <div key={b} className="mb-3">
              <label className={label}>Lien du bouton « {String(c[`${b}Text`] ?? c[b] ?? b)} »</label>
              <input className={input} value={c[`${b}Url`] ?? ""} placeholder="https://… ou #contact" onChange={(e) => onChange(`${b}Url`, e.target.value)} />
              <label className={`${label} mt-2`}>Ouverture</label>
              <div className="flex rounded-md border p-0.5">
                {[["_self", "Même onglet"], ["_blank", "Nouvel onglet"]].map(([v, l]) => (
                  <button key={v} onClick={() => onChange(`${b}Target`, v!)} className={`flex-1 rounded px-2 py-1 text-xs ${(c[`${b}Target`] || "_self") === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{l}</button>
                ))}
              </div>
            </div>
          ))}
        </Group>
      )}

      <Group title="Mise en page">
        <label className={label}>Espacement vertical · {c['padY']}px</label>
        <input type="range" min={0} max={200} step={8} value={c['padY']} onChange={(e) => onChange("padY", e.target.value)} className="w-full accent-primary" />
        <label className={`${label} mt-3`}>Alignement</label>
        <div className="flex rounded-md border p-0.5">
          {[["left", "Gauche"], ["center", "Centre"], ["right", "Droite"]].map(([v, l]) => (
            <button key={v} onClick={() => onChange("align", v!)} className={`flex-1 rounded px-2 py-1 text-xs ${c['align'] === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{l}</button>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" className="accent-primary" checked={!!c['hideMobile']} onChange={(e) => onChange("hideMobile", e.target.checked ? "1" : "")} />Masquer sur mobile</label>
        <label className="mt-1.5 flex items-center gap-2 text-sm"><input type="checkbox" className="accent-primary" checked={!!c['hideDesktop']} onChange={(e) => onChange("hideDesktop", e.target.checked ? "1" : "")} />Masquer sur ordinateur</label>
      </Group>

      {textKeys.length > 0 && <Group title="Contenu">
        {textKeys.map((k) => (
          <div key={k} className="mb-2.5">
            <label className={label}>{k}</label>
            <textarea rows={String(c[k]).length > 50 ? 3 : 1} className={`${input} resize-none`} value={c[k]} onChange={(e) => onChange(k, e.target.value)} />
          </div>
        ))}
      </Group>}
    </aside>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}
