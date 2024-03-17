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
    `http://localhost:3001/users/fetch/` + currentUserObject?.user?.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  const { shoppingCart } = data;

  return (
    <div className="flex flex-col gap-4 mt-4">
      {shoppingCart ? (
        shoppingCart.productsList?.length > 0 ? (
          <>
            {shoppingCart?.productsList?.map((cartItem) => (
              <CartProductContainer
                key={cartItem.id}
                customerId={currentUserObject?.user?.id}
                productData={cartItem.product}
                quantity={cartItem.quantity}
              />
            ))}
            <PostOrder
              customerId={currentUserObject?.user?.id}
              shoppingCartData={shoppingCart}
            />
          </>
        ) : (
          <p>Добавьте продукты В Корзину и они появятся тут.</p>
        )
      ) : (
        <p>
          Пожалуйста создайте или войдите в аккаунт чтобы добавлять сюда
          продуты.
        </p>
      )}
    </div>
  );
}
