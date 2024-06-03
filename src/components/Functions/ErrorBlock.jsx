export default function ErrorBlock({ height, width }) {
  return (
    <div
      className={`bg-red-200 border border-red-500 rounded-md font-bold text-red-500 center ${height} ${width}`}
    >
      Вышла ошибка !
    </div>
  );
}
