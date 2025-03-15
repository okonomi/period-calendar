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
export const groupDatesByWeek = (dates: Date[]): (Date | null)[][] => {
  const weeks: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = [];
  
  dates.forEach((date) => {
    const dayOfWeek = date.getDay();
    
    // If it's Monday (1) and not the first date, start a new week
    if (dayOfWeek === 1 && currentWeek.length > 0) {
      // Fill remaining slots with null if needed
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    
    // Add padding at the start of the first week if needed
    if (currentWeek.length === 0 && dayOfWeek !== 1) {
      for (let i = 1; i < dayOfWeek; i++) {
        currentWeek.push(null);
      }
    }
    
    currentWeek.push(date);
    
    // If it's Sunday (0), end the week
    if (dayOfWeek === 0) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });
  
  // Add any remaining dates in the last week
  if (currentWeek.length > 0) {
    // Fill remaining slots with null
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }
  
  return weeks;
};