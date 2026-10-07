import { useMemo, useState } from "react";
import { Eye, LayoutTemplate, Plus, Sparkles } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DeviceSwitch, type Device } from "@/components/DeviceSwitch";
import { exportHtml, makeInstance, type TemplatePreset } from "@/lib/builderRegistry";
import { createProject } from "@/lib/projects";

export function TemplateCard({ template }: { template: TemplatePreset }) {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<Device>("desktop");
  const isBlank = template.blocks.length === 0;
  const html = useMemo(() => exportHtml({
    id: `template-${template.id}`,
    title: template.name,
    updatedAt: new Date(0).toISOString(),
    blocks: template.blocks.map(makeInstance),
  }), [template]);

  const useTemplate = () => {
    const project = createProject(template.name, template.blocks);
    nav({ to: "/editor", search: { id: project.id } });
  };

  return (
    <article className="group overflow-hidden rounded-lg border bg-card transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl">
      <div className="relative aspect-16/10 overflow-hidden border-b bg-muted">
        {isBlank ? (
          <div className="grid h-full place-items-center grid-bg">
            <div className="text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-lg border bg-background"><Plus className="size-5 text-primary" /></span>
              <p className="mt-3 text-xs font-semibold text-muted-foreground">Votre espace de création</p>
            </div>
          </div>
        ) : (
          <iframe title={`Aperçu de ${template.name}`} srcDoc={html} tabIndex={-1} className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50 bg-canvas" />
        )}
        <div className="absolute left-3 top-3 rounded-md border bg-panel/90 px-2 py-1 font-mono text-[9px] uppercase text-muted-foreground backdrop-blur">
          {template.blocks.length} {template.blocks.length > 1 ? "sections" : "section"}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">{isBlank ? <Plus className="size-4" /> : <LayoutTemplate className="size-4" />}</span>
          <div className="min-w-0">
            <h2 className="font-display text-lg font-bold transition-colors group-hover:text-primary">{template.name}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{template.description}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => setOpen(true)} disabled={isBlank} className="bg-background/40"><Eye />Prévisualiser</Button>
          <Button onClick={useTemplate}><Sparkles />Utiliser</Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl p-0">
          <DialogHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b p-5 pr-12 text-left">
            <div className="min-w-0">
              <DialogTitle className="truncate">{template.name}</DialogTitle>
              <DialogDescription className="truncate">{template.description}</DialogDescription>
            </div>
            <DeviceSwitch value={device} onChange={setDevice} />
          </DialogHeader>
          <div className="grid-bg h-[70vh] overflow-auto p-4">
            <iframe
              title={`Prévisualisation de ${template.name} sur ${device}`}
              srcDoc={html}
              className={`mx-auto h-full max-w-full rounded-md bg-canvas shadow-2xl transition-[width] duration-300 ${device === "mobile" ? "w-93.75" : device === "tablet" ? "w-3xl" : "w-full max-w-5xl"}`}
            />
          </div>
          <div className="flex justify-end gap-2 border-t p-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Fermer</Button>
            <Button onClick={useTemplate}><Sparkles />Utiliser ce modèle</Button>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}