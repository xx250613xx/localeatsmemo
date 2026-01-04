# 説明

このアプリは試験での共有を目的に作成した、店舗情報を地図やグラフで紹介するNext.jsアプリです。  
SSR/CSR/動的ルーティングを用いて構築しています。

---

## 概要
- 店舗マップ表示（MapLibre GL）
- 店舗詳細ページ（SSR / 動的ルーティング）
- タグ・エリア別ランキング（Chart.js）
- JSON データ連携
- レスポンシブ対応（Tailwind CSS）
- Netlify によるデプロイ済み

---

## 技術スタック
- Next.js (App Router)
- React
- Tailwind CSS
- MapLibre GL
- Chart.js / react-chartjs-2
- Netlify (デプロイ)

---

## セットアップ
```bash
git clone
cd localeatsmemo
npm install
npm run dev
```
---

## デモurl
別資料にて展開

## 今後の改善点
- 認証機能の追加（ログイン／ユーザー管理）
- 店舗投稿機能の追加及びデータベースを利用したデータ管理
- 管理画面の実装（店舗情報の編集・削除）