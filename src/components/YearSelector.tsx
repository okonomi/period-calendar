export type Props = {
  year: number;
  onPrevYear: () => void;
  onNextYear: () => void;
};

export const YearSelector: React.FC<Props> = ({ year, onPrevYear, onNextYear }) => {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <button 
        onClick={onPrevYear}
        className="bg-blue-500 hover:bg-blue-600 text-black py-2 px-4 rounded transition-colors"
      >
        前年
      </button>
      <span className="text-xl font-medium text-black">{year}年</span>
      <button 
        onClick={onNextYear}
        className="bg-blue-500 hover:bg-blue-600 text-black py-2 px-4 rounded transition-colors"
      >
        次年
      </button>
    </div>
  );
};
