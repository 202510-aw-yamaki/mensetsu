# usage-device.html 作業記録

## 対象

- `pre-interview-checks/usage-device.html`
- `css/pre-interview-checks-detail.css`
- `js/usage-device-layout.js`

## 作業内容

- `pre-interview-checks/usage-device.html` の右カラムに `キーボードFnキー.png` を追加した
- 上側画像は `picture` 化し、タブレット幅 `960px` 以下では `ノートパソコン画面_960px以下.png` を出すようにした
- `css/pre-interview-checks-detail.css` で `usage-device-visual` をページ固有のフレックス配置にし、右側2枚の画像が縦方向に並ぶようにした
- `js/usage-device-layout.js` を追加し、右側画像2枚の間隔が足りない場合は余白を補うようにした
- 余白は最大 `30px` に制限し、余りが大きい場合は上側画像の上に `margin-top` として逃がすようにした

## インシデント

- 右側画像の間隔を動的に調整する途中で、余白を再計測のたびに足し続ける状態になり、上側の隙間が広がり続けた
- 原因は、計測前に動的に入れた `margin-top` を消さずに高さを再計算していたことだった

## 対応

- `usage-device-layout.js` の計測前に `clearSpacing()` を呼び、前回の動的余白を毎回消してから再計算するようにした
- `SP` では動的配分を行わず、`PC` と `タブレット` のみで右側画像の間隔制御を行うようにした

## 注意点

- 高さを測って余白を配分するJSは、再計測前に必ず動的スタイルを初期化する
- 画像の差し替えは `picture` で行い、ページ幅条件ごとの切り替え先をHTML側に明示する
- `usage-device` の細かい調整は他ページと混ぜず、このファイルで追う
