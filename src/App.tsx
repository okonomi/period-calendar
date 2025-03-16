import { useState } from "react"
import { Calendar } from "./components/Calendar"
import { YearSelector } from "./components/YearSelector"
import { generateDates } from "./utils/dateUtils"

// メインアプリケーションコンポーネント
export const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  // 前半6か月（8月から1月）のデータ
  const firstHalfDates = generateDates(selectedYear, 8, selectedYear + 1, 1)
  // 後半6か月（2月から7月）のデータ
  const secondHalfDates = generateDates(selectedYear + 1, 2, selectedYear + 1, 7)

  const handlePrevYear = () => setSelectedYear(selectedYear - 1)
  const handleNextYear = () => setSelectedYear(selectedYear + 1)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 py-6">
        <div className="max-w-2xl mx-auto">
          <YearSelector year={selectedYear} onPrevYear={handlePrevYear} onNextYear={handleNextYear} />
          <Calendar dates={firstHalfDates} />
          <div className="mt-8">
            <Calendar dates={secondHalfDates} />
          </div>
        </div>
      </div>
    </div>
  )
}
