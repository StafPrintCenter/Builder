import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { type Device } from "@/components/DeviceSwitch";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { CanvasArea, EditorFooter, EditorHeader, Inspector, Library, MobileNotSupported } from "@/components/pages/editor";
import { useIsMobile } from "@/hooks/use-mobile";
import { useProjectEditor } from "@/hooks/useProjectEditor";
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
  const [device, setDevice] = useState<Device>("desktop");

  const {
    project,
    setProject,
    saved,
    pastLength,
    futureLength,
    selected,
    setSelected,
    dropIndex,
    setDropIndex,
    toDelete,
    setToDelete,
    undo,
    redo,
    commit,
    updateField,
    move,
    onDrop,
    addBlock,
    confirmDelete,
  } = useProjectEditor(id);

  if (isMobile) return <MobileNotSupported />;

  if (!project)
    return <div className="grid h-screen place-items-center text-muted-foreground">Chargement…</div>;

  const selectedBlock = project.blocks.find((b) => b.instanceId === selected);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <EditorHeader
        project={project}
        saved={saved}
        device={device}
        pastLength={pastLength}
        futureLength={futureLength}
        onTitleChange={(title) => setProject({ ...project, title })}
        onDeviceChange={setDevice}
        onUndo={undo}
        onRedo={redo}
      />

      <div className="flex min-h-0 flex-1">
        <Library onAdd={addBlock} />

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

        <Inspector
          inst={selectedBlock}
          onChange={(k, v) => selectedBlock && updateField(selectedBlock.instanceId, k, v)}
        />
      </div>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Supprimer ce bloc ?"
        description="Le bloc sera retiré de la page. Vous pourrez l'annuler avec Ctrl+Z."
        onConfirm={confirmDelete}
      />

      <EditorFooter />
    </div>
  );
}