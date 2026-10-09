import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Copy, Download, FileCode, FolderArchive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { download } from "@/lib/projects";

interface CodeExportHeaderProps {
  title: string;
  id?: string;
  html: string;
  json: string;
  name: string;
  copied: boolean;
  onCopy: () => void;
  onZipDownload: () => void;
}

export function CodeExportHeader({
  title,
  id,
  html,
  json,
  name,
  copied,
  onCopy,
  onZipDownload,
}: CodeExportHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-6">
      <div>
        <Link
          to="/editor"
          search={{ id }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          {title}
        </Link>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Exporter le code
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={onCopy} className="gap-1.5">
          {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
          {copied ? "Copié ✓" : "Copier"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => download("index.html", html, "text/html")}
          className="gap-1.5"
        >
          <FileCode className="size-4 text-primary" />
          index.html
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => download(`${name}.spcbuild`, json, "application/json")}
          className="gap-1.5"
        >
          <Download className="size-4" />
          .spcbuild
        </Button>

        <Button size="sm" onClick={onZipDownload} className="gap-1.5">
          <FolderArchive className="size-4" />
          Télécharger le ZIP
        </Button>
      </div>
    </div>
  );
}