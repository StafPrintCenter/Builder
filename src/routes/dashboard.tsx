import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, FileUp, FolderOpen, LayoutGrid, Search } from "lucide-react";
import { BuilderShell } from "@/components/site";
import { ProjectHeader } from "@/components/pages/projects";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteProject, importProject, useProjects } from "@/lib/projects";
import { SITE } from "@/data/site";

const PAGE_TITLE = `Mes projets - ${SITE.tool} | ${SITE.name}`;
const PAGE_DESC = `Retrouvez, modifiez, exportez ou supprimez vos landing pages enregistrées.`;

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

const PER_PAGE = 9;

function Dashboard() {
  const projects = useProjects();
  const nav = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [toDelete, setToDelete] = useState<{ id: string; title: string } | null>(null);

  const filtered = projects.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const shown = filtered.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);

  const onImport = async (f?: File) => {
    if (!f) return;
    try { const p = importProject(await f.text()); nav({ to: "/editor", search: { id: p.id } }); }
    catch (e) { alert((e as Error).message); }
  };

  return (
    <BuilderShell>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b pb-8 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Espace de travail</p>
            <h1 className="mt-2 truncate text-3xl font-bold sm:text-4xl">Mes projets</h1>
            <p className="mt-2 text-sm text-muted-foreground">{projects.length} {projects.length > 1 ? "pages enregistrées" : "page enregistrée"} sur cet appareil</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" onClick={() => fileRef.current?.click()}><FileUp /><span className="hidden sm:inline">Importer</span></Button>
            <Button asChild><Link to="/editor" search={{ id: undefined }}>Page vierge <ArrowRight /></Link></Button>
            <input ref={fileRef} type="file" accept=".spcbuild,.json" hidden onChange={(e) => onImport(e.target.files?.[0])} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="relative min-w-0 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Rechercher un projet…" className="pl-9" />
          </div>
          <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground"><LayoutGrid className="size-4" /> {filtered.length} résultat{filtered.length > 1 ? "s" : ""}</div>
        </div>

        {shown.length === 0 ? (
          <div className="mt-8 border border-dashed bg-card p-12 text-center">
            <FolderOpen className="mx-auto size-8 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">{projects.length ? "Aucun projet trouvé" : "Votre espace est prêt"}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{projects.length ? "Essayez une autre recherche." : "Choisissez un modèle professionnel ou partez d’une page vierge."}</p>
            {!projects.length && <Button asChild className="mt-5"><Link to="/templates">Découvrir les modèles</Link></Button>}
          </div>
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
