import { useEffect, useState } from "react"
import { Calendar } from "./components/Calendar"
import { PeriodSelector } from "./components/PeriodSelector"
import { ReloadButton } from "./components/ReloadButton"
import { SettingsDialog } from "./components/SettingsDialog"
import { type CalendarDate, getToday } from "./domain/CalendarDate"
import { generateDates } from "./domain/Dates"
import type { PeriodRange } from "./domain/Period"
import { calculatePeriodFromDate, getFirstHalfPeriodRange, getSecondHalfPeriodRange } from "./domain/Period"
import { useSettings } from "./hooks/use-settings"
import { HolidaysProvider } from "./providers/HolidaysProvider"
import { SettingsProvider } from "./providers/SettingsProvider"

function generateDatesFromPeriodRange(periodRange: PeriodRange): CalendarDate[] {
  return generateDates(periodRange.start, periodRange.end)
}

// アプリケーションのメインコンテンツ
const AppContent: React.FC = () => {
  const { settings } = useSettings()
  const firstPeriodYearMonth = settings.firstPeriodStart
  const [selectedPeriod, setSelectedPeriod] = useState(() => calculatePeriodFromDate(getToday(), firstPeriodYearMonth))

  const firstHalfDates = generateDatesFromPeriodRange(getFirstHalfPeriodRange(selectedPeriod, firstPeriodYearMonth))
  const secondHalfDates = generateDatesFromPeriodRange(getSecondHalfPeriodRange(selectedPeriod, firstPeriodYearMonth))

  // 両方の期間を合わせた日付配列（ひとまとめ表示用）
  const allDates = [...firstHalfDates, ...secondHalfDates]

  const handlePrevPeriod = () => setSelectedPeriod(selectedPeriod - 1)
  const handleNextPeriod = () => setSelectedPeriod(selectedPeriod + 1)

  // ページを再読み込みする関数
  const handleReload = () => {
    window.location.reload()
  }

  // 今日の日付へスクロールする
  useEffect(() => {
    // DOM更新後に処理を実行するため、少し遅延を入れる
    const scrollTimeout = setTimeout(() => {
      const todayCell = document.querySelector('[data-today="true"]')
      if (todayCell) {
        todayCell.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }, 500)

    return () => clearTimeout(scrollTimeout)
  }, [])

  return (
    <HolidaysProvider period={selectedPeriod}>
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー部分 - 固定表示 */}
        <header className="sticky top-0 z-10 bg-gray-50 shadow-sm">
          <div className="mx-auto p-2">
            <div className="mx-auto max-w-5xl">
              <div className="flex justify-center">
                <div className="flex w-full max-w-2xl items-center justify-between px-1 sm:px-2">
                  <div className="flex w-12 place-content-center">
                    <ReloadButton onClick={handleReload} />
                  </div>
                  <div className="grow px-1 sm:px-2">
                    <PeriodSelector
                      period={selectedPeriod}
                      onPrevPeriod={handlePrevPeriod}
                      onNextPeriod={handleNextPeriod}
                    />
                  </div>
                  <div className="flex w-12 place-content-center">
                    <SettingsDialog />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="mx-auto p-2">
          <div className="mx-auto max-w-5xl">
            {settings.periodSplitMode === "split" ? (
              // 分割表示モード（前期・後期を別々に表示）
              <div className="flex flex-col place-content-center gap-4 sm:flex-row sm:gap-8">
                <div className="mx-auto w-full max-w-[338px] sm:mx-0">
                  <Calendar dates={firstHalfDates} displayMode={settings.monthLayoutMode} />
                </div>
                <div className="mx-auto w-full max-w-[338px] sm:mx-0">
                  <Calendar dates={secondHalfDates} displayMode={settings.monthLayoutMode} />
                </div>
              </div>
            ) : (
              // ひとまとめ表示モード（前期・後期を連続して表示）
              <div className="flex place-content-center">
                <div className="mx-auto w-full max-w-[338px] sm:mx-0">
                  <Calendar dates={allDates} displayMode={settings.monthLayoutMode} />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </HolidaysProvider>
  )
}

// メインアプリケーションコンポーネント
export const App: React.FC = () => {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  )
}
