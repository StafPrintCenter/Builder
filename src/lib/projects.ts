import { useEffect, useState } from "react";
import { makeInstance, uid, type ProjectState } from "./builderRegistry";

const KEY = "spc.projects.v1";
const EVT = "spc-projects-change";

export function loadProjects(): ProjectState[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function persist(list: ProjectState[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVT));
}

export const getProject = (id: string) => loadProjects().find((p) => p.id === id);

export function saveProject(p: ProjectState) {
  const list = loadProjects().filter((x) => x.id !== p.id);
  persist([{ ...p, updatedAt: new Date().toISOString() }, ...list]);
}

export function deleteProject(id: string) {
  persist(loadProjects().filter((p) => p.id !== id));
}

export function createProject(title: string, blockIds: string[]): ProjectState {
  const p: ProjectState = { id: uid(), title, updatedAt: new Date().toISOString(), blocks: blockIds.map(makeInstance) };
  saveProject(p);
  return p;
}

export function importProject(raw: string): ProjectState {
  const data = JSON.parse(raw);
  if (!data || !Array.isArray(data.blocks)) throw new Error("Fichier .spcbuild invalide");
  const p: ProjectState = { id: uid(), title: String(data.title || "Projet importé"), updatedAt: new Date().toISOString(), blocks: data.blocks };
  saveProject(p);
  return p;
}

export function useProjects() {
  const [list, setList] = useState<ProjectState[]>([]);
  useEffect(() => {
    const sync = () => setList(loadProjects());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return list;
}

export function useProject(id?: string) {
  const [p, setP] = useState<ProjectState | null | undefined>(undefined);
  useEffect(() => {
    setP(id ? getProject(id) ?? null : null);
  }, [id]);
  return p;
}

export function download(filename: string, content: Blob | string, type = "text/plain") {
  const blob = typeof content === "string" ? new Blob([content], { type }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[^\w]+/g, "-").replace(/^-|-$/g, "") || "projet";
