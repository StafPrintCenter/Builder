import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/lib/projects";

const PER_PAGE = 9;

export function ProjectEmpty() {
  const projects = useProjects();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  const filtered = projects.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = Math.min(page, pages);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mt-8 border border-dashed bg-card p-12 text-center">
        <FolderOpen className="mx-auto size-8 text-muted-foreground" />
        <h2 className="mt-4 text-lg font-semibold">{projects.length ? "Aucun projet trouvé" : "Votre espace est prêt"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{projects.length ? "Essayez une autre recherche." : "Choisissez un modèle professionnel ou partez d’une page vierge."}</p>
        {!projects.length && <Button asChild className="mt-5"><Link to="/templates">Découvrir les modèles</Link></Button>}
      </div>
    </main>
  );
}
