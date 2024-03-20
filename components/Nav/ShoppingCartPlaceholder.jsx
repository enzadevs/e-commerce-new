"use client";

import ShoppingCart from "./ShoppingCart";
import { IsSignedInStore } from "utils/IsSignedIn";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function ShoppingCartPlaceholder() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);

  return (
    <div className="flex flex-col items-center">
      {currentUserObject ? (
        <ShoppingCart />
      ) : (
        <HiOutlineShoppingCart className="h-6 w-6" />
      )}
      <p className="hidden lg:block">Корзина</p>
    </div>
  );
}
