import { formatDateJP } from '../utils/dateUtils';

// 型定義
export type Props = {
  date: Date;
  serialNumber: number;
};

// 日付表示用のコンポーネント
export const DateCell: React.FC<Props> = ({ date, serialNumber }) => {
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
        {formatDateJP(date)}
      </span>
    </div>
  );
};
