// 指定された年の全日付を生成
export function generateDates(year: number): Date[] {
  const dates = [];
  for (let month = 0; month < 12; month++) {
    // JavaScript months are 0-indexed (0 = January, 11 = December)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      dates.push(date);
    }
  }
  return dates;
}

// 日付を日本語形式でフォーマット (M月D日)
export function formatDateJP(date: Date): string {
  return `${date.getDate()}`;
}

const DAYS_IN_WEEK = 7;

// 日付を週ごとにグループ化
export function groupDatesByWeek(dates: Date[]): (Date | null)[][] {
  if (dates.length === 0) return [];
  
  // 最初の週に必要なパディングを計算（月曜始まり）
  const firstDate = dates[0];
  const firstDayOfWeek = firstDate.getDay();
  // 日曜日は0なので6に、それ以外は-1して前の週の月曜からの日数を計算
  const startPadding = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  
  // 最後の週に必要なパディングを計算（月曜始まり）
  const lastDate = dates[dates.length - 1];
  const lastDayOfWeek = lastDate.getDay();
  // 日曜日は0なので6に、それ以外は7から引いて次の週の日曜までの日数を計算
  const endPadding = DAYS_IN_WEEK - (lastDayOfWeek === 0 ? 7 : lastDayOfWeek);
  
  // 前後にパディングを追加
  const paddedDates = [
    ...Array(startPadding).fill(null),
    ...dates,
    ...Array(endPadding).fill(null)
  ];
  
  // 7日ずつグループ化
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < paddedDates.length; i += DAYS_IN_WEEK) {
    weeks.push(paddedDates.slice(i, i + DAYS_IN_WEEK));
  }
  return weeks;
}
