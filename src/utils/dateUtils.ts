// 指定された年の全日付を生成
export const generateDates = (year: number): Date[] => {
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
};

// 日付を日本語形式でフォーマット (M月D日)
export const formatDateJP = (date: Date): string => {
  return `${date.getDate()}`;
};

// 日付を週ごとにグループ化
export const groupDatesByWeek = (dates: Date[]): Date[][] => {
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  dates.forEach((date) => {
    // Get day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let dayOfWeek = date.getDay();
    // Adjust to have Monday as 0, Sunday as 6
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    // If it's Monday (adjusted to 0) and not the first date, start a new week
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    
    currentWeek.push(date);
    
    // If it's Sunday (adjusted to 6), end the week
    if (dayOfWeek === 6) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });
  
  // Add any remaining dates in the last week
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  
  return weeks;
};