import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { exportHtml } from "@/lib/builderRegistry";
import { useProject } from "@/lib/projects";
import { DEVICES, DeviceSwitch, type Device } from "@/components/DeviceSwitch";
import { ThemeToggle } from "@/components/ThemeToggle";


export const Route = createFileRoute("/preview")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s['id'] === "string" ? s['id'] : undefined }),
  head: () => ({
    meta: [
      { title: "Aperçu plein écran — SPC Site Builder" },
      { name: "description", content: "Prévisualisez votre page sur ordinateur, tablette et mobile." },
      { property: "og:title", content: "Aperçu — SPC Site Builder" },
      { property: "og:description", content: "Aperçu responsive de votre landing page." },
    ],
  }),
  component: Preview,
});

function Preview() {
  const { id } = Route.useSearch();
  const p = useProject(id);
  const [device, setDevice] = useState<Device>("desktop");
  const html = useMemo(() => (p ? exportHtml(p) : ""), [p]);

  return (
    <div className="flex h-screen flex-col bg-panel">
      <div className="flex h-12 items-center justify-between border-b px-4">
        <Link to="/editor" search={{ id }} className="text-sm text-muted-foreground hover:text-foreground">← Retour à l'éditeur</Link>
        <DeviceSwitch value={device} onChange={setDevice} />
        <div className="flex shrink-0 items-center gap-2">
          <Link to="/code-export" search={{ id }} className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground">Exporter</Link>
          <ThemeToggle />
        </div>
      </div>
      <div className="grid-bg flex flex-1 justify-center overflow-auto p-4">
        {p === null && <p className="mt-20 text-muted-foreground">Projet introuvable.</p>}
        {p && <iframe title="Aperçu" srcDoc={html} className="h-full rounded-lg bg-canvas shadow-2xl transition-all" style={{ width: DEVICES[device] }} />}
      </div>
    </div>
  );
}

