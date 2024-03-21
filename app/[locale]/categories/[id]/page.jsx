"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import ProductContainer from "components/Containers/ProductContainer";
import { Link } from "../../../../navigation.js";
import { useState } from "react";
import { UseFetcher } from "components/Functions/UseFetcher";

export default function CategoryProductsPage({ params }) {
  const { data, isLoading, error } = UseFetcher(
    `http://localhost:3001/manage/categories/fetch/` + params.id
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState();

  if (isLoading) return <LoadingBlock height={"h-72"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-72"} width="" />;

  const filteredProducts =
    selectedSubcategory && selectedSubcategory !== 0
      ? data.products?.filter(
          (product) => product.categoryId === selectedSubcategory
        )
      : data.products;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">{data.titleRu}</h2>
      <div className="flex-row-center gap-4">
        {data.subCategories?.map((item) => (
          <Link
            href={`/subcategories/` + item.id}
            key={item.id}
            onClick={() => setSelectedSubcategory(item.id)}
            className="button-outline px-4"
          >
            {item.titleRu}
          </Link>
        ))}
      </div>
      <>
        {filteredProducts?.length > 0 && (
          <div className="products-grid">
            {filteredProducts?.map((item) => (
              <ProductContainer key={item.id} productData={item} />
            ))}
          </div>
        )}
        {filteredProducts?.length === 0 && (
          <p>В этой категории нет продуктов.</p>
        )}
      </>
    </div>
  );
}
