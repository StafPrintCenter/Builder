import { Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DEVICES = { desktop: "100%", tablet: "768px", mobile: "375px" } as const;
export type Device = keyof typeof DEVICES;

export function DeviceSwitch({ value, onChange }: { value: Device; onChange: (d: Device) => void }) {
  const labels: Record<Device, string> = { desktop: "Desktop", tablet: "Tablette", mobile: "Mobile" };
  const icons = { desktop: Monitor, tablet: Tablet, mobile: Smartphone };
  return (
    <div className="flex shrink-0 rounded-md border bg-background p-0.5" aria-label="Format de prévisualisation">
      {(Object.keys(DEVICES) as Device[]).map((d) => {
        const Icon = icons[d];
        return <Button key={d} type="button" size="sm" variant={value === d ? "default" : "ghost"} onClick={() => onChange(d)} aria-pressed={value === d} title={labels[d]} className="h-8 px-2 sm:px-3"><Icon /><span className="hidden sm:inline">{labels[d]}</span></Button>;
      })}
    </div>
  );
}
