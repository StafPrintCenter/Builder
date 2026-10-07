import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, FileText, Flag, Layers, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { changelog, roadmapFeatures, milestones } from "@/data";
import { isNewFeature } from "@/lib/roadmap-utils";
import { cn } from "@/lib/utils";

type Result = {
  id: string;
  kind: "Fonctionnalité" | "Jalon" | "Version" | "Page";
  title: string;
  hint: string;
  isNew?: boolean;
  go: () => void;
};

const PAGES = [
  { to: "/", label: "Explorateur de roadmap" },
  { to: "/calendar", label: "Calendrier & frise" },
  { to: "/compare", label: "Comparatif des plateformes" },
  { to: "/features", label: "Priorités & analyses" },
  { to: "/changelog", label: "Notes de version" },
  { to: "/status", label: "État des services" },
  { to: "/submit", label: "Proposer une idée" },
] as const;

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const openEvent = () => setOpen(true);
    window.addEventListener("spc:open-search", openEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("spc:open-search", openEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const results = useMemo<Result[]>(() => {
    const q = norm(query.trim());
    const all: Result[] = [
      ...roadmapFeatures.map((f) => ({
        id: f.id,
        kind: "Fonctionnalité" as const,
        title: f.title,
        hint: `${f.subdomain} · ${f.quarter}`,
        isNew: isNewFeature(f),
        go: () => navigate({ to: "/features/$featureId", params: { featureId: f.id } }),
      })),
      ...milestones.map((m) => ({
        id: m.id,
        kind: "Jalon" as const,
        title: m.title,
        hint: `${new Date(m.date).toLocaleDateString("fr-FR")} · ${m.subdomain}`,
        go: () => navigate({ to: "/calendar" }),
      })),
      ...changelog.map((c) => ({
        id: c.version,
        kind: "Version" as const,
        title: `${c.version} - ${c.title}`,
        hint: new Date(c.date).toLocaleDateString("fr-FR"),
        go: () => navigate({ to: "/changelog" }),
      })),
      ...PAGES.map((p) => ({
        id: p.to,
        kind: "Page" as const,
        title: p.label,
        hint: p.to,
        go: () => navigate({ to: p.to }),
      })),
    ];
    if (!q) return all.filter((r) => r.kind === "Page" || r.isNew).slice(0, 10);
    return all
      .filter((r) => norm(`${r.title} ${r.hint} ${r.kind}`).includes(q))
      .slice(0, 12);
  }, [query, navigate]);

  if (!open) return null;

  const run = (r?: Result) => {
    if (!r) return;
    r.go();
    setOpen(false);
  };

  const ICONS = {
    Fonctionnalité: Layers,
    Jalon: Flag,
    Version: FileText,
    Page: CalendarDays,
  } as const;

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center bg-background/70 px-4 pt-24 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Recherche globale"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, results.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              }
              if (e.key === "Enter") {
                e.preventDefault();
                run(results[active]);
              }
            }}
            placeholder="Rechercher une fonctionnalité, un jalon, une version…"
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
            Esc
          </kbd>
        </div>

        <ul className="max-h-88 overflow-y-auto p-2">
          {results.map((r, i) => {
            const Icon = ICONS[r.kind];
            return (
              <li key={`${r.kind}-${r.id}`}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(r)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    i === active ? "bg-secondary" : "hover:bg-secondary/60",
                  )}
                >
                  <Icon className="size-4 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold">{r.title}</span>
                      {r.isNew && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary/15 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-primary">
                          <Sparkles className="size-2.5" /> Nouveau
                        </span>
                      )}
                    </span>
                    <span className="block truncate font-mono text-[10px] text-muted-foreground">
                      {r.hint}
                    </span>
                  </span>
                  <span className="hidden shrink-0 font-mono text-[10px] text-muted-foreground sm:block">
                    {r.kind}
                  </span>
                </button>
              </li>
            );
          })}
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-muted-foreground">
              Aucun résultat pour « {query} »
            </li>
          )}
        </ul>

        <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[10px] text-muted-foreground">
          <span>↑ ↓ naviguer · ⏎ ouvrir</span>
          <span>Ctrl + K</span>
        </div>
      </div>
    </div>
  );
}

export function openCommandPalette() {
  window.dispatchEvent(new Event("spc:open-search"));
}
