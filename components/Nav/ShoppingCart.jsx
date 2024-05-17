"use client";

import ErrorBlock from "components/Functions/ErrorBlock";
import { baseUrlApi } from "utils/Utils.jsx";
import { IsSignedInStore } from "utils/IsSignedIn";
import { UseFetcher } from "components/Functions/UseFetcher";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function ShoppingCart() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);

  const { data, isLoading, error } = UseFetcher(
    `${baseUrlApi}/user/fetch/details/` + currentUserObject?.user?.id
  );

  if (isLoading) {
    return (
      <div className="center">
        <HiOutlineShoppingCart className="h-6 w-6" />
      </div>
    );
  }
  if (error) return <ErrorBlock height={"h-6"} width="w-6" />;

  const { ShoppingCart } = data;

  let totalSum = 0;

  ShoppingCart?.ProductsList?.forEach((product) => {
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
        <div className="center font-bold h-6 w-fit">{totalSum}m</div>
      )}
    </div>
  );
}
