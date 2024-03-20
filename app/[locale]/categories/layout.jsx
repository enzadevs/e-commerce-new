export default function CategoriesLayout({ children }) {
  return (
    <div className="px-2 md:px-0 max-width">
      <div className="bg-white rounded-md shadow-md my-4 p-2">{children}</div>
    </div>
  );
}
