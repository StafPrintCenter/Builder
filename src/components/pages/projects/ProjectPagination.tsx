import { useState } from "react";
import { LayoutGrid, Search } from "lucide-react";
import { BuilderShell } from "@/components/site";
import { ProjectHeader, ProjectEmpty } from "@/components/pages/projects";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteProject, useProjects } from "@/lib/projects";

const PER_PAGE = 3;

export function ProjectPagination() {
  const projects = useProjects();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [toDelete, setToDelete] = useState<{ id: string; title: string } | null>(null);

  const filtered = projects.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const shown = filtered.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);

  return (
    <BuilderShell>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
        <ProjectHeader />

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="relative min-w-0 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Rechercher un projet…" className="pl-9" />
          </div>
          <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground"><LayoutGrid className="size-4" /> {filtered.length} résultat{filtered.length > 1 ? "s" : ""}</div>
        </div>

        {shown.length === 0 ? (
          <ProjectEmpty />
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard key={p.id} project={p} onDelete={() => setToDelete({ id: p.id, title: p.title })} />
            ))}
          </div>
        )}

        {pages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-1">
            <Button variant="outline" size="sm" disabled={cur === 1} onClick={() => setPage(cur - 1)}>‹ Précédent</Button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <Button key={n} size="icon" variant={n === cur ? "default" : "outline"} onClick={() => setPage(n)} className="size-8">{n}</Button>
            ))}
            <Button variant="outline" size="sm" disabled={cur === pages} onClick={() => setPage(cur + 1)}>Suivant ›</Button>
          </div>
        )}
      </main>

      <ConfirmDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}
        title="Supprimer ce projet ?"
        description={`« ${toDelete?.title ?? ""} » sera définitivement supprimé de ce navigateur. Pensez à l'exporter en .spcbuild si vous voulez le garder.`}
        onConfirm={() => { if (toDelete) deleteProject(toDelete.id); setToDelete(null); }} />

    </BuilderShell>
  );
}
