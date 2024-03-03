import Link from "next/link";
import ProductContainer from "./ProductContainer";

export default async function AsyncProductsFromCategories() {
  const response = await fetch(
    "http://localhost:5000/manage/category/withproducts"
  );
  const products = await response.json();

  return (
    <>
      {products?.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-white rounded-3xl flex flex-col gap-4 p-3"
          >
            <div className="flex-row-center justify-between">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <Link
                href={"/categories/" + item.id}
                className="nav-link text-sm w-fit"
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
