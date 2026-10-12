import { createFileRoute } from "@tanstack/react-router";
import { BuilderShell } from "@/components/site";
import { SITE, SITE_LINK } from "@/data/site";
import { stripProtocol } from "@/lib/domain";

const PAGE_TITLE = `"Conditions Générales d'Utilisation - ${SITE.tool} | ${SITE.name}`;
const PAGE_DESC = `Conditions Générales d'Utilisation de ${SITE.tool}, service édité par ${SITE.name}.`;

export const Route = createFileRoute("/cgu")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
    ],
  }),
  component: Cgu,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function Cgu() {
  return (
    <BuilderShell>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        <h1 className="text-3xl font-bold text-foreground">
          Conditions Générales d'Utilisation
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dernière mise à jour : 3 octobre 2026
        </p>

        <Section title="1. Objet">
          <p>
            Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») définissent les
            modalités d'accès et d'utilisation de SPC Site Builder (ci-après « le Service »), un
            constructeur visuel de sites et landing pages édité par STAF PRINT CENTER
            (ci-après « l'Éditeur »).
          </p>
          <p>
            L'utilisation du Service implique l'acceptation sans réserve des présentes CGU. Si
            vous n'acceptez pas ces conditions, vous ne devez pas utiliser le Service.
          </p>
        </Section>

        <Section title="2. Description du Service">
          <p>SPC Site Builder permet notamment de :</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>créer des sites et landing pages à l'aide d'un éditeur visuel à blocs ;</li>
            <li>prévisualiser les pages créées sur différents formats d'écran ;</li>
            <li>partir de modèles pré-construits (par exemple « Imprimerie complète ») ;</li>
            <li>exporter le code des pages créées ;</li>
            <li>enregistrer et gérer ses projets.</li>
          </ul>
          <p>
            Le Service est accessible depuis un navigateur web. Certaines fonctionnalités peuvent
            évoluer : l'Éditeur se réserve le droit d'ajouter, modifier ou retirer des
            fonctionnalités.
          </p>
        </Section>

        <Section title="3. Accès au Service">
          <p>
            Le Service est accessible à toute personne disposant d'une connexion internet et d'un
            navigateur compatible. L'accès à certaines fonctionnalités (enregistrement des
            projets, notamment) peut nécessiter la création d'un compte utilisateur.
          </p>
          <p>
            L'Utilisateur est responsable de la confidentialité de ses identifiants et de
            l'ensemble des activités effectuées depuis son compte. Il s'engage à fournir des
            informations exactes lors de la création de son compte et à signaler sans délai tout
            accès non autorisé.
          </p>
        </Section>

        <Section title="4. Engagements de l'Utilisateur">
          <p>L'Utilisateur s'engage à utiliser le Service de manière loyale et licite, et notamment à ne pas :</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>publier ou diffuser de contenus illicites, diffamatoires, discriminatoires, violents ou portant atteinte aux droits de tiers ;</li>
            <li>utiliser le Service pour des activités frauduleuses ou contraire à la législation en vigueur ;</li>
            <li>tenter d'accéder aux données d'autres utilisateurs, d'altérer le fonctionnement du Service ou de contourner ses mesures de sécurité ;</li>
            <li>revendre ou exploiter commercialement le Service sans autorisation écrite préalable de l'Éditeur.</li>
          </ul>
          <p>
            L'Utilisateur garantit détenir les droits nécessaires sur l'ensemble des contenus
            (textes, images, logos, coordonnées, prix) qu'il intègre dans ses pages.
          </p>
        </Section>

        <Section title="5. Contenus créés par l'Utilisateur">
          <p>
            L'Utilisateur conserve l'intégralité de ses droits sur les contenus qu'il crée ou
            importe dans le Service. Il concède à l'Éditeur la licence non exclusive limitée au
            stockage technique, à l'affichage et à la mise en œuvre du Service (par exemple la
            prévisualisation et l'export des pages).
          </p>
          <p>
            L'Éditeur ne contrôle pas les contenus créés par les Utilisateurs et ne peut en
            garantir l'exactitude, la licéité ou la qualité. Tout signalement de contenu
            manifestement illicite peut être adressé aux coordonnées de contact ci-dessous ; le
            Service se réserve alors le droit de retirer le contenu concerné.
          </p>
        </Section>

        <Section title="6. Propriété intellectuelle">
          <p>
            L'ensemble des éléments constitutifs du Service (logiciel, interface, modèles, blocs,
            graphismes, textes, marque « SPC Site Builder ») est la propriété exclusive de
            l'Éditeur ou de ses partenaires et est protégé par le droit de la propriété
            intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation ou exploitation du Service hors du cadre prévu
            par les présentes CGU est interdite sans autorisation écrite préalable.
          </p>
        </Section>

        <Section title="7. Tarifs et paiement">
          <p>
            L'accès au Service peut être proposé à titre gratuit ou payant, selon la formule
            choisie. Les tarifs applicables, exprimés en francs CFA (FCFA), sont indiqués sur
            l'interface du Service au moment de la souscription.
          </p>
          <p>
            Le paiement est exigible à la commande. Toute somme versée au titre d'une formule
            entamée reste acquise à l'Éditeur, sauf disposition légale contraire.
          </p>
        </Section>

        <Section title="8. Durée et résiliation">
          <p>
            Les présentes CGU sont conclues pour une durée indéterminée à compter de la première
            utilisation du Service.
          </p>
          <p>
            L'Utilisateur peut cesser d'utiliser le Service à tout moment et demander la
            suppression de son compte et de ses projets. L'Éditeur peut, en cas de manquement
            grave aux présentes CGU, suspendre ou résilier l'accès au Service après notification
            restée sans effet.
          </p>
        </Section>

        <Section title="9. Disponibilité et responsabilité">
          <p>
            L'Éditeur s'efforce d'assurer un accès continu au Service, sans obligation de
            résultat. Des interruptions pour maintenance, évolution ou événement indépendant de
            la volonté de l'Éditeur sont possibles.
          </p>
          <p>
            L'Éditeur ne saurait être tenu responsable des dommages indirects (perte de données,
            perte d'exploitation ou de chiffre d'affaires) résultant de l'utilisation du Service.
            Il est recommandé à l'Utilisateur de conserver une copie de ses contenus et de
            procéder régulièrement à l'export de ses pages. En tout état de cause, la
            responsabilité de l'Éditeur est limitée aux sommes effectivement versées par
            l'Utilisateur au titre du Service au cours des douze derniers mois.
          </p>
        </Section>

        <Section title="10. Liens externes">
          <p>
            Le Service peut renvoyer vers des sites tiers (notamment
            brief.stafprint.com et tools.stafprint.com). L'Éditeur n'exerce aucun contrôle sur
            ces sites et décline toute responsabilité quant à leurs contenus ou pratiques.
          </p>
        </Section>

        <Section title="11. Données personnelles">
          <p>
            Les données personnelles collectées dans le cadre du Service sont traitées
            conformément à la législation applicable en matière de protection des données.
            L'Utilisateur dispose de droits d'accès, de rectification, d'opposition et de
            suppression qu'il peut exercer aux coordonnées de contact ci-dessous.
          </p>
        </Section>

        <Section title="12. Modification des CGU">
          <p>
            L'Éditeur peut modifier les présentes CGU à tout moment. La version applicable est
            celle en vigueur et accessible en ligne à la date d'utilisation du Service. Les
            utilisateurs seront informés de toute modification substantielle via l'interface du
            Service.
          </p>
        </Section>

        <Section title="13. Droit applicable et litiges">
          <p>
            Les présentes CGU sont soumises au droit béninois. En cas de différend, les parties
            s'efforceront de trouver une solution amiable. À défaut, le litige sera porté devant
            les juridictions compétentes du siège de l'Éditeur.
          </p>
        </Section>

        <Section title="14. Contact">
          <p>
            Éditeur : STAF PRINT CENTER - [adresse complète à compléter], Bénin.
          </p>
          <p>
            Contact : [adresse e-mail à compléter] · [numéro de téléphone à compléter].
          </p>
          <p>
            RCCM / IFU : [numéros d'immatriculation à compléter].
          </p>
        </Section>
      </main>
    </BuilderShell>
  );
}
