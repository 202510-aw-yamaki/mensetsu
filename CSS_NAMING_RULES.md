# CSS命名規則

このプロジェクトでは、CSSの命名と配置を以下で統一する。

## 1. 基本方針

- 全体レイアウトの基準ページは `index.html` とする。
- 各章のレイアウト基準ページは、その章の1ページ目とする。
- 個別ページは、全体基準と章基準を継承したうえで、必要な差分だけ微調整する。
- 全体共通スタイルは `css/common.css` に置く。
- 章トップページの共通スタイルは、章トップHTMLと同じスラッグ名で `css/<chapter-slug>.css` に置く。
- 章配下の個別ページスタイルは、章名フォルダ配下に `css/<chapter-slug>/<page-slug>.css` として置く。
- HTMLとCSSのスラッグは必ず一致させる。
- 個別CSSには、そのページでしか使わない差分だけを書く。
- 複数ページで同じ意味を持つレイアウトは、崩れないことを確認したうえで章トップCSSへ戻す。

## 2. 現在の命名パターン

### 全体共通

- `css/common.css`

### 章トップページ

- `index.html` -> `css/index.css`
- `pre-interview-checks.html` -> `css/pre-interview-checks.css`
- `materials-preparation.html` -> `css/materials-preparation.css`
- `chatgpt-support.html` -> `css/chatgpt-support.css`
- `closing.html` -> `css/closing.css`

### 章配下ページ

- `pre-interview-checks/usage-device.html` -> `css/pre-interview-checks/usage-device.css`
- `pre-interview-checks/audio-camera-desktop.html` -> `css/pre-interview-checks/audio-camera-desktop.css`
- `pre-interview-checks/environment-notifications.html` -> `css/pre-interview-checks/environment-notifications.css`
- `pre-interview-checks/platform-overview.html` -> `css/pre-interview-checks/platform-overview.css`

## 3. HTMLでの読み込み順

各ページのCSS読み込み順は必ず次の順にする。

```html
<link rel="stylesheet" href=".../css/common.css">
<link rel="stylesheet" href=".../css/<chapter-slug>.css">
<link rel="stylesheet" href=".../css/<chapter-slug>/<page-slug>.css">
```

補足:

- 章トップページでは3行目は不要。
- 個別調整が不要なページでは3行目は追加しない。
- 共通化できるものまで個別CSSへ書かない。

## 4. 新規ページ作成時の判断基準

新しいページを作るときは、次の順で判断する。

1. まず「これは全体共通か、章共通か、ページ固有か」を先に判定する。
2. 全章で使うなら `css/common.css` に書く。
3. 同じ章の複数ページで使うなら `css/<chapter-slug>.css` に書く。
4. そのページだけで使うなら `css/<chapter-slug>/<page-slug>.css` に書く。

レイアウト判断の基準:

- 全体共通: `index.html` を基準に見て、他章でも使う構造や見た目
- 章共通: 各章の1ページ目を基準に見て、その章内で共通する構造や見た目
- ページ固有: そのページにしか存在しない補足レイアウトや見た目

## 5. 禁止ルール

- `detail.css` `sub.css` `temp.css` のような役割が曖昧な名前は作らない。
- HTML名と一致しないCSS名を新規作成しない。
- 同じレイアウトを複数の個別CSSへ重複記述しない。
- 先に個別CSSへ書いたものでも、共通化できると分かったら章トップCSSへ戻す。

## 6. 今後の運用メモ

- 章を追加したら、まず `css/<chapter-slug>.css` を作る。
- 章配下ページを追加したら、必要な場合だけ `css/<chapter-slug>/<page-slug>.css` を作る。
- 個別CSSが大きくなったら、「その章の他ページでも使っていないか」を先に確認する。
- ページ作成や修正のたびに、必ず「全体共通か、章共通か、ページ固有か」を先に判定してから書き始める。
