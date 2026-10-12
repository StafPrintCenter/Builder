import { useEffect } from "react";

interface UseEditorKeyboardProps {
  undo: () => void;
  redo: () => void;
}

export function useEditorKeyboard({ undo, redo }: UseEditorKeyboardProps) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement)?.isContentEditable ||
        ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      )
        return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [undo, redo]);
}