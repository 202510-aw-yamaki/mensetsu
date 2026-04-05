# platform-overview.html 作業記録

## 対象

- `pre-interview-checks/platform-overview.html`
- `css/pre-interview-checks-detail.css`
- `js/platform-overview-layout.js`

## 今回の要望

- `pre-interview-checks/platform-overview.html` の基本配置を既存詳細ページに寄せる
- 各ツール名をクリックで遷移できるリンクボタンにする
- 左側の文言量を整理したうえで、右画像との高さバランスを整える
- 右側画像は `image/Web面接を受ける女性.png` を使用する

## 作業内容

- ページ全体を `content-grid detail-hero platform-overview-hero` 構成へ変更した
- 左側を `platform-overview-stack` とし、以下の順で整理した
- 導入カード
- `主な対象ツール`
- `共通して確認したいこと`
- `主な対象ツール` では、各ツール名をリンクボタン化した
- `Google Meet` は `google-meet.html`
- `Zoom` は `zoom.html`
- `Microsoft Teams` は `microsoft-teams.html`
- 各リンクボタンにはツールごとの特徴説明を付けた
- 右側画像を `Web面接を受ける女性.png` の単一表示へ変更した

## レイアウト調整

- `platform-overview` 専用のスタイルとして `platform-tool-list`、`platform-tool-link`、`platform-tool-name`、`platform-tool-text` を追加した
- PC幅では `platform-overview-stack` の高さを右画像に合わせるため、`js/platform-overview-layout.js` を新規作成した
- PC幅では `note` を下側へ送る構成にした
- 一時的に左右比率や gap の再配分で調整を試したが、ページ全体の見た目が崩れたため採用しなかった
- 最終的には、右画像側の表示バランスを保ったまま、`platform-overview-stack` の高さ同期と `note` の下寄せで調整した
- 右画像は `platform-overview-visual` 側の配置を使って下寄せとし、上側に余白が出る見せ方に調整した

## レスポンシブ調整

- タブレット幅では `audio-camera-desktop.html` と同じ考え方で、先頭カードを全幅、その下で左に内容、右に画像を置く構成にした
- タブレット幅では見出し内の `<br>` と `title-indent` を非表示にした
- SP幅では左側内容の下に画像が続く構成にした
- SP幅でも `platform-overview-stack` が親コンテナ幅いっぱいになるようにした

## 補足

- 途中で `article` の閉じ忘れにより、カードの中に次のカードが入る崩れが発生したため、HTML 構造を修正した
- 今回の CSS 調整は `.platform-overview-*` と `.platform-tool-*` の専用セレクタに限定し、他ページへ直接影響しない形で閉じた
