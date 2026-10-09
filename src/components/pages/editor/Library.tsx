import { useState } from "react";
import { BLOCKS, CATEGORY_META, type BlockCategory } from "@/lib/builderRegistry";

interface LibraryProps {
  onAdd: (id: string) => void;
}

export function Library({ onAdd }: LibraryProps) {
  const [tab, setTab] = useState<"blocks" | "elements">("blocks");
  const [q, setQ] = useState("");

  const match = (b: (typeof BLOCKS)[number]) =>
    (b.name + b.thumbnail).toLowerCase().includes(q.toLowerCase());
  const cats = (Object.keys(CATEGORY_META) as BlockCategory[]).filter((c) => c !== "element");
  const drag = (id: string) => (e: React.DragEvent) => e.dataTransfer.setData("spc/new", id);

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r bg-panel">
      <div className="p-4 pb-0">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Bibliothèque
        </h2>
        <div className="mt-3 flex rounded-md border p-0.5" role="tablist">
          {(
            [
              ["blocks", "Blocs"],
              ["elements", "Éléments"],
            ] as const
          ).map(([v, l]) => (
            <button
              key={v}
              role="tab"
              aria-selected={tab === v}
              onClick={() => setTab(v)}
              className={`flex-1 rounded px-2 py-1 text-xs font-medium ${tab === v
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {l}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher…"
          className="mt-3 w-full rounded-md border bg-background px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tab === "elements" ? (
          <div className="grid grid-cols-2 gap-1.5">
            {BLOCKS.filter((b) => b.category === "element" && match(b)).map((b) => (
              <button
                key={b.id}
                draggable
                onDragStart={drag(b.id)}
                onClick={() => onAdd(b.id)}
                title={b.thumbnail}
                className="cursor-grab rounded-md border bg-card px-2 py-2 text-left transition hover:border-primary active:cursor-grabbing"
              >
                <span className="block text-xs font-medium">{b.name}</span>
                <span className="block truncate text-[10px] text-muted-foreground">
                  {b.thumbnail}
                </span>
              </button>
            ))}
          </div>
        ) : (
          cats.map((c) => {
            const list = BLOCKS.filter((b) => b.category === c && match(b));
            if (!list.length) return null;
            return (
              <div key={c} className="mb-5">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${CATEGORY_META[c].className}`}
                >
                  {CATEGORY_META[c].label}
                </span>
                <div className="mt-2 space-y-2">
                  {list.map((b) => (
                    <div
                      key={b.id}
                      draggable
                      onDragStart={drag(b.id)}
                      onDoubleClick={() => onAdd(b.id)}
                      className="group cursor-grab rounded-lg border bg-card p-3 transition hover:border-primary active:cursor-grabbing"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{b.name}</p>
                        <button
                          onClick={() => onAdd(b.id)}
                          className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-primary"
                          aria-label="Ajouter"
                        >
                          + ajouter
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{b.thumbnail}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
        <p className="mt-4 text-[11px] text-muted-foreground">
          Glissez dans la page, ou cliquez pour ajouter à la fin.
        </p>
      </div>
    </aside>
  );
}