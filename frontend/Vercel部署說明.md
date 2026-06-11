# Vercel 部署說明

這份說明是給這個 React 前端專案用的。

## 先了解一件事

這個網站的前端可以放在 Vercel。
但目前的 Flask 後端不會跟著自動部署到 Vercel，因為 Vercel 不是拿來直接長期跑 Flask 伺服器的環境。

所以你有兩種做法：

1. 先只部署前端，資料新增後會先存在瀏覽器暫存。
2. 把 Flask 後端部署到其他平台，再讓前端去連那個 API。

## Vercel 需要的設定

如果你是把整個專案放進 Vercel，請確認：

- Root Directory 設為 `frontend`
- Build Command 使用 `npm run build`
- Output Directory 使用 `dist`

如果你是直接用這個專案根目錄的 `vercel.json`，也可以直接套用。

## API 環境變數

前端會讀取 `VITE_API_BASE_URL`。

- 開發時，如果沒有設定，會自動用 `http://127.0.0.1:5000/api`
- 正式環境建議自己設定成真正的後端網址

例如：

```bash
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

如果你的後端有跟前端同網域，或你之後改成 Vercel API / serverless function，也可以改成 `/api`。

## 部署步驟

1. 把專案推到 GitHub
2. 在 Vercel 新增專案
3. 選擇這個 GitHub repository
4. Root Directory 選 `frontend`
5. 設定 `VITE_API_BASE_URL`
6. 部署

## 部署後你可以檢查什麼

- 網頁是否成功打開
- 商品展示和經歷展示是否正常顯示
- 新增商品是否能儲存
- 新增經歷是否能儲存
- 詳細視窗是否能刪除資料

## 小提醒

如果你只部署前端，沒有真正部署後端，新增資料會先存在瀏覽器暫存。
如果你清除瀏覽器資料或換裝置，資料就不會同步。

如果你要，我下一步可以再幫你整理成「前端部署版」和「後端部署版」兩份更完整的說明。
