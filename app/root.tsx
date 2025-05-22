import React, { useEffect, useState } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") || "light"
      : "light"
  );
  const [openInNewTab, setOpenInNewTab] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("openInNewTab");
      return stored === null ? true : stored === "true";
    }
    return true;
  });
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("openInNewTab", String(openInNewTab));
    }
  }, [openInNewTab]);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-base-100 text-base-content">
        <div className="navbar bg-gradient-to-r from-primary to-secondary shadow-md min-h-10 h-12 px-2 sm:h-14 sm:px-4 flex items-center justify-between">
          <div className="navbar-center flex items-center gap-1 sm:gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 sm:w-7 sm:h-7 text-accent"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75v10.128a1.125 1.125 0 01-1.636.99l-3.114-1.78a.375.375 0 00-.364 0l-3.114 1.78A1.125 1.125 0 015.25 16.878V6.75A2.25 2.25 0 017.5 4.5h9a2.25 2.25 0 012.25 2.25z"
              />
            </svg>
            <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-gray-50 drop-shadow-sm">
              FirstPages
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <label className="flex items-center gap-1 cursor-pointer select-none">
              <span className="text-xs sm:text-sm font-medium text-gray-50">새 탭으로 열기</span>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-xs sm:toggle-sm"
                checked={openInNewTab}
                onChange={e => setOpenInNewTab(e.target.checked)}
                aria-label="새 탭으로 열기"
              />
            </label>
            <button
              className="btn btn-circle btn-ghost btn-xs sm:btn-sm"
              aria-label="다크모드 전환"
              onClick={() => {
                const html = document.documentElement;
                const current = html.getAttribute('data-theme');
                html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
              }}
            >
              {theme === 'dark' ? (
                // 해 아이콘 (라이트모드로 전환)
                <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                // 달 아이콘 (다크모드로 전환)
                <svg className="w-5 h-5 text-yellow-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {React.cloneElement(children as React.ReactElement, { openInNewTab })}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
