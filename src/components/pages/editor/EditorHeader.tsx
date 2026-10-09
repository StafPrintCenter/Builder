import { Link } from "@tanstack/react-router";
import { SpcDeskLogo, ThemeToggle } from "@/components/site";
import { DeviceSwitch, type Device } from "@/components/DeviceSwitch";
import { IconBtn } from "./IconBtn";
import type { ProjectState } from "@/lib/builderRegistry";

interface EditorHeaderProps {
  project: ProjectState;
  saved: boolean;
  device: Device;
  pastLength: number;
  futureLength: number;
  onTitleChange: (title: string) => void;
  onDeviceChange: (device: Device) => void;
  onUndo: () => void;
  onRedo: () => void;
}

export function EditorHeader({
  project,
  saved,
  device,
  pastLength,
  futureLength,
  onTitleChange,
  onDeviceChange,
  onUndo,
  onRedo,
}: EditorHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-panel px-4">
      <Link to="/" className="flex items-center">
        <SpcDeskLogo className="mx-auto h-10 w-auto" />
      </Link>
      <input
        value={project.title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-48 rounded-md border-foreground bg-foreground/20 px-2 py-1 font-display text-sm hover:border focus:border focus:outline-none"
      />

      <span className="font-mono text-[10px] text-muted-foreground">
        {saved ? "● enregistré" : "○ enregistrement…"}
      </span>
      <div className="mx-auto">
        <DeviceSwitch value={device} onChange={onDeviceChange} />
      </div>
      <div className="flex items-center gap-1">
        <IconBtn label="Annuler (Ctrl+Z)" onClick={onUndo} disabled={!pastLength}>
          ↶
        </IconBtn>
        <IconBtn label="Rétablir (Ctrl+Y)" onClick={onRedo} disabled={!futureLength}>
          ↷
        </IconBtn>
      </div>
      <Link
        to="/preview"
        search={{ id: project.id }}
        className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
      >
        Aperçu
      </Link>
      <Link
        to="/code-export"
        search={{ id: project.id }}
        className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        Exporter
      </Link>
      <ThemeToggle />
    </header>
  );
}