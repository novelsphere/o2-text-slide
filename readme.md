# o2-text-slide

[![Build Status](https://travis-ci.org/novelsphere/o2-text-slide.svg?branch=master)](https://travis-ci.org/novelsphere/o2-text-slide)

- Add slide and fade in animation to message.
- Used in [森川空のルール](http://novelsphere.jp/ns00000001)

- 文字をスライドしながらフェイドで表示するプラグイン
- [森川空のルール](http://novelsphere.jp/ns00000001)で使われてる

## Usage 使い方

- Download `text-slide.js`

- Move the file to your project's plugin folder

- Add this to the beginning of your `first.ks`
  ```
  [o2_loadplugin module="text-slide.js"]
  ```

- Enable the effect like this
  ```
  [position layer=message0 page=fore slide=true]
  ```
  - All texts displayed on the layer will the animated effect

------

- `text-slide.js` をダウンロード

- ファイルをプロジェクトの plugin フォルダーに移動

- `first.ks` の最初にこれを追加

  ```
  [o2_loadplugin module="text-slide.js"]
  ```

- こういう風にエフェクトを有効にする

  ```
  [position layer=message0 page=fore slide=true]
  ```
  - このタグの後の文字はスライドエフェクトがついてます

------

### Tag Reference タグリファレンス

#### New attributes for position

- `slide`
  - true | false
  - Enable slide effect for the layer
  - スライドエフェックトを有効にする
- `slideoffsetx`
  - int
  - The x offset of text animation
  - どのくらい横に移動するのか
- `slideoffsety`
  - The y offset of text animation
  - どのくらい縦移動するのか
- `slideduration`
  - The duration of slide
  - スライド時間の長さ
- `slidefadeduration`
  - The duration of fade
  - フェイド時間の長さ