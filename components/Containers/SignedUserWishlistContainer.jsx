"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import ProductContainer from "components/Containers/ProductContainer";
import { baseUrlApi } from "utils/Utils";
import { useTranslations } from "next-intl";
import { IsSignedInStore } from "utils/IsSignedIn";
import { UseFetcher } from "components/Functions/UseFetcher";

export default function SignedUserWishlistContainer() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const t = useTranslations("Pages");

  const {
    data: response,
    isLoading,
    error,
  } = UseFetcher(
    `${baseUrlApi}/user/fetch/wishlist/` + currentUserObject?.user?.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="" />;

  return (
    <div className="flex flex-col gap-4">
      {response.wishlistProducts.length > 0 ? (
        <div className="products-grid">
          {response?.wishlistProducts?.map((item) => (
            <ProductContainer key={Math.random()} productData={item} />
          ))}
        </div>
      ) : (
        <>{t("signedUserWishlistText")}</>
      )}
    </div>
  );
}
