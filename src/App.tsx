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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">シリアルカレンダー {selectedYear}年</h1>
          
          <YearSelector 
            year={selectedYear} 
            onPrevYear={handlePrevYear} 
            onNextYear={handleNextYear} 
          />
          
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <div className="flex flex-row mt-4 mx-auto" style={{ width: "700px" }}>
              {/* 左カラム - 月名表示 */}
              <div className="w-[100px] flex flex-col">
                {weeklyDates.map((week, weekIndex) => {
                  const firstDayOfMonth = week.find(d => d?.getDate() === 1);
                  const month = firstDayOfMonth?.getMonth();

                  return (
                    <div key={`month-${weekIndex}`} className="h-12 flex items-center justify-center">
                      {month !== undefined && (
                        <span className="text-lg font-medium text-black">
                          {month + 1}月
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 右カラム - カレンダー本体 */}
              <div className="flex flex-col">
                {weeklyDates.map((week, weekIndex) => (
                  <div key={`week-${weekIndex}`} className="grid grid-cols-7">
                    {week.map((date, dateIndex) => {
                      if (!date) {
                        return <div key={`spacer-${weekIndex}-${dateIndex}`} className="h-12 bg-gray-50" />;
                      }
                      
                      return (
                        <DateCell 
                          key={`date-${date.getTime()}`} 
                          date={date} 
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
