export default function ProductViewLayout({ children }) {
  return (
    <div className="mb-4 px-3 md:px-0 max-width">
      <div className="bg-white rounded-3xl shadow-md mt-4 p-4">{children}</div>
    </div>
  );
}
