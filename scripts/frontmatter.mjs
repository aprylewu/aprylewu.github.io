// Shared by the app (src/posts.ts) and the build script (scripts/prerender.mjs).
// Supports flat `key: value` front matter only, which is all the posts need.

/** @param {string} raw */
export function parseFrontmatter(raw) {
  raw = raw.replace(/^\uFEFF/, "");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  /** @type {Record<string, string>} */
  const data = {};
  if (!match) return { data, body: raw };
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (/^(["']).*\1$/.test(value)) value = value.slice(1, -1);
    if (key) data[key] = value;
  }
  return { data, body: raw.slice(match[0].length) };
}
