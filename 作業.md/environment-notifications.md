# environment-notifications.html 作業記録

## 対象

- `pre-interview-checks/environment-notifications.html`
- `css/pre-interview-checks-detail.css`
- `js/environment-notifications-layout.js`

## 今回の要望

- `pre-interview-checks/environment-notifications.html` の構成を見直す
- 右側画像を `image/OS通知停止.png` に差し替える
- 左側に `カメラ` の項目を追加する
- 画面幅ごとにレイアウトを調整する

## 作業内容

- ページ全体を `content-grid detail-hero environment-notifications-hero` 構成へ変更した
- 左側を `environment-notifications-stack` とし、以下の順で縦積みに整理した
- 導入カード
- `カメラ`
- `照明・背景・環境`
- `通知停止`
- `note`
- 右側画像を `OS通知停止.png` の単一表示へ変更した
- `カメラ` 項目として以下を追加した
- 顔が画角から切れていないか確認する
- 顔の大きさが適切か確認する
- 表情が見える明るさになっているか確認する
- 面接にふさわしい服装が画面上でどう見えるか確認する

## レイアウト調整

- PC幅では `environment-notifications-stack` の高さを `environment-notifications-hero` に合わせ、余剰高さを `note` に吸わせる構成にした
- 上記の高さ同期用に `js/environment-notifications-layout.js` を新規作成した
- PC幅では右画像を下寄せにした
- タブレット幅では `audio-camera-desktop.html` と同じ考え方に寄せた
- 先頭カードを全幅表示にし、その下で左に内容、右に画像を配置する構成にした
- タブレット幅でも右画像を下寄せにした
- SP幅では `note` を非表示にした
- SP幅では画像を `environment-notifications-stack` の下へ移動する並びにした
- SP幅では `environment-notifications-stack` を親コンテナ幅いっぱいに広げた

## 補足

- 今回の調整は `environment-notifications` 専用クラスで閉じ、`usage-device` や `audio-camera-desktop` の既存挙動には直接影響しないようにした
