"use client";

import ShoppingCart from "./ShoppingCart";
import { IsSignedInStore } from "utils/IsSignedIn";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useTranslations } from "next-intl";

export default function ShoppingCartPlaceholder() {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);
  const t = useTranslations("SignedUserOrderPage");

  return (
    <div className="flex flex-col items-center">
      {isSignedIn === true ? (
        <ShoppingCart />
      ) : (
        <HiOutlineShoppingCart className="h-6 w-6" />
      )}
      <p className="hidden lg:block">{t("shoppingCart")}</p>
    </div>
  );
}
