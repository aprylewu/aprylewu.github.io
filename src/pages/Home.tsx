import { useEffect, useState } from "react";
import { inReview, links, now, offline, patches, profile, projects, toolFixes, type Link as Ref } from "../data";
import { formatDate, posts } from "../posts";
import { Link } from "../router";

function useCycle(items: string[], ms = 2200) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), ms);
    return () => clearInterval(id);
  }, [items.length, ms]);
  return items[i];
}

function Refs({ items }: { items: Ref[] }) {
  return (
    <>
      {items.map((r, i) => (
        <span key={r.href}>
          {i > 0 && (i < items.length - 1 ? ", " : items.length === 2 ? " and " : ", and ")}
          <a href={r.href} target="_blank" rel="noreferrer">
            {r.label}
          </a>
        </span>
      ))}
    </>
  );
}

export default function Home() {
  const verb = useCycle(profile.verbs);
  const latest = posts.slice(0, 3);

  return (
    <>
      <header className="hero">
        <p className="status mono">
          <span className="dot" aria-hidden /> currently in {profile.location}
        </p>
        <h1>
          Hi, I'm {profile.first}.
          <br />I make things{" "}
          <span className="nowrap">
            that{" "}
            {/* Every word is rendered invisibly in the same grid cell, so the slot is as
                wide as the longest one and the line never reflows as the word changes. */}
            <span className="verb-slot">
              {profile.verbs.map((v) => (
                <span key={v} className="verb verb-ghost" aria-hidden>
                  {v}
                  <span className="verb-dot">.</span>
                </span>
              ))}
              <em key={verb} className="verb">
                {verb}
                <span className="verb-dot">.</span>
              </em>
            </span>
          </span>
        </h1>
        <p className="intro">{profile.intro}</p>
        <div className="chips">
          {links.map((l) => (
            <a
              key={l.label}
              className="chip"
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {l.label}
            </a>
          ))}
        </div>
      </header>

      <section>
        <h2>Lately</h2>
        <ul className="now">
          {now.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="aside">
          The papers, if that's your thing, are on the <Link to="/research">research page</Link>.
        </p>
      </section>

      <section>
        <div className="section-head">
          <h2>Writing</h2>
          <Link to="/blog" className="more">
            all posts →
          </Link>
        </div>
        {latest.length ? (
          <ul className="post-list">
            {latest.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`}>
                  <span className="post-title">{p.title}</span>
                  <span className="mono post-date">{formatDate(p.date, "short")}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="aside">Nothing yet. Soon.</p>
        )}
      </section>

      <section>
        <h2>Things I've made</h2>
        <div className="grid">
          {projects.map((p) => (
            <a key={p.name} className="card" href={p.href} target="_blank" rel="noreferrer">
              <div className="card-top">
                <h3>{p.name}</h3>
                <span className="arrow" aria-hidden>
                  ↗
                </span>
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

        <h3 className="subhead">Patches to the AI stack</h3>
        <ul className="patches">
          {patches.map((p) => (
            <li key={p.repo}>
              <span className="mono repo">{p.repo}</span>
              <span className="what">{p.what}</span>
              <span className="prs">
                {p.prs.map((pr) => (
                  <a key={pr.href} className="mono" href={pr.href} target="_blank" rel="noreferrer">
                    {pr.label}
                  </a>
                ))}
              </span>
            </li>
          ))}
        </ul>
        <p className="aside">
          In review: <span className="refs"><Refs items={inReview} /></span>.
        </p>
        <p className="aside">
          Plus small fixes in dev tools: <span className="refs"><Refs items={toolFixes} /></span>. Older
          experiments live on{" "}
          <a href="https://github.com/aprylewu" target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Off the clock</h2>
        <ul className="offline">
          {offline.map((o) => (
            <li key={o.text}>
              <span className="offline-icon" aria-hidden>
                {o.icon}
              </span>
              {o.text}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
