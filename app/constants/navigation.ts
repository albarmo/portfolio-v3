export const NAV_LINKS = [
  { to: "/#about", label: "About" },
  { to: "/#work", label: "Work" },
  { to: "/#experience", label: "Experience" },
  { to: "/#notes", label: "Notes" },
  { to: "/contact", label: "Let's talk" },
] as const;

export type NavLinkTarget = (typeof NAV_LINKS)[number]["to"];
