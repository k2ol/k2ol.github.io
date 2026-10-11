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
- 11:42 頁面重構（使用者將 `index.astro` git mv 成 `time.astro`，並在 `astro.config.mjs` 加 `build.format: 'file'`，全站輸出改為 `頁面.html` 而非 `頁面/index.html`）：`/t/time.astro` 是現在時間頁（網址 `/t/time.html`），`/t/index.astro` 改為導賞頁「站內導覽」（網址 `/t.html`，`/t/` 已不存在）。注意：format: 'file' 之下 `src/pages/t/index.astro` 的網址是 `/t.html` 而非 `/t/`，站內連結都用 `.html` 結尾；時鐘頁控制列的 🧭 連結指向 `/t.html`。舊的 `docs/t/index.html` 已刪除。已 rebuild 並以瀏覽器驗證導賞頁、時鐘頁與互相連結正常。
- 11:55 網址定案：導賞頁 `/t/index.html`（來源 `src/pages/t/index.astro`），時鐘頁 `/t/time.html`（來源 **`public/t/time.html`** 純靜態檔）。重要教訓：`src/pages/` 下的 `.html` 檔會被 Astro 當成路由（`format: 'directory'` 之下 `t/time.html` → `/t/time/`），要輸出字面上的 `xxx.html` 檔名必須放 `public/`。`astro.config.mjs` 已還原為預設（移除 `build.format: 'file'`，該設定會使 `t/index.astro` 輸出成 `/t.html` 而非 `/t/index.html`）。站內連結：首頁 → `/t/index.html`；導賞頁 → `/t/time.html`；時鐘頁 🧭 → `/t/index.html`、🏠 → `/`。已 rebuild 並以瀏覽器驗證兩頁與連結正常。另注意：Astro build 不會清除 `docs/` 內的殘留舊檔（如改結構前的 `t/time/index.html`），改路由結構後要手動檢查 `docs/` 並刪除孤兒檔案。
- 12:12 首頁美化（漸層標題＋CTA 按鈕＋快速連結）；`/t/` 由「站內導覽」改名「🧰 工具箱」；新增節拍器 `/t/metronome.html`（來源 `public/t/metronome.html` 純靜態檔，網址規則同時鐘頁）。節拍器：Web Audio API 排程（lookahead 0.15s）、BPM 30–240（+/−、滑桿、點拍 Tap 測速）、拍數 2–8 可選、強拍高音、節拍點視覺高亮、空白鍵開始/停止。重要教訓：視覺同步不可用 `requestAnimationFrame`（此測試環境及分頁在背景時 rAF 完全不觸發），改用依音訊時鐘換算延遲的 `setTimeout` 觸發高亮。已 rebuild 並以瀏覽器驗證三頁排版與節拍器功能。
- 12:22 首頁刪除「k2ol.github.io」標題文字（改以「工具小站」徽章＋副標＋CTA 呈現）；節拍器加「人聲：開/關」數拍功能——以 SpeechSynthesis（`u.lang='zh-TW'`，rate 1.6）念「一～八」，比拍點提前 100ms 發聲補償合成延遲，開關存 localStorage（`t-voice`），停止時 `speechSynthesis.cancel()`。注意：語音與視覺一樣靠 `setTimeout` 於排程時觸發；已驗證 `speechSynthesis.speaking/pending` 為 true（實際有在念）。
- 12:33 人聲改為預合成 MP3（取代 SpeechSynthesis，支援大部分瀏覽器且可精準對拍）：用 Windows SAPI「Microsoft Hanhan（zh-TW）」合成「一～八」WAV，ffmpeg 去頭尾靜音（-45dB）＋apad 0.05s 轉 MP3（mono 44.1kHz，每個約 3KB、0.2–0.33s），放在 `public/t/voice/1-8.mp3`。節拍器啟動時（人聲開）`fetch`＋`decodeAudioData` 載入 8 個檔成 AudioBuffer，排程時以 `BufferSource.start(nextTime)` 於精確音訊時間播放（取代提前 100ms 的 hack）；載入失敗會 console.warn 並自動停用人聲。注意：PowerShell 產生中文語音時 .ps1 要避免中文變數（用 `[char]0x4E00` 碼位），否則 Git Bash heredoc 會亂碼；`ffmpeg` 在 PATH 但 `ffprobe` 不在。已驗證 8 檔皆可解碼、人聲開啟時 2.5 秒排程 5 個 BufferSource。
- 14:25 新增抽籤輪盤 `/t/wheel.html`（參考 tw.piliapp.com/random/wheel，來源 `public/t/wheel.html` 純靜態檔）：canvas 畫轉盤，textarea 每行一個選項即時重畫（預設甲～辛），點輪盤／「轉！」／空白鍵旋轉約 4.2 秒緩出，`crypto.getRandomValues`（拒絕取樣去模數偏差）先選中獎段再算出落點角度。附「音效：開/關」（Web Audio 短音、跨段時 tick）、「抽中後移除」、「重設」；旋轉中鎖定操作。工具箱加卡片、首頁快速連結加入。技術注意：動畫用 `setTimeout(16ms)` 步進（本環境 rAF 不觸發，見 12:12 教訓）；純 `<script>` 的變數是全域，測試可直接讀 `rotation`/`names` 驗證指針與中獎段一致。已驗證：旋轉出「辛」且指針段 idx=7 一致、移除後 8→7、重設回 8。
- 15:10 重做隨機抽籤 `/t/lots.html`（使用者回報「效果不對」）。抓參考站原始碼分析後發現：piliapp 的 lots 根本沒有「中籤數」機制，而是名單（textarea 每行一個）按「開始」後 Fisher–Yates 洗牌（Vue，class 為 .lot/.front/.back 翻卡），變成面朝下的牌，每人點一張翻面看自己抽到什麼；附「編輯」「顯示全部」按鈕。舊版自創中籤制、籤面顯示名字、找到中籤自動翻全部——模型整個不對。重做後：編輯區（textarea＋開始）⇄ 遊玩區（3D 翻卡籤，preserve-3d + backface-visibility，front 竹籤「籤」字面、back 直式籤文，字級 92px/字數 限縮）；按鈕：開始／重新洗籤（650ms「洗牌中…」遮罩）、顯示全部、編輯名單（保留 textarea 內容）。教訓：①截圖出現翻面半途的窄條是此環境動畫節流，DOM 已到位（offsetWidth 66px、matrix3d 完成），等 3 秒再截即正常，非程式 bug；②重做前先用 curl 抓參考站原始碼比對真實互動模型，別憑猜測自創機制。已驗證：發牌為輸入的排列、單張翻面內容一致、顯示全部、編輯往返正常。
