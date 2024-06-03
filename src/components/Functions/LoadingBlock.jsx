export default function LoadingBlock({ height, width }) {
  return (
    <div
      className={`bg-white animate-pulse shadow-md rounded-md center ${height} ${width}`}
    >
      Загрузка...
    </div>
  );
}
