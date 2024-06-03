"use client";

import ErrorBlock from "@/components/Functions/ErrorBlock";
import LoadingBlock from "@/components/Functions/LoadingBlock";
import ProductContainer from "@/components/Containers/ProductContainer";
import { baseUrlApi } from "@/utils/Utils";
import { usePathname } from "next/navigation";
import { UseFetcher } from "@/components/Functions/UseFetcher";
import { useScopedI18n } from "@/locales/client";

export default function CategoryProductsPage({ params }) {
  const pathname = usePathname();
  const scopedT = useScopedI18n("Product");

  const { data, isLoading, error } = UseFetcher(
    `${baseUrlApi}/management/subcategories/fetch/single/` + params.id
  );

  if (isLoading) return <LoadingBlock height={"h-72"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-72"} width="" />;

  const useTmTitles = pathname.includes("/tm");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        {useTmTitles ? data?.result?.nameTm : data.result?.nameRu}
      </h2>
      <div className="products-grid">
        {data?.result?.Products?.map((item) => (
          <ProductContainer
            key={item.id}
            productData={item}
            addToCart={scopedT("addToCart")}
          />
        ))}
      </div>
    </div>
  );
}
