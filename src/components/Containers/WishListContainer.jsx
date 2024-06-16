"use client";

import ErrorBlock from "@/components/Functions/ErrorBlock";
import LoadingBlock from "@/components/Functions/LoadingBlock";
import ProductContainer from "@/components/Containers/ProductContainer";
import { baseUrlApi } from "@/utils/Utils";
import { useScopedI18n } from "@/locales/client";
import { IsSignedInStore } from "@/utils/IsSignedIn";
import { UseFetcher } from "@/components/Functions/UseFetcher";

export default function WishlistContainer() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const scopedT = useScopedI18n("Pages");
  const scopedTT = useScopedI18n("Product");
  const scopedTTT = useScopedI18n("ShoppingCart");

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
            <ProductContainer
              key={item.barcode}
              productData={item}
              addToCart={scopedTT("addToCart")}
              addedToCartText={scopedTTT("addedToCart")}
              quantityChangeText={scopedTTT("quantityChange")}
            />
          ))}
        </div>
      ) : (
        <>{scopedT("signedUserWishlistText")}</>
      )}
    </div>
  );
}
