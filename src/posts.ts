import { marked } from "marked";
import { parseFrontmatter } from "../scripts/frontmatter.mjs";

// Every src/posts/*.md file becomes /blog/<file-name>.
// Front matter: title, date (YYYY-MM-DD), summary.
// Drafts go in src/drafts/*.md: they show up in `npm run dev` only and are never
// bundled into the published site.

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  html: string;
  minutes: number;
};

const published = import.meta.glob("./posts/*.md", { query: "?raw", import: "default", eager: true });
const drafts = import.meta.env.DEV
  ? import.meta.glob("./drafts/*.md", { query: "?raw", import: "default", eager: true })
  : {};
const files = { ...published, ...drafts } as Record<string, string>;

// Chinese and Japanese have no spaces, so count those characters separately.
const CJK = /[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff]/g;

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const cjk = (body.match(CJK) ?? []).length;
    const words = body.replace(CJK, " ").split(/\s+/).filter(Boolean).length;
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      summary: data.summary ?? "",
      html: marked.parse(body, { async: false }),
      minutes: Math.max(1, Math.round(words / 220 + cjk / 400)),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function formatDate(iso: string, style: "short" | "long" = "long") {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: style === "short" ? "short" : "long",
    day: "numeric",
  });
}
