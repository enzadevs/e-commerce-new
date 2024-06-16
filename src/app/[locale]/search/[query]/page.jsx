"use client";

import ErrorBlock from "@/components/Functions/ErrorBlock";
import LoadingBlock from "@/components/Functions/LoadingBlock";
import ProductContainer from "@/components/Containers/ProductContainer";
import { baseUrlApi } from "@/utils/Utils";
import { UseFetcher } from "@/components/Functions/UseFetcher";
import { useScopedI18n } from "@/locales/client";

export default function SearchResultsPage({ params }) {
  const decodedQuery = decodeURIComponent(params.query);
  const scopedT = useScopedI18n("Pages");
  const scopedTT = useScopedI18n("Product");
  const scopedTTT = useScopedI18n("ShoppingCart");

  const { data, isLoading, error } = UseFetcher(
    `${baseUrlApi}/shop/products/search/` + params.query
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  return (
    <div className="flex flex-col gap-4">
      {data?.results?.length > 0 ? (
        <>
          <h2 className="text-lg font-bold">
            {scopedT("searchResults") + " "}
            {decodedQuery}
          </h2>
          {data.message && <p>{data.message}</p>}
          <div className="products-grid">
            {data?.results?.map((item) => (
              <ProductContainer
                key={item.id}
                productData={item}
                addToCart={scopedTT("addToCart")}
                signupAlert={scopedTT("signupAlert")}
                addedToCartText={scopedTTT("addedToCart")}
                quantityChangeText={scopedTTT("quantityChange")}
              />
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-lg font-bold">
          {scopedT("noResults")}
          {decodedQuery}
        </h2>
      )}
    </div>
  );
}
