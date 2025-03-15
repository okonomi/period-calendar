import { useState } from 'react'
import { DateCell } from './components/DateCell';
import { YearSelector } from './components/YearSelector';
import { generateDates, groupDatesByWeek } from './utils/dateUtils';

// メインアプリケーションコンポーネント
export const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const allDates = generateDates(selectedYear);
  const weeklyDates = groupDatesByWeek(allDates);
  
  const handlePrevYear = () => setSelectedYear(selectedYear - 1);
  const handleNextYear = () => setSelectedYear(selectedYear + 1);
  
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans bg-white text-black">
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
