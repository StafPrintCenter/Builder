import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BuilderShell } from "@/components/site";
import { ProjectHeader, ProjectEmpty, ProjectPagination } from "@/components/pages/projects";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ProjectCard } from "@/components/ProjectCard";
import { deleteProject, useProjects } from "@/lib/projects";
import { SITE } from "@/data/site";

const PAGE_TITLE = `Mes projets - ${SITE.tool} | ${SITE.name}`;
const PAGE_DESC = `Retrouvez, modifiez, exportez ou supprimez vos landing pages enregistrées.`;

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
    ],
  }),
  component: Dashboard,
});

const PER_PAGE = 6;

function Dashboard() {
  const projects = useProjects();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [toDelete, setToDelete] = useState<{ id: string; title: string } | null>(null);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase())
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const shown = filtered.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);

  const handleSearchChange = (query: string) => {
    setQ(query);
    setPage(1);
  };

  return (
    <BuilderShell>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {/* Entête avec barre de recherche connectée */}
        <ProjectHeader
          searchQuery={q}
          onSearchChange={handleSearchChange}
          filteredCount={filtered.length}
        />

        {/* Affichage de la liste ou de l'état vide */}
        {shown.length === 0 ? (
          <ProjectEmpty />
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onDelete={() => setToDelete({ id: p.id, title: p.title })}
              />
            ))}
          </div>
        )}

        {/* Pagination connectée */}
        <ProjectPagination
          currentPage={cur}
          totalPages={pages}
          onPageChange={setPage}
        />
      </main>

      {/* Modal de confirmation de suppression */}
      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Supprimer ce projet ?"
        description={`« ${toDelete?.title ?? ""} » sera définitivement supprimé de ce navigateur. Pensez à l'exporter en .spcbuild si vous voulez le garder.`}
        onConfirm={() => {
          if (toDelete) deleteProject(toDelete.id);
          setToDelete(null);
        }}
      />
    </BuilderShell>
  );
}
