// Day/night cross-fade shared by the hero layers; the theme class on <html> drives it
const FADE = "transition-opacity duration-[900ms] ease-in-out";
export const DAY_ONLY = `${FADE} opacity-100 dark:opacity-0`;
export const NIGHT_ONLY = `${FADE} opacity-0 dark:opacity-100`;
