"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import ProductContainer from "components/Containers/ProductContainer";
import { UseFetcher } from "components/Functions/UseFetcher";
import { usePathname } from "next/navigation.js";

export default function CategoryProductsPage({ params }) {
  const pathname = usePathname();

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:3001/manage/subcategories/fetch/` + params.id
  );

  if (isLoading) return <LoadingBlock height={"h-72"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-72"} width="" />;

  const useTmTitles = pathname.includes("/tm");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        {useTmTitles ? data.titleTm : data.titleRu}
      </h2>
      <div className="products-grid">
        {data?.products?.map((item) => (
          <ProductContainer key={item.id} productData={item} />
        ))}
      </div>
    </div>
  );
}
