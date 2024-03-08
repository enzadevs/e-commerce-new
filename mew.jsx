"use client";

import useSWR from "swr";
import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import CartProductContainer from "components/Containers/CartProductContainer";
import PostOrder from "components/Containers/PostOrder";
// import { UseFetcher } from "components/Functions/UseFetcher";
import { IsSignedInStore } from "utils/IsSignedIn";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ShoppingCartPage() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);

  // const { data, isLoading, error } = UseFetcher(
  //   `http://localhost:5000/users/get/` + currentUserObject?.user?.id
  // );

  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/users/get/` + currentUserObject?.user?.id,
    fetcher,
    {
      refreshInterval: 2500,
    }
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  const { shoppingCart } = data;

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-4">
        {shoppingCart[0] ? (
          shoppingCart[0]?.productsList?.length > 0 ? (
            <>
              {shoppingCart[0]?.productsList?.map((item) => {
                // return <div key={item.id}>{item.quantity}</div>;
                <CartProductContainer
                  productData={item.product}
                  quantity={item.quantity}
                />;
              })}
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
      {console.log(currentUserObject.user.id)}
    </div>
  );
}
