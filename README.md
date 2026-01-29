# Official AI

> **Go official. Skip the noise.**  
> A clean, ad-free directory of **official AI tool links**. No fake sites. One click to the real source.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fofficial-ai)

## 🌐 Live Demo

👉 [https://officialai.dev](https://officialai.dev)

## 🎯 Why Official AI?

The AI space is flooded with:

- ❌ Fake "official" download sites (malware risk)
- ❌ Outdated affiliate pages
- ❌ Unverified third-party aggregators

**We believe users deserve direct, safe, and fast access to the true source.**

So Official AI does one thing only:  
✅ **Rigorously verify every link points to the project's official website, GitHub repo, or documentation.**

---

## 🔍 Core Principles

- **Clean**: No ads, no tracking, no algorithms
- **Authoritative**: Only official sources (website / GitHub / docs)
- **Minimal**: One tool = one card = one button
- **Non-profit**: Open data, open code, community-driven

> “Done is better than perfect.” — We started with 50 high-quality tools and keep growing.

---

## 🛠 Tech Stack

- **Framework**: [Astro](https://astro.build) (static site, blazing fast)
- **Search**: [Fuse.js](https://fusejs.io) (client-side fuzzy search, no backend)
- **Hosting**: Vercel (global CDN, auto HTTPS)
- **Data**: Pure JSON (`/public/data/tools.json`), PR-friendly

---

## 🤝 How to Contribute?

Found a great AI tool? We’d love to add it!

### Option 1: Pull Request (Recommended)

1. Fork this repo
2. Edit [`/public/data/tools.json`](/public/data/tools.json)
3. Add your tool (format below)
4. Submit a PR

```json
{
  "name": "LangChain",
  "description": "Build applications with LLMs",
  "url": "https://www.langchain.com",
  "order": 40
}
```

### Option 2: GitHub Issue

Not sure if a link is official? [Open an issue](https://github.com/your-username/official-ai/issues/new) with the tool name and suspected official URL. We’ll review and add it.

> ⚠️ **Note**: Non-official links, tutorials, blogs, or paid promotions will not be accepted.

---

## 📜 License

This project is MIT licensed — free to use, modify, and distribute.

The data (`tools.json`) is also open. Feel free to reuse it (please credit Official AI).

---

## 💬 Feedback & Suggestions

- Broken link? → Open an issue
- New category idea? → Open an issue
- Like this project? → Give it a ⭐ Star!
