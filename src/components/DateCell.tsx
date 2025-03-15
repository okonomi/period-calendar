import { clsx } from 'clsx';

interface DateCellProps {
  date: Date;
}

export const DateCell: React.FC<DateCellProps> = ({ date }) => {
  return (
    <div
      className={clsx(
        'h-8 px-1 border-b border-gray-100',
        'flex items-center justify-center',
        'text-xs text-gray-700',
        'hover:bg-gray-50 transition-colors duration-200'
      )}
    >
      {date.getDate()}
    </div>
  );
};
