import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";

import appStylesHref from "./app.css?url";
import tailwindStylesHref from "./tailwind.css?url";
import favicon from "~/../public/favicon.ico";
import Navbar from "./components/layout/Navbar";
import { themeCookie } from "./utils/cookie";
import { ReactNode, useEffect } from "react";
import { applyTheme } from "./utils/theme.client";
import FloatingButton from "./components/ui/FloatingButton";
import PageProgressBar from "./components/ui/PageProgressBar";
import PageLoader from "./components/ui/PageLoader";
import { Footer } from "./components/layout/Footer";
import SpotlightSearch from "./components/layout/SpotlightSearch";
import { SpotlightProvider } from "./context/SpotlightContext";

export const links: LinksFunction = () => [
  { rel: "icon", href: favicon, type: "image/x-icon" },
  { rel: "stylesheet", href: tailwindStylesHref },
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const theme = (await themeCookie.parse(cookieHeader)) || "dark";

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
        <meta
          name="description"
          content="Portfolio of Albar Moerhamsa, a Software Engineer and Frontend Engineer building polished, performant digital products."
        />
        <meta property="og:title" content="Albar Moerhamsa Portfolio" />
        <meta
          property="og:description"
          content="Selected work, writing, expertise, and reviews from Albar Moerhamsa."
        />
        <Meta />
        <title>Albar Moerhamsa - Software Engineer</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:border focus:border-[var(--accent)] focus:bg-[var(--bg)] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-[var(--accent)]"
        >
          Skip to content
        </a>
        <PageLoader />
        <PageProgressBar />
        <SpotlightProvider>
          {!isAdmin && <Navbar />}
          <Outlet />
          {!isAdmin && <FloatingButton />}
          {!isAdmin && <SpotlightSearch />}
        </SpotlightProvider>
        {!isAdmin && <Footer />}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
