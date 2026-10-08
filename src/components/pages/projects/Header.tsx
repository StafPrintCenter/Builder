import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { importProject, useProjects } from "@/lib/projects";
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
  const [q,] = useState("");
  const [toDelete, setToDelete] = useState<{ id: string; title: string } | null>(null);

  const filtered = projects.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const onImport = async (f?: File) => {
    if (!f) return;
    try { const p = importProject(await f.text()); nav({ to: "/editor", search: { id: p.id } }); }
    catch (e) { alert((e as Error).message); }
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b pb-8 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Espace de travail</p>
        <h1 className="mt-2 truncate text-3xl font-bold sm:text-4xl">Mes projets</h1>
        <p className="mt-2 text-sm text-muted-foreground">{projects.length} {projects.length > 1 ? "pages enregistrées" : "page enregistrée"} sur cet appareil</p>
      </div>

      <div className="flex shrink-0 gap-2">
        <Button variant="outline" onClick={() => fileRef.current?.click()}>
          <FileUp />
          <span className="hidden sm:inline">Importer</span>
        </Button>

        <Button asChild>
          <Link to="/editor" search={{ id: undefined }}>
            Page vierge <ArrowRight />
          </Link>
        </Button>

        <input
          ref={fileRef}
          type="file"
          accept=".spcbuild,.json"
          hidden onChange={(e) => onImport(e.target.files?.[0])} />
      </div>
    </div>
  );
}
