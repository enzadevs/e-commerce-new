"use client";

import ErrorBlock from "components/Functions/ErrorBlock";
import { IsSignedInStore } from "utils/IsSignedIn";
import { UseFetcher } from "components/Functions/UseFetcher";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function ShoppingCart() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const { data, isLoading, error } = UseFetcher(
    `http://localhost:3001/users/fetch/` + currentUserObject?.user?.id
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <HiOutlineShoppingCart className="h-6 w-6 md:icons" />
        <p className="text-sm hidden lg:block">Корзина</p>
      </div>
    );
  }
  if (error) return <ErrorBlock height={"h-20 lg:h-[280px]"} width="w-48" />;

  const { shoppingCart } = data;

  let totalSum = 0;

  shoppingCart?.productsList?.forEach((product) => {
    const quantity = parseFloat(product.quantity);
    const sellPrice = parseFloat(product.product.sellPrice);
    const productTotal = quantity * sellPrice;
    totalSum += productTotal;
  });

  return (
    <div className="flex flex-col items-center">
      {totalSum === 0 ? (
        <HiOutlineShoppingCart className="h-6 w-6" />
      ) : (
        <div className="center font-bold h-6 w-fit">{totalSum} М</div>
      )}
      <p className="text-sm hidden lg:block">Корзина</p>
    </div>
  );
}
