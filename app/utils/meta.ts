import type { MetaDescriptor } from "react-router";

const SITE = "Albar Moerhamsa";
const DEFAULT_DESCRIPTION =
  "Portfolio of Albar Moerhamsa, a Software Engineer and Frontend Engineer building polished, performant digital products.";

// A route's meta replaces its parents' entirely, so every page emits the full set.
export function pageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  type = "website",
}: {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
} = {}): MetaDescriptor[] {
  const fullTitle = title ? `${title} - ${SITE}` : `${SITE} - Software Engineer`;
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    ...(image ? [{ property: "og:image", content: image }] : []),
  ];
}
