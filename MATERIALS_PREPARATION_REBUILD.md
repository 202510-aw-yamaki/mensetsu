# 第2章再構成メモ

## 目的

- `index.html` の目次順を新しい章順へ変更する
- `materials-preparation.html` を第2章の章トップページとして作り直す
- `materials-preparation/` 配下に第2章の個別ページを作成する
- 今後の第2章追加修正でも迷わないように、実装方針を固定する

## 新しい章順

1. Web面接前に確認しておきたいこと
2. 面接資料の準備方法
3. ChatGPTを活用した面接準備の進め方
4. 面接当日に意識したいこと
5. 最終チェックリスト
6. まとめ

## 第2章トップページの役割

ファイル:

- `materials-preparation.html`

役割:

- 第2章の導入ページ
- 第2章の目次ページ
- `materials-preparation/` 配下の4ページへ遷移する章トップ

## 第2章トップページに掲載する内容

- タイトル: `2. 面接資料の準備方法`
- 導入文
- 第2章の目次
- 第2章のイメージ画像

## 第2章の目次

- `2-1. 応募先企業の情報および求人情報`
- `2-2. 自身の履歴書・職務経歴書`
- `2-3. 自身のポートフォリオ`
- `2-4. 職業訓練校のカリキュラムおよび学習記録`

## 第2章配下ページ構成

- `materials-preparation/company-information.html`
- `materials-preparation/resume-career-history.html`
- `materials-preparation/portfolio.html`
- `materials-preparation/curriculum-learning-log.html`

## 実装方針

### ページ構成

- `index.html` の目次順を新しい章順へ変更する
- `materials-preparation.html` は第2章の章トップとして再構成する
- 第2章の詳細ページは `materials-preparation/` フォルダ配下に分割する

### CSS方針

- 全体共通は `css/common.css`
- 第2章共通は `css/materials-preparation.css`
- 今回の基本形では、第2章配下ページは `css/materials-preparation.css` を共通土台として使う
- 本当に差分が必要になった時だけ `css/materials-preparation/<page-slug>.css` を追加する

### レイアウト方針

- 第2章トップは「導入 + 目次 + 右画像」の章目次構成にする
- 第2章配下ページは「左に文章、右に画像」の構成にする
- モバイルでは右画像を本文中へ落とし込める構成にしておく
- タブレット幅では必要に応じてタイトルを1段目全面にし、その下を左説明群・右画像にできる構造を維持する

### ナビゲーション方針

- 章トップの次は `2-1` ページへ進む
- 個別ページは章内で順送りにする
- `2-4` の次は `chatgpt-support.html` へ接続する
- 章順の変更に合わせて、トップページ番号と前後リンクも更新する
