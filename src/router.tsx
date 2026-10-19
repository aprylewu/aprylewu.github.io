import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from "react";

// A tiny history-based router. scripts/prerender.mjs writes an index.html for
// every route so GitHub Pages serves each path with a 200.

const listeners = new Set<() => void>();

function normalize(path: string) {
  const p = path.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

export function navigate(to: string) {
  const url = new URL(to, location.href);
  if (url.pathname + url.hash === location.pathname + location.hash) return;
  history.pushState(null, "", url.pathname + url.search + url.hash);
  listeners.forEach((l) => l());
  if (url.hash) document.getElementById(url.hash.slice(1))?.scrollIntoView();
  else window.scrollTo(0, 0);
}

export function usePath() {
  const [path, setPath] = useState(() => normalize(location.pathname));
  useEffect(() => {
    const update = () => setPath(normalize(location.pathname));
    listeners.add(update);
    window.addEventListener("popstate", update);
    return () => {
      listeners.delete(update);
      window.removeEventListener("popstate", update);
    };
  }, []);
  return path;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export function Link({ to, onClick, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handle} {...rest} />;
}
