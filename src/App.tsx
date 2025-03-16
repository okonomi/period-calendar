import { useState } from "react"
import { Calendar } from "./components/Calendar"
import { YearSelector } from "./components/YearSelector"
import { generateDates } from "./utils/dateUtils"

// メインアプリケーションコンポーネント
export const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const allDates = generateDates(selectedYear, 1, selectedYear, 12)

  const handlePrevYear = () => setSelectedYear(selectedYear - 1)
  const handleNextYear = () => setSelectedYear(selectedYear + 1)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 py-6">
        <div className="max-w-2xl mx-auto">
          <YearSelector year={selectedYear} onPrevYear={handlePrevYear} onNextYear={handleNextYear} />
          <Calendar dates={allDates} />
        </div>
      </div>
    </div>
  )
}
