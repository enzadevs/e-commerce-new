export default function ProductViewLayout({ children }) {
  return (
    <div className="mb-4 px-2 md:px-0 max-width">
      <div className="bg-white rounded-md shadow-md mt-4 p-4">{children}</div>
    </div>
  );
}
