import { useTranslations } from "next-intl";

export const metadata = {
  title: "Моя корзина",
};

export default function CartLayout({ children }) {
  const t = useTranslations("Pages");

  return (
    <>
      <h2 className="text-lg font-bold">{t("shoppingCartTitle")}</h2>
      {children}
    </>
  );
}
