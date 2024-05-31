export const metadata = {
  title: "Поиск товаров",
};

export default function SearchLayout({ children }) {
  return (
    <div className="max-width">
      <div className="bg-white rounded-md shadow-md mt-4 p-4">{children}</div>
    </div>
  );
}
