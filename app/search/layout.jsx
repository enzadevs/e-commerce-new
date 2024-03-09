export const metadata = {
  title: "Поиск товаров",
};

export default function SearchLayout({ children }) {
  return (
    <div className="px-3 md:px-0 max-width">
      <div className="bg-white rounded-3xl shadow-md mt-4 p-4">{children}</div>
    </div>
  );
}
