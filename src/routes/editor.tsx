import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { type Device } from "@/components/DeviceSwitch";
import { makeInstance, type BlockInstance, type ProjectState } from "@/lib/builderRegistry";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { createProject, getProject, saveProject } from "@/lib/projects";
import { CanvasArea, EditorHeader, Inspector, Library, MobileNotSupported } from "@/components/pages/editor";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEditorKeyboard } from "@/hooks/useEditorKeyboard";
import { SITE } from "@/data/site";

const PAGE_TITLE = `Éditeur - ${SITE.tool} | ${SITE.name}`;
const PAGE_DESC = `Glissez vos blocs, éditez vos textes et ajustez vos styles en direct.`;

export const Route = createFileRoute("/editor")({
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
  component: Editor,
});

function Editor() {
  const isMobile = useIsMobile();
  const { id } = Route.useSearch();
  const nav = useNavigate();

  const [project, setProject] = useState<ProjectState | null>(null);
  const [past, setPast] = useState<BlockInstance[][]>([]);
  const [future, setFuture] = useState<BlockInstance[][]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [saved, setSaved] = useState(true);
  const [toDelete, setToDelete] = useState<string | null>(null);

  useEffect(() => {
    const p = id ? getProject(id) : undefined;
    if (p) {
      setProject(p);
      setPast([]);
      setFuture([]);
    } else {
      const np = createProject("Page vierge", []);
      nav({ to: "/editor", search: { id: np.id }, replace: true });
    }
  }, [id, nav]);

  // Auto-save (debounced)
  useEffect(() => {
    if (!project) return;
    setSaved(false);
    const t = setTimeout(() => {
      saveProject(project);
      setSaved(true);
    }, 400);
    return () => clearTimeout(t);
  }, [project]);

  const commit = useCallback((fn: (b: BlockInstance[]) => BlockInstance[]) => {
    setProject((p) => {
      if (!p) return p;
      setPast((h) => [...h.slice(-49), p.blocks]);
      setFuture([]);
      return { ...p, blocks: fn(p.blocks) };
    });
  }, []);

  const undo = useCallback(() => {
    setPast((h) => {
      if (!h.length || !project) return h;
      setFuture((f) => [project.blocks, ...f]);
      setProject({ ...project, blocks: h[h.length - 1]! });
      return h.slice(0, -1);
    });
  }, [project]);

  const redo = useCallback(() => {
    setFuture((f) => {
      if (!f.length || !project) return f;
      setPast((h) => [...h, project.blocks]);
      setProject({ ...project, blocks: f[0]! });
      return f.slice(1);
    });
  }, [project]);

  useEditorKeyboard({ undo, redo });

  if (isMobile) return <MobileNotSupported />;

  if (!project)
    return <div className="grid h-screen place-items-center text-muted-foreground">Chargement…</div>;

  const updateField = (instanceId: string, key: string, value: string) =>
    commit((bs) =>
      bs.map((b) =>
        b.instanceId === instanceId
          ? { ...b, customContent: { ...b.customContent, [key]: value } }
          : b
      )
    );

  const move = (i: number, dir: -1 | 1) =>
    commit((bs) => {
      const j = i + dir;
      if (j < 0 || j >= bs.length) return bs;
      const n = [...bs];
      [n[i], n[j]] = [n[j]!, n[i]!];
      return n;
    });

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const at = dropIndex ?? project.blocks.length;
    setDropIndex(null);
    const newId = e.dataTransfer.getData("spc/new");
    const from = e.dataTransfer.getData("spc/move");
    if (newId) {
      const inst = makeInstance(newId);
      commit((bs) => {
        const n = [...bs];
        n.splice(at, 0, inst);
        return n;
      });
      setSelected(inst.instanceId);
    } else if (from !== "") {
      const f = Number(from);
      commit((bs) => {
        const n = [...bs];
        const [m] = n.splice(f, 1);
        n.splice(at > f ? at - 1 : at, 0, m!);
        return n;
      });
    }
  };

  const sel = project.blocks.find((b) => b.instanceId === selected);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <EditorHeader
        project={project}
        saved={saved}
        device={device}
        pastLength={past.length}
        futureLength={future.length}
        onTitleChange={(title) => setProject({ ...project, title })}
        onDeviceChange={setDevice}
        onUndo={undo}
        onRedo={redo}
      />

      <div className="flex min-h-0 flex-1">
        <Library
          onAdd={(bid) => {
            const inst = makeInstance(bid);
            commit((bs) => [...bs, inst]);
            setSelected(inst.instanceId);
          }}
        />

        <CanvasArea
          blocks={project.blocks}
          device={device}
          selected={selected}
          dropIndex={dropIndex}
          setDropIndex={setDropIndex}
          setSelected={setSelected}
          setToDelete={setToDelete}
          commit={commit}
          updateField={updateField}
          move={move}
          onDrop={onDrop}
        />

        <ConfirmDialog
          open={!!toDelete}
          onOpenChange={(o) => !o && setToDelete(null)}
          title="Supprimer ce bloc ?"
          description="Le bloc sera retiré de la page. Vous pourrez l'annuler avec Ctrl+Z."
          onConfirm={() => {
            const d = toDelete;
            commit((bs) => bs.filter((x) => x.instanceId !== d));
            setSelected(null);
            setToDelete(null);
          }}
        />

        <Inspector inst={sel} onChange={(k, v) => sel && updateField(sel.instanceId, k, v)} />
      </div>

      <div className="shrink-0 border-t bg-panel px-4 py-1.5 text-center text-[11px] text-muted-foreground">
        Besoin de visuels sur mesure ?{" "}
        <a
          href="https://brief.stafprint.com"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          brief.stafprint.com
        </a>
        {" · "}Outils images & couleurs :{" "}
        <a
          href="https://tools.stafprint.com"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          tools.stafprint.com
        </a>
      </div>
    </div>
  );
}