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
- 11:20 新增現在時間頁面 `src/pages/t/index.astro`（路由 `/t/`，參考 tw.piliapp.com/time）：大字即時時鐘＋中文日期，秒數對齊整秒更新；附 12H/24H、日期顯示/隱藏、深淺色（跟隨系統並記住選擇）、全螢幕等切換，設定存 localStorage。首頁 index.astro 加了連往 `/t/` 的連結。注意：控制按鈕預設隱藏，滑鼠移到頁面上才顯示（`body:hover #controls`）。已 build 更新 `docs/` 並以瀏覽器驗證時鐘與切換功能正常。
