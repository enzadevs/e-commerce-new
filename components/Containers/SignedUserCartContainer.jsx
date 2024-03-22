"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import PostOrder from "components/Containers/PostOrder";
import CartProductContainer from "components/Containers/CartProductContainer";
import { UseFetcher } from "components/Functions/UseFetcher";
import { IsSignedInStore } from "utils/IsSignedIn";

export default function SignedUserCartContainer() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:3001/users/fetch/` + currentUserObject?.user?.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  const { shoppingCart } = data;

  return (
    <div className="flex flex-col gap-4">
      {shoppingCart?.productsList.length <= 0 ? (
        <p className="mt-4">
          Добавляйте продукты в корзину и они появятся тут.
        </p>
      ) : (
        <>
          {shoppingCart?.productsList?.map((cartItem) => (
            <CartProductContainer
              key={cartItem.id}
              userId={currentUserObject?.user?.id}
              shoppingCartItemId={cartItem.id}
              productData={cartItem.product}
              quantity={cartItem.quantity}
            />
          ))}
          <PostOrder
            customerData={currentUserObject?.user}
            shoppingCartData={shoppingCart}
          />
        </>
      )}
    </div>
  );
}
