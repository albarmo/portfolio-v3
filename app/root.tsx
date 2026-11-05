import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { MotionConfig } from "framer-motion";

import appStylesHref from "./app.css?url";
import tailwindStylesHref from "./tailwind.css?url";
import favicon from "@/../public/favicon.ico";
import { Navbar } from "@/components/organisms/Navbar";
import { themeCookie } from "./utils/themeCookie";
import { pageMeta } from "./utils/pageMeta";
import { type ReactNode, useEffect } from "react";
import { applyTheme } from "./utils/theme.client";
import { PageProgressBar } from "@/components/organisms/PageProgressBar";
import { Footer } from "@/components/organisms/Footer";
import { SpotlightSearch } from "@/components/organisms/SpotlightSearch";
import { SpotlightProvider } from "@/components/providers/SpotlightProvider";
import "@fontsource/big-shoulders-display/latin-800";
import "@fontsource/big-shoulders-display/latin-900";
import "@fontsource/manrope/latin-400";
import "@fontsource/manrope/latin-500";
import "@fontsource/manrope/latin-600";
import "@fontsource/manrope/latin-700";
import type { Route } from "./+types/root";

export const meta = () => pageMeta();

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: favicon, type: "image/x-icon" },
  { rel: "stylesheet", href: tailwindStylesHref },
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const theme = (await themeCookie.parse(cookieHeader)) || "light";

  return { theme };
};

// Shared document shell for the app and the error boundary
export function Layout({ children }: { children: ReactNode }) {
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:border focus:border-accent focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-accent"
        >
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { theme } = loaderData;
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
    // "user" honours prefers-reduced-motion for every framer-motion animation
    <MotionConfig reducedMotion="user">
      <PageProgressBar />
      <SpotlightProvider>
        {!isAdmin && <Navbar />}
        <Outlet />
        {!isAdmin && <SpotlightSearch />}
      </SpotlightProvider>
      {!isAdmin && <Footer />}
    </MotionConfig>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  const title = isNotFound ? "PAGE NOT FOUND" : "SOMETHING WENT WRONG";
  const message = isNotFound
    ? "The page you are looking for does not exist or has moved."
    : "An unexpected error occurred. Please try again in a moment.";
  // Only development builds reveal the underlying error; production never leaks internals
  const detail = import.meta.env.DEV && error instanceof Error ? error.message : null;

  return (
    <main id="main-content" className="section-shell flex min-h-[100dvh] flex-col justify-center py-32">
      <div role="alert">
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted">
          [ {isNotFound ? "404" : "ERROR"} ]
        </samp>
        <h1 className="mt-4 font-display text-5xl font-black uppercase leading-tight text-foreground sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl font-mono text-xs leading-6 text-muted">{message}</p>
        {detail ? <pre className="mt-6 overflow-x-auto font-mono text-xs text-accent">{detail}</pre> : null}
      </div>
      <Link to="/" className="premium-link premium-link-secondary mt-8 w-fit">
        Back to home
      </Link>
    </main>
  );
}
