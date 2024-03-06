export const metadata = {
  title: "Мой профиль",
};

export default async function CartLayout({ children }) {
  return (
    <div className="px-3 md:px-0 max-width">
      <h2 className="text-lg font-bold">Корзина</h2>
      {children}
    </div>
  );
}
