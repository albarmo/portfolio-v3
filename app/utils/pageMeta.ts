import type { MetaDescriptor } from "react-router";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/constants/site";

// A route's meta replaces its parents' entirely, so every page emits the full set.
export function pageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  type = "website",
}: {
  title?: string | undefined;
  description?: string | undefined;
  image?: string | undefined;
  type?: "website" | "article";
} = {}): MetaDescriptor[] {
  const fullTitle = title ? `${title} - ${SITE_NAME}` : `${SITE_NAME} - Software Engineer`;
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    ...(image ? [{ property: "og:image", content: image }] : []),
  ];
}
