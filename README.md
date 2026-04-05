# Web面接ガイド

このリポジトリは、**Web面接に向けた事前準備と対策**を段階的に整理した、静的HTMLベースのガイドページ群です。  
受講生や求職者が、面接前の環境確認、資料準備、ChatGPT活用、最終確認までを順番に見直せる構成を目的としています。

## 目的

- Web面接前に確認すべき環境や操作を整理する
- 面接資料の準備方法を章立てで案内する
- ChatGPTを使った面接準備の進め方を具体化する
- 最後に全体のチェックと振り返りができるようにする

## ページ構成

トップページ:
- `[index.html](./index.html)`  
  サイト全体の目次ページ

第1章:
- `[pre-interview-checks.html](./pre-interview-checks.html)`  
  Web面接前に確認しておきたいこと
- `pre-interview-checks/`  
  使用端末、音声・カメラ、通知、各種Web会議ツールなどの詳細ページ

第2章:
- `[materials-preparation.html](./materials-preparation.html)`  
  面接資料の準備方法
- `materials-preparation/`  
  企業情報、履歴書・職務経歴書、ポートフォリオ、学習記録、企業アンケートなどの詳細ページ

第3章:
- `[chatgpt-support.html](./chatgpt-support.html)`  
  ChatGPTを活用した面接準備の進め方
- `chatgpt-support/`  
  求人理解、振り返りメモ、想定問答集、模擬面接などの詳細ページ

第4章:
- `[closing.html](./closing.html)`  
  最後に。最終チェックリストと全体のまとめ

補助資料:
- `[presentation.html](./presentation.html)`  
  プレゼンテーション用の別構成ページ

## HTML/CSS運用ルール

このリポジトリでは、ページ追加時に「どこへ書くか」を先に判定する運用を採用しています。

1. 全体共通なら `css/common.css`
2. 章共通なら `css/<chapter>.css`
3. ページ固有なら `css/<chapter>/<page>.css`

レイアウト基準は次の通りです。

- 全体レイアウトの基準は `[index.html](./index.html)`
- 各章の基準は、その章のトップページ
- 配下ページは章共通CSSを土台にし、必要な差分だけ個別CSSで調整する

詳細な命名規則と運用方針は、以下を参照してください。

- `[CSS_NAMING_RULES.md](./CSS_NAMING_RULES.md)`

## 実装方針

- ヘッダーとフッター、ページ送り、画像モーダルなどは共通パーツとして扱う
- PC / タブレット / SP のレスポンシブ差分は、まず章共通で吸収できるかを判断する
- 内容差し替えだけで済むページは、できるだけ章共通レイアウトを再利用する
- 個別調整は、共通レイアウトを壊さない範囲で最小限に留める

## 関連ドキュメント

- `[CSS_NAMING_RULES.md](./CSS_NAMING_RULES.md)`  
  CSS命名規則と責務分割ルール
- `[MATERIALS_PREPARATION_REBUILD.md](./MATERIALS_PREPARATION_REBUILD.md)`  
  第2章の再構成メモ

