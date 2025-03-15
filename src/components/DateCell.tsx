// 型定義
interface DateCellProps {
  date: Date;
}

// 日付表示用のコンポーネント
export const DateCell: React.FC<DateCellProps> = ({ date }) => {
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isSaturday = dayOfWeek === 6;
  const isSunday = dayOfWeek === 0;

  return (
    <div
      className={`
        h-8 px-1 border-b border-gray-100
        flex items-center justify-center
        text-xs
        ${isSaturday ? 'text-blue-600' : ''}
        ${isSunday ? 'text-red-600' : ''}
        ${!isWeekend ? 'text-gray-700' : ''}
        hover:bg-gray-50 transition-colors duration-200
      `}
    >
      {date.getDate()}
    </div>
  );
};
