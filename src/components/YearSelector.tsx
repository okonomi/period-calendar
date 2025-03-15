interface YearSelectorProps {
  year: number;
  onPrevYear: () => void;
  onNextYear: () => void;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  year,
  onPrevYear,
  onNextYear,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={onPrevYear}
        className="px-2 py-1 rounded bg-white border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 shadow-sm"
      >
        ◀ 前年
      </button>
      <span className="text-base font-medium text-black">{year}年</span>
      <button
        onClick={onNextYear}
        className="px-2 py-1 rounded bg-white border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 shadow-sm"
      >
        翌年 ▶
      </button>
    </div>
  );
};
