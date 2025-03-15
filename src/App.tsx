import { useState } from 'react'

function App() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Generate all dates from Jan 1 to Dec 31 for the selected year
  const generateDates = (year: number) => {
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
  
  const allDates = generateDates(selectedYear);

  // Function to format date in Japanese style (M月D日)
  const formatDateJP = (date: Date) => {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };
  
  // Group dates by weeks starting from Monday
  const groupDatesByWeek = (dates: Date[]) => {
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
  
  const weeklyDates = groupDatesByWeek(allDates);
  
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">シリアルカレンダー {selectedYear}年</h1>
      
      <div className="flex items-center justify-center gap-4 my-6">
        <button 
          onClick={() => setSelectedYear(selectedYear - 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
        >
          前年
        </button>
        <span className="text-xl font-medium">{selectedYear}年</span>
        <button 
          onClick={() => setSelectedYear(selectedYear + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
        >
          次年
        </button>
      </div>
      
      <div className="flex flex-col gap-3">
        {weeklyDates.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-2">
            {week.map((date, dateIndex) => {
              // Calculate the overall index for the serial number
              const overallIndex = weeklyDates
                .slice(0, weekIndex)
                .reduce((acc, w) => acc + w.length, 0) + dateIndex;
              
              // 曜日によって色を変える
              const dayOfWeek = date.getDay();
              const isSunday = dayOfWeek === 0;
              const isSaturday = dayOfWeek === 6;
              
              return (
                <div 
                  key={`date-${overallIndex}`} 
                  className={`border rounded-md p-2 flex items-center gap-2 ${
                    isSunday ? 'bg-red-50 border-red-200' : 
                    isSaturday ? 'bg-blue-50 border-blue-200' : 
                    'bg-white border-gray-200'
                  }`}
                >
                  <span className="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                    {overallIndex + 1}
                  </span>
                  <span className={`text-sm ${
                    isSunday ? 'text-red-600' : 
                    isSaturday ? 'text-blue-600' : 
                    'text-gray-700'
                  }`}>
                    {formatDateJP(date)}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
