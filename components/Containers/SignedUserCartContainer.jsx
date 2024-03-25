"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import PostOrder from "components/Containers/PostOrder";
import CartProductContainer from "components/Containers/CartProductContainer";
import { UseFetcher } from "components/Functions/UseFetcher";
import { IsSignedInStore } from "utils/IsSignedIn";
import { CiImageOn } from "react-icons/ci";
import { useTranslations } from "next-intl";

export default function SignedUserCartContainer() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const t = useTranslations("Pages");
  const tt = useTranslations("Product");

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:3001/users/fetch/` + currentUserObject?.user?.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  const { shoppingCart } = data;

  let totalSum = 0;

  shoppingCart?.productsList?.forEach((product) => {
    const quantity = parseFloat(product.quantity);
    const sellPrice = parseFloat(product.product.sellPrice);
    const productTotal = quantity * sellPrice;
    totalSum += productTotal;
  });

  return (
    <div className="flex flex-col gap-2">
      {shoppingCart?.productsList.length <= 0 ? (
        <p className="mt-4">{t("signedUserShoppingCartText")}</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <div className="bg-gallery border border-gallery-200 rounded-md shadow-md flex-row-center flex gap-4 font-bold px-2 md:px-4 h-10">
              <div className="center w-20">
                <CiImageOn className="h-6 w-6" />
              </div>
              <p>{tt("productTitle")}</p>
              <div className="hidden md:flex md:flex-row md:gap-4 md:ml-auto">
                <p className="text-center w-24">{tt("productSellPrice")}</p>
                <p className="text-center w-24">{tt("productQuantity")}</p>
                <p className="text-center w-24">{tt("productsSum")}</p>
              </div>
              <div className="text-center ml-auto md:ml-0 w-12">X</div>
            </div>
            {shoppingCart?.productsList?.map((cartItem) => (
              <CartProductContainer
                key={cartItem.id}
                userId={currentUserObject?.user?.id}
                shoppingCartItemId={cartItem.id}
                shoppingCartId={shoppingCart.id}
                productData={cartItem.product}
                quantity={cartItem.quantity}
              />
            ))}
          </div>
          <div className="bg-gallery border rounded-md shadow-md center text-lg ml-auto px-4 h-14 w-fit">
            {tt("productsSum")} :<p className="font-bold ml-2">{totalSum} m.</p>
          </div>
          <PostOrder
            customerData={currentUserObject?.user}
            shoppingCartData={shoppingCart}
          />
        </>
      )}
    </div>
  );
}
