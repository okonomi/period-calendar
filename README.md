# Period Calendar

期（会計年度、事業年度など）に基づいたカレンダービューアアプリケーションです。通常の暦年とは異なる期間を基準にしたカレンダー管理を実現します。

## 主な機能

- 1期12ヶ月（1年間）で、上期・下期に分かれた期間ベースのカレンダー表示
- 上期カレンダーと下期カレンダーを並べて表示
- ユーザーによる1期目の開始年月設定
- 期間の切り替え（前期・来期への移動）
- 日付の特徴表示：
  - 当日（緑色でハイライト）
  - 月初日（水色でハイライト）
  - 過去の日付（薄く表示）
  - 休日（赤色で表示、ツールチップで休日名表示）

## 技術スタック

- [React](https://react.dev/) - UIライブラリ
- [TypeScript](https://www.typescriptlang.org/) - 型付きJavaScript
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング
- [Vite](https://vitejs.dev/) - ビルドツール
- [Vitest](https://vitest.dev/) - テストフレームワーク
- [Storybook](https://storybook.js.org/) - UIコンポーネント開発環境

## 必要要件

- Node.js v18以上
- pnpm v8以上

## インストール方法

```bash
# リポジトリのクローン
git clone https://github.com/okonomi/period-calendar.git
cd period-calendar

# 依存関係のインストール
pnpm install
```

## 開発方法

```bash
# 開発サーバーの起動
pnpm dev

# リント実行
pnpm lint

# リント問題の自動修正
pnpm lint-fix

# テスト実行
pnpm test

# Storybookの起動
pnpm storybook
```

## ビルド

```bash
# 本番用ビルド
pnpm build

# ビルド結果のプレビュー
pnpm preview
```

## ライセンス

[MITライセンス](LICENSE)