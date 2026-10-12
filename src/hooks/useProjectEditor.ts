import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { makeInstance, type BlockInstance, type ProjectState } from "@/lib/builderRegistry";
import { createProject, getProject, saveProject } from "@/lib/projects";
import { useEditorKeyboard } from "@/hooks/useEditorKeyboard";

export function useProjectEditor(id?: string) {
  const nav = useNavigate();
  const [project, setProject] = useState<ProjectState | null>(null);
  const [past, setPast] = useState<BlockInstance[][]>([]);
  const [future, setFuture] = useState<BlockInstance[][]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [saved, setSaved] = useState(true);
  const [toDelete, setToDelete] = useState<string | null>(null);

  // Charger ou créer le projet
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

  // Sauvegarde automatique (debounced)
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
    if (!project) return;
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

  const addBlock = (bid: string) => {
    const inst = makeInstance(bid);
    commit((bs) => [...bs, inst]);
    setSelected(inst.instanceId);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    const d = toDelete;
    commit((bs) => bs.filter((x) => x.instanceId !== d));
    setSelected(null);
    setToDelete(null);
  };

  return {
    project,
    setProject,
    saved,
    pastLength: past.length,
    futureLength: future.length,
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
  };
}