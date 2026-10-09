import { useMemo } from "react";
import { Code2, Eye, LayoutGrid, PencilLine, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { exportHtml, type ProjectState } from "@/lib/builderRegistry";

export function ProjectCard({ project, onDelete }: { project: ProjectState; onDelete: () => void }) {
  const html = useMemo(() => exportHtml(project), [project]);
  const isEmpty = project.blocks.length === 0;
  const updated = new Date(project.updatedAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border bg-card transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl">
      <Link to="/editor" search={{ id: project.id }} className="relative block aspect-16/10 overflow-hidden border-b bg-muted" aria-label={`Ouvrir ${project.title}`}>
        {isEmpty ? (
          <div className="grid h-full place-items-center grid-bg">
            <div className="text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-lg border bg-background"><LayoutGrid className="size-5 text-primary" /></span>
              <p className="mt-3 text-xs font-semibold text-muted-foreground">Page à construire</p>
            </div>
          </div>
        ) : (
          <iframe title={`Aperçu de ${project.title}`} srcDoc={html} tabIndex={-1} className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50 bg-canvas" />
        )}
        <div className="absolute inset-0 grid place-items-center bg-background/80 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-md border bg-panel px-4 py-2 font-display text-sm font-semibold">
            <PencilLine className="size-4 text-primary" /> Ouvrir dans l’éditeur
          </span>
        </div>
        <div className="absolute left-3 top-3 rounded-md border bg-panel/90 px-2 py-1 font-mono text-[9px] uppercase text-muted-foreground backdrop-blur">
          {project.blocks.length} {project.blocks.length > 1 ? "blocs" : "bloc"}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="truncate font-display text-lg font-bold transition-colors group-hover:text-primary">
          <Link to="/editor" search={{ id: project.id }}>{project.title}</Link>
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">Modifié le {updated}</p>

        <div className="mt-auto grid grid-cols-[1fr_1fr_auto] gap-2 pt-5">
          <Button asChild variant="outline" size="sm"><Link to="/preview" search={{ id: project.id }}><Eye />Aperçu</Link></Button>
          <Button asChild variant="outline" size="sm"><Link to="/export" search={{ id: project.id }}><Code2 />Code</Link></Button>
          <Button variant="ghost" size="icon" onClick={onDelete} aria-label={`Supprimer ${project.title}`} title="Supprimer" className="text-destructive hover:text-destructive"><Trash2 /></Button>
        </div>
      </div>
    </article>
  );
}
