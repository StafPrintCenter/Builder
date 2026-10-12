import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { DEVICES, type Device } from "@/components/DeviceSwitch";
import { makeInstance, uid, type BlockInstance, type ProjectState } from "@/lib/builderRegistry";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { createProject, getProject, saveProject } from "@/lib/projects";
import { CanvasBlock, DropLine, EditorHeader, Inspector, Library } from "@/components/pages/editor";
import { MobileNotSupported } from "@/components/pages/editor/MobileNotSupported";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEditorKeyboard } from "@/hooks/useEditorKeyboard";
import { SITE } from "@/data/site";

const PAGE_TITLE = `Éditeur - ${SITE.tool} | ${SITE.name}`;
const PAGE_DESC = `Glissez vos blocs, éditez vos textes et ajustez vos styles en direct.`;

export const Route = createFileRoute("/editor")({
  validateSearch: (s: Record<string, unknown>) => ({
    id: typeof s['id'] === "string" ? s['id'] : undefined,
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

  // Gestion des raccourcis clavier externalisée
  useEditorKeyboard({ undo, redo });

  // Si l'écran est considéré comme mobile, on affiche le message dédié
  if (isMobile) {
    return <MobileNotSupported />;
  }

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
      {/* Top bar */}
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
        {/* Bibliothèque à gauche */}
        <Library
          onAdd={(bid) => {
            const inst = makeInstance(bid);
            commit((bs) => [...bs, inst]);
            setSelected(inst.instanceId);
          }}
        />

        {/* Canevas principal */}
        <main className="grid-bg flex-1 overflow-auto bg-background p-6" onClick={() => setSelected(null)}>
          <div
            className="spc-canvas @container mx-auto min-h-[60vh] bg-canvas shadow-2xl transition-[width] duration-300"
            style={{ width: DEVICES[device], maxWidth: "100%" }}
            onDragOver={(e) => {
              e.preventDefault();
              if (!project.blocks.length) setDropIndex(0);
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropIndex(null);
            }}
            onDrop={onDrop}
          >
            {project.blocks.length === 0 && (
              <div
                className={`grid h-[60vh] place-items-center border-2 border-dashed text-sm text-muted-foreground ${dropIndex !== null ? "border-primary" : "border-muted-foreground/30"
                  }`}
              >
                Glissez un bloc ici depuis la bibliothèque
              </div>
            )}
            {project.blocks.map((b, i) => (
              <div key={b.instanceId}>
                {dropIndex === i && <DropLine />}
                <CanvasBlock
                  inst={b}
                  index={i}
                  total={project.blocks.length}
                  device={device}
                  selected={selected === b.instanceId}
                  onSelect={() => setSelected(b.instanceId)}
                  onField={(k, v) => updateField(b.instanceId, k, v)}
                  onDragOverHalf={(after) => setDropIndex(after ? i + 1 : i)}
                  onUp={() => move(i, -1)}
                  onDown={() => move(i, 1)}
                  onDuplicate={() =>
                    commit((bs) => {
                      const n = [...bs];
                      n.splice(i + 1, 0, {
                        ...b,
                        instanceId: uid(),
                        customContent: { ...b.customContent },
                      });
                      return n;
                    })
                  }
                  onDelete={() => setToDelete(b.instanceId)}
                />
              </div>
            ))}
            {dropIndex === project.blocks.length && project.blocks.length > 0 && <DropLine />}
          </div>
        </main>

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

        {/* Inspecteur à droite */}
        <Inspector inst={sel} onChange={(k, v) => sel && updateField(sel.instanceId, k, v)} />
      </div>

      {/* Footer */}
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