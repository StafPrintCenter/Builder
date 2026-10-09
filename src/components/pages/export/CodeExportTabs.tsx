interface CodeExportTabsProps {
  activeTab: "html" | "json";
  onTabChange: (tab: "html" | "json") => void;
}

export function CodeExportTabs({ activeTab, onTabChange }: CodeExportTabsProps) {
  return (
    <div className="mt-6 flex gap-1 border-b">
      {(["html", "json"] as const).map((t) => (
        <button
          key={t}
          onClick={() => onTabChange(t)}
          className={`-mb-px border-b-2 px-4 py-2 font-mono text-xs transition-colors ${activeTab === t
            ? "border-primary font-semibold text-foreground"
            : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
        >
          {t === "html" ? "index.html" : "projet.spcbuild"}
        </button>
      ))}
    </div>
  );
}