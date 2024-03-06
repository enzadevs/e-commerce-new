import Link from "next/link";
import ProductContainer from "./ProductContainer";

export default async function AsyncProductsFromCategories() {
  const response = await fetch(
    "http://localhost:5000/manage/category/withproducts",
    { cache: "no-cache" }
  );
  const products = await response.json();

  return (
    <div className="flex flex-col gap-4 mb-4">
      {products?.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-md flex flex-col gap-4 p-3"
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
            <div className="products-grid">
              {item.products?.slice(0, 5).map((item) => (
                <ProductContainer key={item.id} productData={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
