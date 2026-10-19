// Edit this file to update the site's content.

export type Link = { label: string; href: string };

export type Project = {
  name: string;
  blurb: string;
  href: string;
  tags: string[];
};

export type Paper = {
  title: string;
  venue: string;
  href?: string;
};

export const profile = {
  name: "Mingyang Wu",
  handle: "@aprylewu",
  avatar: "https://avatars.githubusercontent.com/u/129849514?v=4",
  location: "Hong Kong",
  // The hero cycles through these words: "I build models that ___."
  verbs: ["see", "listen", "reason", "read brain signals"],
  intro:
    "Research assistant at MMLab, CUHK, and undergrad at SUSTech. I work on multimodal LLMs, and on the side I build tools I use every day.",
};

export const now: string[] = [
  "Leading the Foundation Models team at Omni-Intelligence: about four of us training a 7B Brain-Language Model.",
  "Teaching audiovisual LLMs to caption and ground long videos at MMLab, advised by Prof. Xiangyu Yue.",
  "Designing rewards for physical reasoning that only works if the model actually listens.",
];

export const projects: Project[] = [
  {
    name: "Battuta",
    blurb: "Keyboard and mouse sounds for macOS and Windows. Native SwiftUI app, custom sound packs, local typing stats.",
    href: "https://github.com/wormforce/battuta",
    tags: ["Swift", "macOS", "Windows"],
  },
  {
    name: "aitimeline",
    blurb: "A conference timeline browser for tracking AI venues and deadlines.",
    href: "https://github.com/aprylewu/aitimeline",
    tags: ["Next.js", "TypeScript"],
  },
  {
    name: "sustech-cli",
    blurb: "A CLI and local MCP server for SUSTech services, with JSON output and native credential storage.",
    href: "https://github.com/wormforce/sustech-cli",
    tags: ["TypeScript", "MCP"],
  },
  {
    name: "Intelligent Scissors",
    blurb: "Interactive image segmentation, built as a SUSTech CS203B course project.",
    href: "https://github.com/aprylewu/CS203Bproject_IntelligentScissors",
    tags: ["Java"],
  },
];

export const papers: Paper[] = [
  { title: "AVTIME: Long-video understanding with time-semantic consistency reward", venue: "Under review · 2026" },
  { title: "AVCap: Audio-video joint captioning with detail-aware reward", venue: "arXiv · 2026", href: "https://arxiv.org/abs/2608.06930" },
  { title: "Omni-Physics: Audio-essential physical understanding via audiovisual reward", venue: "Under review · 2026" },
  { title: "MindPilot: EEG-guided diffusion for closed-loop brain modulation", venue: "ICLR 2026", href: "https://arxiv.org/abs/2602.10552" },
];

export const links: Link[] = [
  { label: "GitHub", href: "https://github.com/aprylewu" },
  { label: "X", href: "https://x.com/ApryleWu" },
  { label: "Scholar", href: "https://scholar.google.com/citations?user=ND7AssQAAAAJ" },
  { label: "Email", href: "mailto:mingyangwu@cuhk.edu.hk" },
];
