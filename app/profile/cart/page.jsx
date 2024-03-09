"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import PostOrder from "components/Containers/PostOrder";
import CartProductContainer from "components/Containers/CartProductContainer";
import { UseFetcher } from "components/Functions/UseFetcher";
import { IsSignedInStore } from "utils/IsSignedIn";

export default function ShoppingCartPage() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:5000/users/get/` + currentUserObject?.user?.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  const { shoppingCart } = data;
  let totalSum = 0;
  shoppingCart[0]?.productsList?.forEach((product) => {
    const quantity = parseFloat(product.quantity);
    const sellPrice = parseFloat(product.product.sellPrice);
    const productTotal = quantity * sellPrice;
    totalSum += productTotal;
  });
  const products = shoppingCart[0]?.productsList?.map(
    (item) => item.product.id
  );

  return (
    <div className="flex flex-col gap-4 mt-4">
      {shoppingCart[0]?.productsList?.map((cartItem) => (
        <CartProductContainer
          key={cartItem.id}
          customerId={currentUserObject?.user?.id}
          productData={cartItem.product}
          quantity={cartItem.quantity}
        />
      ))}
      <PostOrder
        customerId={currentUserObject?.user?.id}
        shoppingCartId={shoppingCart[0].id}
        products={products}
        totalSum={totalSum}
      />
    </div>
  );
}
