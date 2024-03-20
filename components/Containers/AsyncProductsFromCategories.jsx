import { Link } from "../../navigation.js";
import ProductContainer from "./ProductContainer";

export default async function AsyncProductsFromCategories() {
  const response = await fetch(
    "http://localhost:3001/manage/categories/withproducts",
    { cache: "no-cache" }
  );
  const products = await response.json();

  return (
    <div className="flex flex-col gap-4 mb-4">
      {products?.map((item) => {
        if (item.products && item.products.length > 0) {
          return (
            <div
              key={item.id}
              className="bg-white rounded-md shadow-md flex flex-col gap-4 p-2"
            >
              <div className="flex-row-center justify-between">
                <h2 className="text-lg font-bold">{item.titleRu}</h2>
                <Link
                  href={"/categories/" + item.id}
                  className="nav-link w-fit"
                >
                  Показать все
                </Link>
              </div>
              <div className="products-grid">
                {item.products.slice(0, 5).map((item) => (
                  <ProductContainer key={item.id} productData={item} />
                ))}
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
