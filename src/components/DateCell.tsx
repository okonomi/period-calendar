// 型定義
export type Props = {
  date: Date;
};

// 日付表示用のコンポーネント
export const DateCell: React.FC<Props> = ({ date }) => {
  return (
    <div className="p-2 rounded bg-white">
      <div className="text-center text-black">
        {date.getMonth() + 1}/{date.getDate()}
      </div>
    </div>
  );
};
