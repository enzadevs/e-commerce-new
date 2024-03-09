"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import ProductContainer from "components/Containers/ProductContainer";
import { UseFetcher } from "components/Functions/UseFetcher";

export default function SearchResultsPage({ params }) {
  const { data, isLoading, error } = UseFetcher(
    `http://localhost:5000/manage/utils/search/` + params.query
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  return (
    <div className="flex flex-col gap-4">
      {console.log(data)}
      {data ? (
        data.length > 0 ? (
          <>
            <h2 className="text-lg font-bold">
              Результаты по запросу {params.query}.
            </h2>
            {data.message && <p>{data.message}</p>}
            <div className="products-grid">
              {data.map((item) => (
                <ProductContainer key={item.id} productData={item} />
              ))}
            </div>
          </>
        ) : (
          <h2 className="text-lg font-bold">
            Нет продуктов, найденных по запросу {params.query}.
          </h2>
        )
      ) : (
        <p>Загрузка результатов...</p>
      )}
    </div>
  );
}
