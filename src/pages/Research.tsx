import { awards, me, papers, researchIntro, roles, scholar, type Paper } from "../data";

const statusLabel: Record<NonNullable<Paper["status"]>, string> = {
  published: "published",
  preprint: "preprint",
  review: "under review",
};

function Authors({ names }: { names: string[] }) {
  return (
    <p className="authors">
      {names.map((n, i) => (
        <span key={n}>
          {n === me ? <strong>{n}</strong> : n}
          {i < names.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

export default function Research() {
  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <>
      <header className="page-head">
        <h1>Research</h1>
        <p className="intro">{researchIntro}</p>
        <p className="aside">
          Also on{" "}
          <a href={scholar} target="_blank" rel="noreferrer">
            Google Scholar
          </a>
          .
        </p>
      </header>

      {years.map((year) => (
        <section key={year} className="year">
          <h2 className="mono year-label">{year}</h2>
          <ul className="papers">
            {papers
              .filter((p) => p.year === year)
              .map((p) => (
                <li key={p.title} className="paper">
                  <h3>
                    {p.short && <span className="paper-short">{p.short}</span>}
                    {p.short ? ": " : ""}
                    {p.title}
                  </h3>
                  <Authors names={p.authors} />
                  <div className="paper-meta">
                    <span className="venue">{p.venue}</span>
                    {p.status && p.status !== "published" && p.venue.toLowerCase() !== statusLabel[p.status] && (
                      <span className={`mono badge badge-${p.status}`}>{statusLabel[p.status]}</span>
                    )}
                    {p.links.map((l) => (
                      <a key={l.href} className="mono paper-link" href={l.href} target="_blank" rel="noreferrer">
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                  {p.tldr && <p className="tldr">{p.tldr}</p>}
                </li>
              ))}
          </ul>
        </section>
      ))}

      <section>
        <h2>Along the way</h2>
        <ul className="roles">
          {roles.map((r) => (
            <li key={r.what}>
              <span className="mono when">{r.when}</span>
              <span>
                {r.what} <span className="where">{r.where}</span>
              </span>
            </li>
          ))}
        </ul>
        <ul className="awards">
          {awards.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
