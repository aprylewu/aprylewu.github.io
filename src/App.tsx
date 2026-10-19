import { useEffect, useRef, useState, type ReactNode } from "react";
import { links, profile } from "./data";
import { Link, usePath } from "./router";
import { posts } from "./posts";
import Home from "./pages/Home";
import Research from "./pages/Research";
import Blog from "./pages/Blog";
import PostPage from "./pages/Post";
import NotFound from "./pages/NotFound";

type Theme = "light" | "dark";

function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(() => {
    try {
      return (localStorage.getItem("theme") as Theme | null) ?? null;
    } catch {
      return null;
    }
  });
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
    else delete document.documentElement.dataset.theme;
    try {
      if (theme) localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);
  const toggle = () => {
    const current = theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(current === "dark" ? "light" : "dark");
  };
  return toggle;
}

function route(path: string): { page: ReactNode; title?: string } {
  if (path === "/") return { page: <Home /> };
  if (path === "/research") return { page: <Research />, title: "Research" };
  if (path === "/blog") return { page: <Blog />, title: "Blog" };
  const m = /^\/blog\/([^/]+)$/.exec(path);
  if (m) {
    let slug = m[1];
    try {
      slug = decodeURIComponent(slug);
    } catch {
      /* malformed escape */
    }
    const post = posts.find((p) => p.slug === slug);
    if (post) return { page: <PostPage post={post} />, title: post.title };
  }
  return { page: <NotFound />, title: "Not found" };
}

const nav = [
  { to: "/blog", label: "blog" },
  { to: "/research", label: "research" },
];

export default function App() {
  const path = usePath();
  const toggleTheme = useTheme();
  const { page, title } = route(path);

  // After a client-side navigation, move focus to the new page so screen readers announce it.
  const mainRef = useRef<HTMLElement>(null);
  const prevPath = useRef(path);
  useEffect(() => {
    if (prevPath.current !== path) {
      prevPath.current = path;
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [path]);

  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : profile.name;
  }, [title]);

  return (
    <div className="page">
      <nav className="nav">
        <Link to="/" className="brand" aria-label={`${profile.handle}, home`}>
          <img src={profile.avatar} alt="" width={28} height={28} />
          <span className="mono">{profile.handle}</span>
        </Link>
        <div className="nav-links">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={path === n.to || path.startsWith(`${n.to}/`) ? "active" : undefined}
              aria-current={path === n.to || path.startsWith(`${n.to}/`) ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
          <button className="theme" onClick={toggleTheme} aria-label="Toggle dark mode">
            <span aria-hidden>◐</span>
          </button>
        </div>
      </nav>

      <main key={path} ref={mainRef} tabIndex={-1} className="fade">
        {page}
      </main>

      <footer className="footer">
        <div className="footer-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {l.label}
            </a>
          ))}
          <a href="/feed.xml">RSS</a>
        </div>
        <span className="mono">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </span>
      </footer>
    </div>
  );
}
