# 個人品牌網站

這個專案目前有兩個版本：

- 根目錄的 `index.html`：純 HTML 版本
- `frontend/`：React + Vite 版本

如果你想看「完整的前端網頁」，建議使用 `frontend/` 這一版。

## 一、第一次從 0 開始

### 1. 安裝 Node.js

這個專案需要先安裝 Node.js 才能使用 `npm`。

- 到官方網站下載並安裝：<https://nodejs.org/>
- 安裝完成後，重新開啟終端機

### 2. 確認是否安裝成功

在 PowerShell 或命令提示字元輸入：

```bash
node -v
npm -v
```

如果有看到版本號，就代表安裝成功。

### 3. 進入前端資料夾

在專案根目錄執行：

```bash
cd frontend
```

### 4. 安裝套件

第一次進入專案時，需要先安裝依賴：

```bash
npm install
```

### 5. 啟動開發伺服器

安裝完成後，執行：

```bash
npm run dev
```

終端機會顯示一個網址，通常是：

```text
http://localhost:5173
```

把這個網址貼到瀏覽器，就可以看到網站。

## 二、之後每次要打開網站

如果你已經安裝過套件，之後只要：

```bash
cd frontend
npm run dev
```

然後打開終端機顯示的網址即可。

## 三、專案資料夾說明

```text
frontend/
├── public/
│   ├── 商品圖片/
│   └── 經歷圖片/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

## 四、常見問題

### 1. `node` 或 `npm` 顯示不是內部或外部命令

代表 Node.js 還沒安裝，或安裝完沒有重新開啟終端機。

### 2. 網頁打不開

請確認：

- 你有先執行 `npm install`
- 你有在 `frontend/` 資料夾裡執行 `npm run dev`
- 瀏覽器網址是不是 `http://localhost:5173`

### 3. 圖片沒有顯示

請確認圖片是否放在：

- `frontend/public/商品圖片/`
- `frontend/public/經歷圖片/`

## 五、備註

如果你只是想快速打開純 HTML 版本，也可以直接雙擊根目錄的 `index.html`。
