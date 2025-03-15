// 型定義
export type Props = {
  date: Date;
};

// 日付表示用のコンポーネント
export const DateCell: React.FC<Props> = ({ date }) => {
  return (
    <div className="h-12 w-12 p-2 rounded bg-white shrink-0 flex items-center justify-center">
      <div className="text-center text-black text-2xl">
        {date.getDate()}
      </div>
    </div>
  );
};
