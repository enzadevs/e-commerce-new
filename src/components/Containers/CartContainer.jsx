"use client";

import useSWR from "swr";
import PostOrder from "@/components/Containers/PostOrder";
import ErrorBlock from "@/components/Functions/ErrorBlock";
import LoadingBlock from "@/components/Functions/LoadingBlock";
import CartProductContainer from "@/components/Containers/CartProductContainer";
import { baseUrlApi } from "@/utils/Utils";
import { IsSignedInStore } from "@/utils/IsSignedIn";
import { CiImageOn } from "react-icons/ci";
import { useScopedI18n } from "@/locales/client";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CartContainer() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const scopedT = useScopedI18n("Pages");
  const scopedTT = useScopedI18n("Product");
  const scopedTTT = useScopedI18n("Order");

  const { data, isLoading, error, mutate } = useSWR(
    `${baseUrlApi}/user/fetch/details/` + currentUserObject?.user?.id,
    fetcher
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  const { ShoppingCart } = data;

  let totalSum = 0;

  ShoppingCart?.ProductsList?.forEach((product) => {
    const quantity = parseFloat(product.quantity);
    const sellPrice = parseFloat(product.Product.sellPrice);
    const productTotal = quantity * sellPrice;
    totalSum += productTotal;
  });
  const sortedProductsList = ShoppingCart?.ProductsList?.slice().sort(
    (a, b) => a.id - b.id
  );

  return (
    <div className="flex flex-col gap-2">
      {ShoppingCart?.ProductsList?.length <= 0 ? (
        <p className="mt-4">{scopedT("signedUserShoppingCartText")}</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <div className="bg-gallery border border-gallery-200 rounded-md shadow-md flex-row-center flex gap-4 font-bold px-2 md:px-4 h-10">
              <div className="center w-20">
                <CiImageOn className="h-6 w-6" />
              </div>
              <p>{scopedTT("productTitle")}</p>
              <div className="hidden md:flex md:flex-row md:gap-4 md:ml-auto">
                <p className="text-center w-24">
                  {scopedTT("productSellPrice")}
                </p>
                <p className="text-center w-24">
                  {scopedTT("productQuantity")}
                </p>
                <p className="text-center w-24">{scopedTT("productsSum")}</p>
              </div>
              <div className="text-center ml-auto md:ml-0 w-10">X</div>
            </div>
            {sortedProductsList.map((cartItem) => (
              <CartProductContainer
                key={cartItem?.id}
                userId={currentUserObject?.user?.id}
                shoppingCartItemId={cartItem.id}
                shoppingCartId={ShoppingCart?.id}
                productData={cartItem?.Product}
                quantity={cartItem?.quantity}
                mutate={mutate}
              />
            ))}
          </div>
          <div className="bg-gallery border rounded-md shadow-md flex flex-col ml-auto px-4 h-fit w-fit">
            <p className="flex items-center justify-end font-bold h-10">
              {scopedTT("productsSum")} : {totalSum} m.
            </p>
            <p className="flex items-center justify-end font-bold ml-2 h-10">
              {totalSum >= 250 ? (
                <>{scopedTTT("orderIsFree")}</>
              ) : (
                <>{scopedTTT("orderPrice")}</>
              )}
            </p>
          </div>
          <PostOrder
            customerData={currentUserObject?.user}
            shoppingCartData={ShoppingCart}
          />
        </>
      )}
    </div>
  );
}
