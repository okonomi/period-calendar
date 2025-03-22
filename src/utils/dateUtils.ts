// メモ化された今日の日付を返す
let cachedToday: Date | null = null

export function getToday(): Date {
  if (!cachedToday) {
    cachedToday = new Date()
  }

  return cachedToday
}
