# Official AI

> **Go official. Skip the noise.**  
> 一个只收录 AI 工具**官方链接**的纯净导航站。无广告，无仿冒站，一键直达真源。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fofficial-ai)

## 🌐 在线访问

👉 [https://officialai.dev](https://officialai.dev)

## 🎯 为什么需要 Official AI？

AI 领域充斥着：

- ❌ 伪装成官网的下载站（窃取信息/植入恶意软件）
- ❌ 联盟营销垃圾页（内容过时、链接失效）
- ❌ 未经验证的第三方聚合站

**我们相信：用户应该直接、安全、快速地访问工具的官方源。**

因此，Official AI 只做一件事：  
✅ **严格审核每一个链接，确保其指向项目官网、GitHub 仓库或官方文档。**

---

## 🔍 核心原则

- **纯净**：无广告、无追踪、无推荐算法
- **权威**：仅收录官方渠道（官网 / GitHub / 官方文档）
- **极简**：一个工具 = 一个卡片 = 一个按钮
- **公益**：非商业项目，代码与数据开放共享

> “Done is better than perfect.” —— 我们从 50 个高质量工具开始，持续增长。

---

## 🛠 技术栈

- **框架**：[Astro](https://astro.build)（静态站点，极致性能）
- **搜索**：[Fuse.js](https://fusejs.io)（前端模糊搜索，无后端依赖）
- **部署**：Vercel（全球 CDN，自动 HTTPS）
- **数据**：纯 JSON（`/public/data/tools.json`），支持 PR 贡献

---

## 🤝 如何贡献？

发现一个优质 AI 工具？欢迎提交！

### 方法 1：Pull Request（推荐）

1. Fork 本仓库
2. 编辑 [`/public/data/tools.json`](/public/data/tools.json)
3. 添加新工具（格式如下）
4. 提交 PR

```json
{
  "name": "Ollama",
  "description": "Run LLMs locally",
  "url": "https://ollama.com",
  "order": 30
}
```

### 方法 2：GitHub Issue

如果不确定链接是否官方，请[提交 Issue](https://github.com/your-username/official-ai/issues/new) 描述工具名称和疑似官方地址，我们会审核后加入。

> ⚠️ **注意**：不接受非官方链接、教程、博客、付费推广。

---

## 📜 许可证

本项目采用 [MIT License](LICENSE) —— 自由使用、修改、分发。

数据内容（`tools.json`）同样开放，欢迎用于你的项目（请注明来源）。

---

## 💬 反馈与建议

- 发现链接失效？→ 提交 Issue
- 想增加新类别？→ 提交 Issue
- 喜欢这个项目？→ 给个 ⭐ Star！
