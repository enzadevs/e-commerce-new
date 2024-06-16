"use client";

import useSWR from "swr";
import { SuccessToast } from "./Toaster";
import { baseUrlApi } from "@/utils/Utils";
import { IsSignedInStore } from "@/utils/IsSignedIn";
import { handleAddToCart, handleQuantityChange } from "./PostRequests";
import { FiPlus, FiMinus } from "react-icons/fi";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AddToCart({
  phoneNumber,
  barcode,
  addToCart,
  isSignedIn,
  signupAlert,
  addToCartText,
  quantityChangeText,
}) {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const { data, isLoading, error, mutate } = useSWR(
    `${baseUrlApi}/user/fetch/details/` + currentUserObject?.user?.id,
    fetcher
  );

  if (isLoading) {
    return <button className="button-loading center">{addToCart}</button>;
  }
  if (error) return <p className="text-red-600 center">Error</p>;
  const productInCart = data?.ShoppingCart?.ProductsList?.some(
    (product) => product.barcode === barcode
  );
  const product = data?.ShoppingCart?.ProductsList?.find(
    (product) => product.barcode === barcode
  );
  const quantity = product?.quantity || 0;

  return (
    <>
      {productInCart ? (
        <div className="bg-blueviolet rounded-md flex-row-center justify-between text-white px-2 sm:px-8 h-10 w-full">
          <button
            onClick={() => {
              handleQuantityChange({
                shoppingCartId: Number(data?.ShoppingCart?.id),
                barcode,
                quantity: Number(quantity) - Number(1),
                quantityChangeText,
              }).then(() => mutate());
            }}
            className="button-primary-full-rounded center h-8 w-8"
          >
            <FiMinus className="h-5 w-5" />
          </button>
          <p>{quantity}</p>
          <button
            onClick={() => {
              handleQuantityChange({
                shoppingCartId: Number(data?.ShoppingCart?.id),
                barcode,
                quantity: Number(quantity) + Number(1),
                quantityChangeText,
              }).then(() => mutate());
            }}
            className="button-primary-full-rounded center h-8 w-8"
          >
            <FiPlus className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            if (isSignedIn === false) {
              SuccessToast({ successText: signupAlert });
              return;
            }
            handleAddToCart({
              phoneNumber,
              barcode,
              addToCartText,
            }).then(() => mutate());
          }}
          className="button-primary center gap-2 px-8 w-full"
        >
          {addToCart}
        </button>
      )}
    </>
  );
}
