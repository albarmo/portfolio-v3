import type { LinksFunction, LoaderFunctionArgs } from "react-router";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "react-router";

import appStylesHref from "./app.css?url";
import tailwindStylesHref from "./tailwind.css?url";
import favicon from "~/../public/favicon.ico";
import Navbar from "./components/layout/Navbar";
import { themeCookie } from "./utils/cookie";
import { pageMeta } from "./utils/meta";
import { ReactNode, useEffect } from "react";
import { applyTheme } from "./utils/theme.client";
import PageProgressBar from "./components/ui/PageProgressBar";
import { Footer } from "./components/layout/Footer";
import SpotlightSearch from "./components/layout/SpotlightSearch";
import { SpotlightProvider } from "./context/SpotlightContext";
import "@fontsource/big-shoulders-display/latin-800";
import "@fontsource/big-shoulders-display/latin-900";
import "@fontsource/manrope/latin-400";
import "@fontsource/manrope/latin-500";
import "@fontsource/manrope/latin-600";
import "@fontsource/manrope/latin-700";

export const meta = () => pageMeta();

export const links: LinksFunction = () => [
  { rel: "icon", href: favicon, type: "image/x-icon" },
  { rel: "stylesheet", href: tailwindStylesHref },
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const theme = (await themeCookie.parse(cookieHeader)) || "light";

  return { theme };
};

export function Document({
  children,
  theme,
}: {
  children: ReactNode;
  theme: string;
}) {
  return (
    <html lang="en" className={theme}>
      <head>...</head>
      <body>{children}</body>
    </html>
  );
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:border focus:border-[var(--accent)] focus:bg-[var(--bg)] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-[var(--accent)]"
        >
          Skip to content
        </a>
        <PageProgressBar />
        <SpotlightProvider>
          {!isAdmin && <Navbar />}
          <Outlet />
          {!isAdmin && <SpotlightSearch />}
        </SpotlightProvider>
        {!isAdmin && <Footer />}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
