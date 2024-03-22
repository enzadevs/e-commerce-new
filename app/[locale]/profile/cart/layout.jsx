export const metadata = {
  title: "Моя корзина",
};

export default function CartLayout({ children }) {
  return (
    <>
      <h2 className="text-lg font-bold">Корзина</h2>
      {children}
    </>
  );
}
