# Serial Calendar - Claude 機能開発メモ

## コマンド

- テスト実行: `pnpm test`
- 型チェック: `pnpm lint:tsc`

## 機能追加

### カレンダー表示モード切替機能
- 設定に `displayMode` プロパティを追加：`'monthly'` または `'continuous'`
- 月表示モードでは月が変わる時に改行する
- `groupDatesByWeekContinuous` と `groupDatesByWeekMonthly` で実装
- 月表示モードでは月初めのセルの背景色を変えない
- Storybook をそれぞれの表示モードで確認できるよう更新