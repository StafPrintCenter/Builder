import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import JSZip from "jszip";
import { BuilderShell } from "@/components/site";
import { exportHtml } from "@/lib/builderRegistry";
import { download, slug, useProject } from "@/lib/projects";
import { SITE } from "@/data/site";
import { CodeExportHeader, CodeExportTabs, NotFoundComponent } from "@/components/pages/export";

const PAGE_TITLE = `Export du code - ${SITE.tool} | ${SITE.name}`;
const PAGE_DESC = `Téléchargez votre page en HTML/Tailwind, en projet .spcbuild ou en archive ZIP.`;

export const Route = createFileRoute("/code-export")({
  validateSearch: (s: Record<string, unknown>) => ({
    id: typeof s["id"] === "string" ? s["id"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
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
  const json = useMemo(
    () =>
      p
        ? JSON.stringify({ format: "spcbuild", version: 1, ...p }, null, 2)
        : "",
    [p]
  );

  if (p === undefined) return null;
  if (p === null) return <NotFoundComponent />;

  const name = slug(p.title);
  const code = tab === "html" ? html : json;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleZipDownload = async () => {
    const z = new JSZip();
    z.file("index.html", html);
    z.file(`${name}.spcbuild`, json);
    z.file(
      "README.txt",
      "Ouvrez index.html dans un navigateur. Réimportez le fichier .spcbuild dans builder.stafprint.com pour continuer l'édition."
    );
    download(`${name}.zip`, await z.generateAsync({ type: "blob" }));
  };

  return (
    <BuilderShell>
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <CodeExportHeader
          title={p.title}
          id={id}
          html={html}
          json={json}
          name={name}
          copied={copied}
          onCopy={handleCopy}
          onZipDownload={handleZipDownload}
        />

        <CodeExportTabs activeTab={tab} onTabChange={setTab} />

        <pre className="mt-0 max-h-[65vh] overflow-auto rounded-b-lg border border-t-0 bg-panel p-5 font-mono text-xs leading-relaxed text-muted-foreground">
          <code>{code}</code>
        </pre>
      </main>
    </BuilderShell>
  );
}