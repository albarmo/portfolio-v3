import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import appStylesHref from "./app.css?url";
import tailwindStylesHref from "./tailwind.css?url";
import favicon from "~/../public/favicon.ico";
import Navbar from "./components/layout/Navbar";
import { themeCookie } from "./utils/cookie";
import { ReactNode, useEffect } from "react";
import { applyTheme } from "./utils/theme.client";
import FloatingButton from "./components/ui/FloatingButton";
import { Footer } from "./components/layout/Footer";
import SpotlightSearch from "./components/layout/SpotlightSearch";
import { SpotlightProvider } from "./context/SpotlightContext";

export const links: LinksFunction = () => [
  { rel: "icon", href: favicon, type: "image/x-icon" },
  { rel: "stylesheet", href: tailwindStylesHref },
  { rel: "stylesheet", href: appStylesHref },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap",
  },
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
        <title>Albarms</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        <SpotlightProvider>
          <Navbar />
          <Outlet />
          <FloatingButton />
          <SpotlightSearch />
        </SpotlightProvider>
        <ScrollRestoration />
        <Scripts />
        <Footer />
      </body>
    </html>
  );
}
