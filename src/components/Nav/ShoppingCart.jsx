"use client";

import useSWR from "swr";
import ErrorBlock from "@/components/Functions/ErrorBlock";
import { baseUrlApi } from "@/utils/Utils";
import { IsSignedInStore } from "@/utils/IsSignedIn";
import { HiOutlineShoppingCart } from "react-icons/hi";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ShoppingCart() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);

  const { data, isLoading, error } = useSWR(
    `${baseUrlApi}/user/fetch/details/` + currentUserObject?.user?.id,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  if (isLoading) {
    return (
      <div className="center">
        <HiOutlineShoppingCart className="h-6 w-6" />
      </div>
    );
  }
  if (error) return <HiOutlineShoppingCart className="text-red-600 h-6 w-6" />;

  const { ShoppingCart } = data;

  let totalSum = 0;

  ShoppingCart?.ProductsList?.forEach((product) => {
    const quantity = parseFloat(product.quantity);
    const sellPrice = parseFloat(product.Product.sellPrice);
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
