import { useState } from 'react'

// 日付関連のユーティリティ関数
const dateUtils = {
  // 指定された年の全日付を生成
  generateDates: (year: number): Date[] => {
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
  },

  // 日付を日本語形式でフォーマット (M月D日)
  formatDateJP: (date: Date): string => {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },

  // 日付を週ごとにグループ化
  groupDatesByWeek: (dates: Date[]): Date[][] => {
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
  }
};

// 型定義
type DateCellProps = {
  date: Date;
  serialNumber: number;
};

type YearSelectorProps = {
  year: number;
  onPrevYear: () => void;
  onNextYear: () => void;
};

// 日付表示用のコンポーネント
const DateCell = ({ date, serialNumber }: DateCellProps) => {
  const dayOfWeek = date.getDay();
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;
  
  return (
    <div 
      className={`border rounded-md p-2 flex items-center gap-2 ${
        isSunday ? 'bg-red-50 border-red-200' : 
        isSaturday ? 'bg-blue-50 border-blue-200' : 
        'bg-white border-gray-200'
      }`}
    >
      <span className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
        {serialNumber}
      </span>
      <span className={`text-sm ${
        isSunday ? 'text-red-600' : 
        isSaturday ? 'text-blue-600' : 
        'text-gray-700'
      }`}>
        {dateUtils.formatDateJP(date)}
      </span>
    </div>
  );
};

// 年選択コンポーネント
const YearSelector = ({ year, onPrevYear, onNextYear }: YearSelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <button 
        onClick={onPrevYear}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
      >
        前年
      </button>
      <span className="text-xl font-medium">{year}年</span>
      <button 
        onClick={onNextYear}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
      >
        次年
      </button>
    </div>
  );
};

// メインアプリケーションコンポーネント
function App() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const allDates = dateUtils.generateDates(selectedYear);
  const weeklyDates = dateUtils.groupDatesByWeek(allDates);
  
  const handlePrevYear = () => setSelectedYear(selectedYear - 1);
  const handleNextYear = () => setSelectedYear(selectedYear + 1);
  
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">シリアルカレンダー {selectedYear}年</h1>
      
      <YearSelector 
        year={selectedYear} 
        onPrevYear={handlePrevYear} 
        onNextYear={handleNextYear} 
      />
      
      <div className="flex flex-col gap-3">
        {weeklyDates.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-2">
            {week.map((date, dateIndex) => {
              // Calculate the overall index for the serial number
              const serialNumber = weeklyDates
                .slice(0, weekIndex)
                .reduce((acc, w) => acc + w.length, 0) + dateIndex + 1;
              
              return (
                <DateCell 
                  key={`date-${serialNumber-1}`} 
                  date={date} 
                  serialNumber={serialNumber} 
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
