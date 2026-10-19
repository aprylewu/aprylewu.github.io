import { useEffect, useState } from "react";
import { links, now, papers, profile, projects } from "./data";

function useCycle(items: string[], ms = 2200) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), ms);
    return () => clearInterval(id);
  }, [items.length, ms]);
  return items[i];
}

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
    const current =
      theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(current === "dark" ? "light" : "dark");
  };
  return toggle;
}

export default function App() {
  const verb = useCycle(profile.verbs);
  const toggleTheme = useTheme();

  return (
    <div className="page">
      <nav className="nav">
        <span className="mono">{profile.handle}</span>
        <div className="nav-links">
          <a href="#now">now</a>
          <a href="#projects">projects</a>
          <a href="#research">research</a>
          <button className="theme" onClick={toggleTheme} aria-label="Toggle theme">
            ◐
          </button>
        </div>
      </nav>

      <header className="hero">
        <img className="avatar" src={profile.avatar} alt={profile.name} />
        <h1>
          Hi, I'm {profile.name.split(" ")[0]}.
          <br />
          I build models that{" "}
          <span key={verb} className="verb">
            {verb}
          </span>
          .
        </h1>
        <p className="intro">{profile.intro}</p>
        <div className="chips">
          {links.map((l) => (
            <a key={l.label} className="chip" href={l.href} target="_blank" rel="noreferrer">
              {l.label} ↗
            </a>
          ))}
        </div>
      </header>

      <section id="now">
        <h2>
          <span className="mono label">01</span> What I'm doing now
        </h2>
        <ul className="now">
          {now.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </section>

      <section id="projects">
        <h2>
          <span className="mono label">02</span> Things I've built
        </h2>
        <div className="grid">
          {projects.map((p) => (
            <a key={p.name} className="card" href={p.href} target="_blank" rel="noreferrer">
              <div className="card-top">
                <h3>{p.name}</h3>
                <span className="arrow">↗</span>
              </div>
              <p>{p.blurb}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t} className="mono tag">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="research">
        <h2>
          <span className="mono label">03</span> Research
        </h2>
        <ul className="papers">
          {papers.map((p) => (
            <li key={p.title}>
              {p.href ? (
                <a href={p.href} target="_blank" rel="noreferrer">
                  {p.title}
                </a>
              ) : (
                <span>{p.title}</span>
              )}
              <span className="mono venue">{p.venue}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span>
          {profile.location} · built with React + TypeScript
        </span>
        <a href="mailto:mingyangwu@cuhk.edu.hk">Say hi →</a>
      </footer>
    </div>
  );
}
