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

  const { data, isLoading, error } = UseFetcher(
    `${baseUrlApi}/user/fetch/details/` +
      currentUserObject?.user?.id +
      "/wishlist"
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="" />;

  const { wishlist } = data;

  return (
    <div className="flex flex-col gap-4">
      {wishlist?.length > 0 ? (
        <div className="products-grid">
          {wishlist?.map((item) => (
            <ProductContainer key={item.id} productData={item} />
          ))}
        </div>
      ) : (
        <>{t("signedUserWishlistText")}</>
      )}
    </div>
  );
}
