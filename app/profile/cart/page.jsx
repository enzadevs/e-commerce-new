"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import CartProductContainer from "components/Containers/CartProductContainer";
import PostOrder from "components/Containers/PostOrder";
import { UseFetcher } from "components/Functions/UseFetcher";
import { IsSignedInStore } from "utils/IsSignedIn";

export default function ShoppingCartPage() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const [counter, setCounter] = useState(0);

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:5000/users/get/` + currentUserObject?.user?.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  const { shoppingCart } = data;

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-4">
        {shoppingCart ? (
          shoppingCart.length > 0 ? (
            <>
              {shoppingCart?.map((cartItem) => (
                <CartProductContainer
                  key={cartItem.id}
                  productData={cartItem.productsList[0].product}
                  quantity={cartItem.productsList[0].quantity}
                />
              ))}
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
      {shoppingCart?.length > 0 && <PostOrder />}
    </div>
  );
}
