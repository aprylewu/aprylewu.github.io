import { formatDate, posts } from "../posts";
import { Link } from "../router";

export default function Blog() {
  return (
    <>
      <header className="page-head">
        <h1>Blog</h1>
        <p className="intro">
          Notes on things I build, break, and figure out. Sometimes about models, often not. Also on{" "}
          <a href="/feed.xml">RSS</a>.
        </p>
      </header>
      <section>
        {posts.length ? (
          <ul className="post-list big">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`}>
                  <span className="post-title">{p.title}</span>
                  <span className="mono post-date">{formatDate(p.date, "short")}</span>
                  {p.summary && <span className="post-summary">{p.summary}</span>}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="aside">Nothing here yet.</p>
        )}
      </section>
    </>
  );
}
