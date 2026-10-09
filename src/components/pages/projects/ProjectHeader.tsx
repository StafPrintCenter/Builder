import { Link, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, FileUp, Search, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { importProject, useProjects } from "@/lib/projects";

interface ProjectHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredCount: number;
}

export function ProjectHeader({
  searchQuery,
  onSearchChange,
  filteredCount,
}: ProjectHeaderProps) {
  const projects = useProjects();
  const nav = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const onImport = async (f?: File) => {
    if (!f) return;
    try {
      const p = importProject(await f.text());
      nav({ to: "/editor", search: { id: p.id } });
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b pb-8 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Espace de travail
          </p>
          <h1 className="mt-2 truncate text-3xl font-bold sm:text-4xl">
            Mes projets
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {projects.length} {projects.length > 1 ? "pages enregistrées" : "page enregistrée"} sur cet appareil
          </p>
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
            hidden
            onChange={(e) => onImport(e.target.files?.[0])}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="relative min-w-0 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher un projet…"
            className="pl-9"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
          <LayoutGrid className="size-4" /> {filteredCount} résultat{filteredCount > 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
