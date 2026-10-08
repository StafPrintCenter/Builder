import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/lib/projects";

const PER_PAGE = 3;

export function ProjectPagination() {
  const projects = useProjects();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  const filtered = projects.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = Math.min(page, pages);

  return (
    <div>
      {pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={cur === 1}
            onClick={() => setPage(cur - 1)}>
            ‹ Précédent
          </Button>

          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Button
              key={n} size="icon"
              variant={n === cur ? "default" : "outline"}
              onClick={() => setPage(n)}
              className="size-8">{n}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={cur === pages}
            onClick={() => setPage(cur + 1)}>
            Suivant ›
          </Button>
        </div>
      )}
    </div>
  );
}
