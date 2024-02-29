"use client";

import Link from "next/link";
import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { UseFetcher } from "components/Functions/UseFetcher";
import ProductContainer from "./ProductContainer";

export default function ProductsFromCategories() {
  const {
    data: products,
    error,
    isLoading,
  } = UseFetcher(`http://localhost:5000/manage/category/withproducts`);

  if (isLoading)
    return (
      <div className="center w-full">
        <LoadingBlock height={"h-20 lg:h-[280px]"} width="w-full max-w-7xl" />
      </div>
    );
  if (error)
    return (
      <div className="center w-full">
        <ErrorBlock height={"h-20 lg:h-[280px]"} width="w-full max-w-7xl" />
      </div>
    );

  return (
    <>
      {products.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-white rounded-3xl flex flex-col gap-4 mt-4 p-3 min-h-72 "
          >
            <div className="flex-row-center justify-between">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <Link
                href={"/categories/" + item.id}
                className="nav-link sm:text-base w-fit"
              >
                Показать все
              </Link>
            </div>
            <div className="index-products-grid">
              {item.products?.map((item) => {
                return <ProductContainer key={item.id} productData={item} />;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
