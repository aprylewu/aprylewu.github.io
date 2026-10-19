// Runs after `vite build`. GitHub Pages has no SPA fallback, so this writes a copy
// of dist/index.html for every route (each served with a 200, its own title, and
// social-preview tags), a 404.html, and an RSS feed for the blog.
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { parseFrontmatter } from "./frontmatter.mjs";

const SITE = "https://aprylewu.github.io";
const NAME = "Mingyang Wu";
const IMAGE = "https://avatars.githubusercontent.com/u/129849514?v=4";
const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const postsDir = fileURLToPath(new URL("../src/posts/", import.meta.url));

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const posts = [];
for (const file of (await readdir(postsDir)).filter((f) => f.endsWith(".md"))) {
  const { data, body } = parseFrontmatter(await readFile(join(postsDir, file), "utf8"));
  const slug = file.replace(/\.md$/, "");
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    throw new Error(`${file}: date must be YYYY-MM-DD, got "${data.date}"`);
  }
  posts.push({
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    summary: data.summary ?? "",
    html: marked.parse(body, { async: false }),
  });
}
posts.sort((a, b) => b.date.localeCompare(a.date));

const shell = await readFile(join(dist, "index.html"), "utf8");
const defaultDescription = /<meta name="description" content="([^"]*)"/.exec(shell)[1];

function page(title, description, path, type = "website") {
  let html = shell.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`);
  const desc = description ? escape(description) : defaultDescription;
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${desc}"`);
  if (!path) return html;
  const url = `${SITE}${encodeURI(path)}`;
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${NAME}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${desc}" />`,
    `<meta property="og:image" content="${IMAGE}" />`,
    `<meta name="twitter:card" content="summary" />`,
  ];
  return html.replace("</head>", `  ${tags.join("\n    ")}\n  </head>`);
}

async function emit(route, html) {
  const dir = join(dist, route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html);
}

await emit("", page(NAME, undefined, "/"));
await emit("research", page(`Research · ${NAME}`, `Papers by ${NAME}.`, "/research/"));
await emit("blog", page(`Blog · ${NAME}`, `Writing by ${NAME}.`, "/blog/"));
for (const p of posts) {
  await emit(`blog/${p.slug}`, page(`${p.title} · ${NAME}`, p.summary, `/blog/${p.slug}/`, "article"));
}
await writeFile(join(dist, "404.html"), page(`Not found · ${NAME}`));

const rfc822 = (iso) => new Date(`${iso}T00:00:00Z`).toUTCString();
const items = posts
  .map((p) => {
    const url = `${SITE}${encodeURI(`/blog/${p.slug}/`)}`;
    return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>${p.date ? `\n      <pubDate>${rfc822(p.date)}</pubDate>` : ""}
      <description>${escape(p.summary || p.html)}</description>
    </item>`;
  })
  .join("\n");
await writeFile(
  join(dist, "feed.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${NAME}</title>
    <link>${SITE}/blog/</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Writing by ${NAME}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`,
);

console.log(`prerendered ${posts.length + 3} routes, 404.html, feed.xml`);
