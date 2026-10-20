// Edit this file to update the site's content.
// Blog posts live in src/posts/*.md.

export type Link = { label: string; href: string };

export type Project = {
  name: string;
  blurb: string;
  href: string;
  tags: string[];
  note?: string;
};

export type Patch = { repo: string; what: string; prs: Link[] };

export type Paper = {
  title: string;
  // Short name shown in bold, e.g. "AVCap".
  short?: string;
  authors: string[];
  venue: string;
  year: number;
  status?: "published" | "preprint" | "review";
  tldr?: string;
  links: Link[];
};

export type Role = { what: string; where: string; when: string };

export const profile = {
  name: "Mingyang Wu",
  first: "Mingyang",
  handle: "@aprylewu",
  avatar: "https://avatars.githubusercontent.com/u/129849514?v=4",
  location: "Hong Kong",
  // The hero cycles through these: "I make things that ___."
  verbs: ["see", "listen", "reason", "click", "ship"],
  intro:
    "I teach models to watch and listen, and I build small apps I actually use.",
  email: "aprylewu@gmail.com",
};

export const links: Link[] = [
  { label: "GitHub", href: "https://github.com/aprylewu" },
  { label: "X", href: "https://x.com/ApryleWu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aprylewu" },
  { label: "Email", href: "mailto:aprylewu@gmail.com" },
];

export const now: string[] = [
  "Leading a small team at Omni-Intelligence. About four of us, building a 7B model that connects brain signals and language.",
  "Teaching video models to notice what they hear, at MMLab, CUHK.",
  "Finishing my undergrad at SUSTech in between all that.",
];

export const projects: Project[] = [
  {
    name: "Battuta",
    blurb:
      "Makes your keyboard and mouse sound like the good ones. Native apps for macOS (SwiftUI) and Windows (WPF), with custom sound packs and typing stats that never log what you type.",
    href: "https://github.com/wormforce/battuta",
    tags: ["Swift", "C#", "macOS", "Windows"],
  },
  {
    name: "sustech-cli",
    blurb:
      "Campus services from the terminal, for me and for AI agents. A TypeScript CLI plus a local MCP server, with JSON output and native credential storage.",
    href: "https://github.com/wormforce/sustech-cli",
    tags: ["TypeScript", "MCP"],
  },
];

const pr = (repo: string, n: number): Link => ({ label: `#${n}`, href: `https://github.com/${repo}/pull/${n}` });

// Merged PRs to AI infrastructure, most important first.
export const patches: Patch[] = [
  {
    repo: "DeepSpeed",
    what: "faster ZeRO-3 updates, and a checkpoint-conversion fix",
    prs: [pr("deepspeedai/DeepSpeed", 8625), pr("deepspeedai/DeepSpeed", 8515)],
  },
  {
    repo: "🤗 Datasets",
    what: "faster JSON export for indexed datasets",
    prs: [pr("huggingface/datasets", 8662)],
  },
  {
    repo: "ms-swift",
    what: "a GRPO reward-stats bug, plus two dataset fixes",
    prs: [pr("modelscope/ms-swift", 10225), pr("modelscope/ms-swift", 10120), pr("modelscope/ms-swift", 10119)],
  },
  {
    repo: "mlx-vlm",
    what: "freeing generation memory without waiting for the garbage collector",
    prs: [pr("Blaizzy/mlx-vlm", 2328)],
  },
  {
    repo: "PySceneDetect",
    what: "a minimum fade-out duration for scene cuts",
    prs: [pr("Breakthrough/PySceneDetect", 574)],
  },
];

// Open PRs, shown as "in review". Prune these once they merge or close.
export const inReview: Link[] = [
  { label: "Megatron-LM", href: "https://github.com/NVIDIA/Megatron-LM/pull/7299" },
  { label: "SGLang", href: "https://github.com/sgl-project/sglang/pull/39067" },
  { label: "DeepSpeed", href: "https://github.com/deepspeedai/DeepSpeed/pull/8543" },
  { label: "PyTorch Lightning", href: "https://github.com/Lightning-AI/pytorch-lightning/pull/21964" },
  { label: "LlamaFactory", href: "https://github.com/hiyouga/LlamaFactory/pull/10834" },
];

// Merged fixes in everyday dev tools.
export const toolFixes: Link[] = [
  { label: "pyenv", href: "https://github.com/pyenv/pyenv/pull/3541" },
  { label: "nvm", href: "https://github.com/nvm-sh/nvm/pull/3921" },
  { label: "Celery", href: "https://github.com/celery/celery/pull/10611" },
  { label: "Poetry", href: "https://github.com/python-poetry/poetry-core/pull/972" },
  { label: "GitPython", href: "https://github.com/gitpython-developers/GitPython/pull/2236" },
  { label: "fsspec", href: "https://github.com/fsspec/filesystem_spec/pull/2137" },
  { label: "oh-my-zsh", href: "https://github.com/ohmyzsh/ohmyzsh/pull/14091" },
  { label: "direnv", href: "https://github.com/direnv/direnv/pull/1621" },
];

export const offline: { icon: string; text: string }[] = [
  { icon: "✈", text: "Aeroplanes. I just like them." },
  { icon: "◎", text: "Travelling to places I haven't been yet." },
  { icon: "♫", text: "Keyboards that sound nice (see: Battuta)." },
];

// ——— Research page ———

export const me = "Mingyang Wu";

export const researchIntro =
  "The day job. I work on multimodal LLMs: models that watch long videos, listen to them, and say what happened and when. Before that I spent about a year at SUSTech's NCC Lab on brain decoding, turning EEG signals into images and text. Brains are back now: at Omni-Intelligence I lead a small team building a 7B brain-language model.";

export const papers: Paper[] = [
  {
    short: "AVTime",
    title: "Reinforcing Dense Audio-Visual Captions with Bidirectional Alignment",
    authors: ["Mingyang Wu", "Kaituo Feng", "Bohao Li", "Kaixiong Gong", "Zihao Yin", "Xiangyu Yue"],
    venue: "arXiv",
    year: 2026,
    status: "preprint",
    tldr: "Timestamped audio-visual captions for long videos, trained with a reward that checks time and events in both directions. Comes with AVTime-50K (49,977 videos, 1.87M timestamped events) and the AVTime-Bench benchmark.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2610.26046" },
      { label: "PDF", href: "https://arxiv.org/pdf/2610.26046" },
      { label: "Models & data", href: "https://huggingface.co/collections/Apryle/avtime" },
    ],
  },
  {
    short: "AVCap",
    title: "Reinforcing Audio-Video Joint Caption with Detail-Aware Reward",
    authors: ["Mingyang Wu", "Kaituo Feng", "Bohao Li", "Kaixiong Gong", "Zihao Yin", "Xiangyu Yue"],
    venue: "arXiv",
    year: 2026,
    status: "preprint",
    tldr: "100K aligned video-caption pairs, detail-aware GRPO rewards, and atomic-fact evaluation for visual, audio, and joint captions.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2608.06930" },
      { label: "PDF", href: "https://arxiv.org/pdf/2608.06930" },
    ],
  },
  {
    short: "Omni-Physics",
    title: "Reinforcing Audio-Essential Physical Understanding via Audiovisual Reward",
    authors: ["Mingyang Wu", "Sihan Qin", "Kaituo Feng", "et al."],
    venue: "Under review",
    year: 2026,
    status: "review",
    tldr: "Reward design for physical reasoning that only works if the model actually listens.",
    links: [],
  },
  {
    short: "MindPilot",
    title: "Closed-loop Visual Stimulation Optimization for Brain Modulation with EEG-guided Diffusion",
    authors: [
      "Dongyang Li",
      "Kunpeng Xie",
      "Mingyang Wu",
      "Yiwei Kong",
      "Jiahua Tang",
      "Haoyang Qin",
      "Chen Wei",
      "Quanying Liu",
    ],
    venue: "ICLR 2026 (Poster)",
    year: 2026,
    status: "published",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2602.10552" },
      { label: "PDF", href: "https://arxiv.org/pdf/2602.10552" },
    ],
  },
  {
    title: "An EEG Dataset for Multimodal Semantic Alignment and Neural Decoding during Reading and Listening",
    authors: ["Sitong Chen", "Beiqianyi Li", "Cuilin He", "Dongyang Li", "Mingyang Wu", "Xinke Shen", "et al."],
    venue: "Scientific Data",
    year: 2026,
    status: "published",
    tldr: "ChineseEEG-2: EEG recorded while people read aloud and listen, for brain-to-language decoding.",
    links: [{ label: "Paper", href: "https://www.nature.com/articles/s41597-025-06466-8" }],
  },
  {
    short: "BrainFLORA",
    title: "Uncovering Brain Concept Representation via Multimodal Neural Embeddings",
    authors: ["Dongyang Li", "Haoyang Qin", "Mingyang Wu", "Chen Wei", "Quanying Liu"],
    venue: "ACM Multimedia 2025",
    year: 2025,
    status: "published",
    links: [{ label: "ACM DL", href: "https://dl.acm.org/doi/10.1145/3746027.3754996" }],
  },
  {
    short: "RealMind",
    title: "Advancing Visual Decoding and Language Interaction via EEG Signals",
    authors: ["Dongyang Li", "Haoyang Qin", "Mingyang Wu", "Jiahua Tang", "Chen Wei", "Quanying Liu"],
    venue: "IEEE ICME 2025",
    year: 2025,
    status: "published",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2410.23754" },
      { label: "IEEE", href: "https://ieeexplore.ieee.org/document/11209041" },
    ],
  },
];

export const roles: Role[] = [
  { what: "Foundation Models Team Lead", where: "Omni-Intelligence", when: "2026 –" },
  { what: "Research Assistant, with Prof. Xiangyu Yue", where: "MMLab, CUHK", when: "2025 –" },
  { what: "Undergraduate Research Assistant, with Prof. Quanying Liu", where: "NCC Lab, SUSTech", when: "2024 – 2025" },
  { what: "B.Eng. in Intelligent Medical Engineering", where: "SUSTech", when: "2023 – 2027" },
];

export const awards: string[] = [
  "Best Presentation Paper, SUSTech BME Research Day (2024)",
  "Challenge Cup, First Prize, SUSTech (2024)",
];

export const scholar = "https://scholar.google.com/citations?user=ND7AssQAAAAJ";
