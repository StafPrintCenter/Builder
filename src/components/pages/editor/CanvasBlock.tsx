import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  getBlock,
  renderBlockInner,
  sectionStyle,
  type BlockInstance,
} from "@/lib/builderRegistry";
import type { Device } from "@/components/DeviceSwitch";

interface CanvasBlockProps {
  inst: BlockInstance;
  index: number;
  total: number;
  selected: boolean;
  device: Device;
  onSelect: () => void;
  onField: (k: string, v: string) => void;
  onDragOverHalf: (after: boolean) => void;
  onUp: () => void;
  onDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function CanvasBlock({
  inst,
  index,
  total,
  selected,
  device,
  onSelect,
  onField,
  onDragOverHalf,
  onUp,
  onDown,
  onDuplicate,
  onDelete,
}: CanvasBlockProps) {
  const ref = useRef<HTMLElement>(null);
  const html = renderBlockInner(inst);
  const c = inst.customContent;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || el.contains(document.activeElement)) return;
    el.innerHTML = html;
    el.querySelectorAll<HTMLElement>("[data-field]").forEach((n) => {
      n.contentEditable = "true";
      n.spellcheck = false;
    });
    el.querySelectorAll("a").forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));
  }, [html]);

  const hidden = (device === "mobile" && c['hideMobile']) || (device !== "mobile" && c['hideDesktop']);
  const block = getBlock(inst.blockId);

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className={`group relative ${selected ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50"} ${hidden ? "opacity-30" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const r = e.currentTarget.getBoundingClientRect();
        onDragOverHalf(e.clientY > r.top + r.height / 2);
      }}
    >
      <div
        className={`absolute right-2 top-2 z-10 flex items-center gap-0.5 rounded-md border bg-panel p-0.5 text-foreground shadow-lg ${selected ? "flex" : "hidden group-hover:flex"}`}
      >
        <span
          draggable
          onDragStart={(e) => e.dataTransfer.setData("spc/move", String(index))}
          className="cursor-grab px-1.5 font-mono text-xs text-muted-foreground"
          title="Glisser pour déplacer"
        >
          ⠿ {block?.name}
        </span>
        <ToolBtn label="Monter" onClick={onUp} disabled={index === 0}>
          ↑
        </ToolBtn>
        <ToolBtn label="Descendre" onClick={onDown} disabled={index === total - 1}>
          ↓
        </ToolBtn>
        <ToolBtn label="Dupliquer" onClick={onDuplicate}>
          ⧉
        </ToolBtn>
        <ToolBtn label="Supprimer" onClick={onDelete} danger>
          ✕
        </ToolBtn>
      </div>
      {hidden && (
        <span className="absolute left-2 top-2 z-10 rounded bg-panel px-2 py-0.5 text-[10px] text-muted-foreground">
          Masqué sur cet écran
        </span>
      )}
      <section
        ref={ref}
        style={Object.fromEntries(
          sectionStyle(c)
            .split(";")
            .map((d) => {
              const [k = "", ...v] = d.split(":");
              return [
                k.startsWith("--")
                  ? k
                  : k.replace(/-(\w)/g, (_, l) => l.toUpperCase()),
                v.join(":"),
              ];
            })
        )}
        onBlur={(e) => {
          const t = e.target as HTMLElement;
          const k = t.dataset['field'];
          if (k && t.innerText !== String(c[k] ?? "")) onField(k, t.innerText);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            (e.target as HTMLElement).blur();
          }
        }}
      />
    </motion.div>
  );
}

function ToolBtn({
  children,
  label,
  danger,
  ...p
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string; danger?: boolean }) {
  return (
    <button
      title={label}
      aria-label={label}
      {...p}
      onClick={(e) => {
        e.stopPropagation();
        p.onClick?.(e);
      }}
      className={`grid h-7 w-7 place-items-center rounded text-sm hover:bg-accent disabled:opacity-30 ${danger ? "hover:text-destructive" : ""}`}
    >
      {children}
    </button>
  );
}