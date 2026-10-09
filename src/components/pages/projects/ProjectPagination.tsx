import { Button } from "@/components/ui/button";

interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProjectPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProjectPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹ Précédent
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Button
          key={n}
          size="icon"
          variant={n === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(n)}
          className="size-8"
        >
          {n}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Suivant ›
      </Button>
    </div>
  );
}
