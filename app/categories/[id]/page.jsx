"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import ProductContainer from "components/Containers/ProductContainer";
import { UseFetcher } from "components/Functions/UseFetcher";

export default function CategoryProductsPage({ params }) {
  const { data, isLoading, error } = UseFetcher(
    `http://localhost:5000/manage/category/fetch/` + params.id
  );

  if (isLoading) return <LoadingBlock height={"h-72"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-72"} width="" />;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">{data.title}</h2>
      <div className="products-grid">
        {data.products?.map((item) => (
          <ProductContainer key={item.id} productData={item} />
        ))}
      </div>
    </div>
  );
}
