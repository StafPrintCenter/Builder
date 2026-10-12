import React from "react";
import { DEVICES, type Device } from "@/components/DeviceSwitch";
import { uid, type BlockInstance } from "@/lib/builderRegistry";
import { CanvasBlock, DropLine } from "./index";

interface CanvasAreaProps {
  blocks: BlockInstance[];
  device: Device;
  selected: string | null;
  dropIndex: number | null;
  setDropIndex: (index: number | null) => void;
  setSelected: (id: string | null) => void;
  setToDelete: (id: string | null) => void;
  commit: (fn: (bs: BlockInstance[]) => BlockInstance[]) => void;
  updateField: (instanceId: string, key: string, value: string) => void;
  move: (i: number, dir: -1 | 1) => void;
  onDrop: (e: React.DragEvent) => void;
}

export function CanvasArea({
  blocks,
  device,
  selected,
  dropIndex,
  setDropIndex,
  setSelected,
  setToDelete,
  commit,
  updateField,
  move,
  onDrop,
}: CanvasAreaProps) {
  return (
    <main
      className="grid-bg flex-1 overflow-auto bg-background p-6"
      onClick={() => setSelected(null)}
    >
      <div
        className="spc-canvas @container mx-auto min-h-[60vh] bg-canvas shadow-2xl transition-[width] duration-300"
        style={{ width: DEVICES[device], maxWidth: "100%" }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!blocks.length) setDropIndex(0);
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropIndex(null);
        }}
        onDrop={onDrop}
      >
        {blocks.length === 0 && (
          <div
            className={`grid h-[60vh] place-items-center border-2 border-dashed text-sm text-muted-foreground ${dropIndex !== null ? "border-primary" : "border-muted-foreground/30"
              }`}
          >
            Glissez un bloc ici depuis la bibliothèque
          </div>
        )}
        {blocks.map((b, i) => (
          <div key={b.instanceId}>
            {dropIndex === i && <DropLine />}
            <CanvasBlock
              inst={b}
              index={i}
              total={blocks.length}
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
        {dropIndex === blocks.length && blocks.length > 0 && <DropLine />}
      </div>
    </main>
  );
}