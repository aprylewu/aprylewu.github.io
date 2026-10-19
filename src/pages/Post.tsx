import { formatDate, type Post } from "../posts";
import { Link } from "../router";

export default function PostPage({ post }: { post: Post }) {
  return (
    <article className="post">
      <Link to="/blog" className="back mono">
        ← all posts
      </Link>
      <header className="post-head">
        <h1>{post.title}</h1>
        <p className="mono post-date">
          {formatDate(post.date)} · {post.minutes} min read
        </p>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
