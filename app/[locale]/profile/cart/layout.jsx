export const metadata = {
  title: "Моя корзина",
};

export default function CartLayout({ children }) {
  return (
    <div className="px-3 md:px-0 max-width">
      <h2 className="text-lg font-bold">Корзина</h2>
      {children}
    </div>
  );
}
