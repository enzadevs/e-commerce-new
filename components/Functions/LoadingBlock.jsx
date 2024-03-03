export default function LoadingBlock({ height, width }) {
  return (
    <div
      className={`bg-white animate-pulse shadow-md rounded-3xl text-xs md:text-sm center ${height} ${width}`}
    >
      Загрузка...
    </div>
  );
}
