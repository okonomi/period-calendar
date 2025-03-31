# Serial Calendar - Claude 機能開発メモ

## コマンド

### テストとリント
- テスト実行: `pnpm test`
- 全てのリントチェック: `pnpm lint`
- 型チェック: `pnpm lint:tsc`
- Prettier フォーマットチェック: `pnpm lint:prettier`
- Biome リントチェック: `pnpm lint:biome`
- 全ての自動修正: `pnpm lint-fix`
- Prettier フォーマット自動修正: `pnpm lint-fix:prettier`
- Biome リント自動修正: `pnpm lint-fix:biome`

### 生成コマンド
- 全ての生成コマンド実行: `pnpm gen`
- Storybook静的ビルド: `pnpm gen:storybook`

## 機能追加

### カレンダー表示モード切替機能
- 設定に `displayMode` プロパティを追加：`'monthly'` または `'continuous'`
- 月表示モードでは月が変わる時に改行する
- `groupDatesByWeekContinuous` と `groupDatesByWeekMonthly` で実装
- 月表示モードでは月初めのセルの背景色を変えない
- Storybook をそれぞれの表示モードで確認できるよう更新

### 実装済み機能
1. カレンダー表示モードのデフォルトを 'continuous' から 'monthly' に変更
   - `src/types/Settings.ts` のデフォルト設定を変更
   - `src/components/Calendar.tsx` と `src/components/DateCell.tsx` のデフォルトプロップも変更

2. 設定画面の表示モードの順序を変更し、「月区切り表示」を左側に配置
   - `src/components/SettingsForm.tsx` のラジオボタンの順序を入れ替え

3. Prettier と Biome の指摘を修正
   - ラベル要素を適切に div に変更
   - 非null断言 (!) を optional chaining (?.) に置き換え

4. displayMode の型定義を作成
   - `src/types/Settings.ts` に `DisplayMode` 型を追加
   - 各コンポーネントで型のインポートと使用を更新

### 主要変更ファイル
- `src/types/Settings.ts`
- `src/components/Calendar.tsx`
- `src/components/DateCell.tsx`
- `src/components/SettingsForm.tsx`
- `src/domain/Dates.test.ts`