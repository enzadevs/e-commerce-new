"use client";

import { useScopedI18n } from "@/locales/client";
import { IsSignedInStore } from "@/utils/IsSignedIn";
import CartContainer from "@/components/Containers/CartContainer";

export default function ShoppingCartPage({ params }) {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);
  const scopedT = useScopedI18n("Pages");

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold">{scopedT("shoppingCartTitle")}</h2>
      {isSignedIn ? <CartContainer /> : <p>{scopedT("shoppingCartText")}</p>}
    </div>
  );
}
