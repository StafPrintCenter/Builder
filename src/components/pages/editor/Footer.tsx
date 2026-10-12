export function EditorFooter() {
  return (
    <footer className="shrink-0 border-t bg-panel px-4 py-1.5 text-center text-[11px] text-muted-foreground">
      Besoin de visuels sur mesure ?{" "}
      <a
        href="https://brief.stafprint.com"
        target="_blank"
        rel="noreferrer"
        className="text-primary hover:underline"
      >
        brief.stafprint.com
      </a>
      {" · "}Outils images & couleurs :{" "}
      <a
        href="https://tools.stafprint.com"
        target="_blank"
        rel="noreferrer"
        className="text-primary hover:underline"
      >
        tools.stafprint.com
      </a>
    </footer>
  );
}