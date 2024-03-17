"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import ProductContainer from "components/Containers/ProductContainer";
import { UseFetcher } from "components/Functions/UseFetcher";
import { IsSignedInStore } from "utils/IsSignedIn";

export default function WishListPage() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:3001/users/fetch/` + currentUserObject?.user?.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="" />;

  const { wishlist } = data;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Избранные</h2>
      {wishlist ? (
        wishlist?.productsArray?.length > 0 ? (
          <div className="products-grid">
            {wishlist?.productsArray?.map((item) => {
              return <ProductContainer key={item.id} productData={item} />;
            })}
          </div>
        ) : (
          <>Добавьте продукты в Избранные и они появятся тут.</>
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
