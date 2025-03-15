// 型定義
export type Props = {
  date: Date;
  serialNumber: number;
};

// 日付表示用のコンポーネント
export const DateCell: React.FC<Props> = ({ date, serialNumber }) => {
  return (
    <div className="p-2 rounded bg-white">
      <div className="text-xs text-gray-600">{serialNumber}</div>
      <div className="text-center text-black">
        {date.getMonth() + 1}/{date.getDate()}
      </div>
    </div>
  );
};
