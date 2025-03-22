// メモ化された今日の日付を返す
let cachedToday: Date | null = null

export function getToday(): Date {
  if (!cachedToday) {
    cachedToday = new Date()
  }

  return cachedToday
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}
