# memory.md — 按時序記錄注意事項

> 慣例：每次工作產生需要注意的事項，依時間先後追加在檔案末尾；完成後以 git push 上傳更新。

---

## 2026-10-11

- 10:57 建立 memory.md。本檔按時序記錄注意事項，每次工作完成後連同變更一起 git push。
- 專案為 Astro minimal starter，部署方式是 GitHub Pages 由 main 分支的 `/docs` 目錄發布（網址 https://k2ol.github.io/ ）。`astro.config.mjs` 已設 `outDir: 'docs'`（預設為 dist）。
- 部署流程注意：改動 `src/` 或 `public/` 後，必須先 `npx astro build` 重新產生 `docs/`，再 commit + push；只推原始碼不重建 `docs/`，線上網站不會更新。
- `docs/` 內是建置產物，請勿直接手改，一律以 build 產生。
- 開發伺服器依 AGENTS.md 慣例：背景模式 `astro dev --background` 啟動，用 `astro dev stop` / `astro dev status` / `astro dev logs` 管理。
- 目前 `src/pages/index.astro` 仍是範本預設內容（標題只有「Astro」），尚未建立實際頁面內容。
- 10:59 起 memory.md 納入 git 追蹤並隨更新 push（原 `.gitignore` 有排除 memory.md，已將該行移除）；`AGENTS.md` 仍維持本地檔，不入庫。
