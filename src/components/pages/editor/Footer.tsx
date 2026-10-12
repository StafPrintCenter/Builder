import { SITE, SITE_LINK } from "@/data/site";
import { stripProtocol } from "@/lib/domain";

export function EditorFooter() {
  return (
    <footer className="shrink-0 border-t bg-panel px-4 py-1.5 text-center text-[11px] text-muted-foreground">
      Besoin de visuels sur mesure ?{" "}
      <a
        href={SITE_LINK.briefUrl}
        target="_blank"
        rel="noreferrer"
        className="text-primary hover:underline"
      >
        {stripProtocol(SITE_LINK.briefUrl)}
      </a>
      {" · "}Outils images & couleurs :{" "}
      <a
        href={SITE_LINK.toolkitUrl}
        target="_blank"
        rel="noreferrer"
        className="text-primary hover:underline"
      >
        {stripProtocol(SITE_LINK.toolkitUrl)}
      </a>
    </footer>
  );
}