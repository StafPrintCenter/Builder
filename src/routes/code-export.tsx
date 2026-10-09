import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import JSZip from "jszip";
import { BuilderShell, PageHeader } from "@/components/site";
import { exportHtml } from "@/lib/builderRegistry";
import { download, slug, useProject } from "@/lib/projects";
import { SITE } from "@/data/site";

const PAGE_TITLE = `Export du code - ${SITE.tool} | ${SITE.name}`;
const PAGE_DESC = `Téléchargez votre page en HTML/Tailwind, en projet .spcbuild ou en archive ZIP.`;

export const Route = createFileRoute("/code-export")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s['id'] === "string" ? s['id'] : undefined }),
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
    ],
  }),
  component: CodeExport,
});

function CodeExport() {
  const { id } = Route.useSearch();
  const p = useProject(id);
  const [tab, setTab] = useState<"html" | "json">("html");
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => (p ? exportHtml(p) : ""), [p]);
  const json = useMemo(() => (p ? JSON.stringify({ format: "spcbuild", version: 1, ...p }, null, 2) : ""), [p]);

  if (p === undefined) return null;
  if (p === null)
    return (
      <div className="flex min-h-screen flex-col">
        <PageHeader />
        <p className="p-20 text-center text-muted-foreground">
          Projet introuvable.
          <br />
          <Link to="/" className="text-primary">
            Retour
          </Link>
        </p>
      </div>
    );

  const name = slug(p.title);
  const code = tab === "html" ? html : json;
  const zip = async () => {
    const z = new JSZip();
    z.file("index.html", html);
    z.file(`${name}.spcbuild`, json);
    z.file("README.txt", "Ouvrez index.html dans un navigateur. Réimportez le fichier .spcbuild dans builder.stafprint.com pour continuer l'édition.");
    download(`${name}.zip`, await z.generateAsync({ type: "blob" }));
  };
  const btn = "rounded-md border px-3 py-2 text-sm hover:bg-accent";

  return (
    <BuilderShell>
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link
              to="/editor"
              search={{ id }}
              className="text-sm text-muted-foreground hover:text-foreground">
              ← {p.title
              }</Link>

            <h1 className="mt-2 text-3xl font-bold">
              Exporter le code
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={btn}
              onClick={async () => {
                await navigator.clipboard.writeText(code);
                setCopied(true); setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? "Copié ✓" : "Copier"}
            </button>

            <button
              className={btn}
              onClick={() =>
                download("index.html", html, "text/html")}>
              index.html
            </button>

            <button
              className={btn}
              onClick={() => download(`${name}.spcbuild`, json, "application/json")}
            >
              .spcbuild
            </button>

            <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90" onClick={zip}>Télécharger le ZIP</button>
          </div>
        </div>

        <div className="mt-6 flex gap-1 border-b">
          {(["html", "json"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`-mb-px border-b-2 px-4 py-2 font-mono text-xs 
                ${tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}
            >
              {t === "html"
                ? "index.html"
                : "projet.spcbuild"
              }
            </button>
          ))}
        </div>

        <pre
          className="mt-0 max-h-[65vh] overflow-auto rounded-b-lg bg-panel p-5 font-mono text-xs leading-relaxed text-muted-foreground"
        >
          <code>{code}
          </code>
        </pre>
      </main>
    </BuilderShell>
  );
}
