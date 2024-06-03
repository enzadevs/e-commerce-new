"use client";

import Link from "next/link";
import ErrorBlock from "@/components/Functions/ErrorBlock";
import LoadingBlock from "@/components/Functions/LoadingBlock";
import ProductContainer from "@/components/Containers/ProductContainer";
import { baseUrlApi } from "@/utils/Utils";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { UseFetcher } from "@/components/Functions/UseFetcher";
import { useScopedI18n } from "@/locales/client";

export default function CategoryProductsPage({ params }) {
  const pathname = usePathname();
  const useTmTitles = pathname.includes("/tm");
  const scopedT = useScopedI18n("Product");

  const { data, isLoading, error } = UseFetcher(
    `${baseUrlApi}/management/categories/fetch/single/` + params.id
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState();

  if (isLoading) return <LoadingBlock height={"h-72"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-72"} width="" />;

  const filteredProducts =
    selectedSubcategory && selectedSubcategory !== 0
      ? data.Products?.filter(
          (product) => product.categoryId === selectedSubcategory
        )
      : data.Products;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        {useTmTitles ? data.nameTm : data.nameRu}
      </h2>
      <div className="flex-row-center gap-4">
        {data.SubCategories?.map((item) => (
          <Link
            href={`/subcategories/` + item.id}
            key={item.id}
            onClick={() => setSelectedSubcategory(item.id)}
            className="button-outline px-4"
          >
            {useTmTitles ? item.nameTm : item.nameRu}
          </Link>
        ))}
      </div>
      <>
        {filteredProducts?.length > 0 && (
          <div className="products-grid">
            {filteredProducts?.map((item) => (
              <ProductContainer
                key={item.id}
                productData={item}
                addToCart={scopedT("addToCart")}
              />
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
