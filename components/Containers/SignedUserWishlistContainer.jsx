"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import ProductContainer from "components/Containers/ProductContainer";
import { UseFetcher } from "components/Functions/UseFetcher";
import { IsSignedInStore } from "utils/IsSignedIn";
import { useTranslations } from "next-intl";

export default function SignedUserWishlistContainer() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const t = useTranslations("Pages");

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:3001/users/fetch/` + currentUserObject?.user?.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="" />;

  const { wishlist } = data;

  return (
    <div className="flex flex-col gap-4">
      {wishlist === null ? (
        <p>{t("signedUserWishlistText")}</p>
      ) : (
        <>
          <div className="products-grid">
            {wishlist?.productsArray?.map((item) => {
              return <ProductContainer key={item.id} productData={item} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}
