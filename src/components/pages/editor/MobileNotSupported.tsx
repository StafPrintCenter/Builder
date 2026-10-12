import { SITE } from "@/data/site";

export function MobileNotSupported() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <div className="max-w-md space-y-4 rounded-xl border bg-panel p-8 shadow-lg">
        <div className="text-4xl">💻</div>
        <h1 className="text-xl font-bold">Éditeur bureau uniquement</h1>
        <p className="text-sm text-muted-foreground">
          {SITE.tool} sur mobile arrive bientôt !
          Pour profiter pleinement de l'expérience de glisser-déposer et créer vos pages, veuillez vous connecter sur un ordinateur.
        </p>
        <div className="pt-2">
          <a
            href="https://stafprint.com"
            className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Découvrir {SITE.name}
          </a>
        </div>
      </div>
    </div>
  );
}