import { baseUrlApi } from "utils/Utils.jsx";
import { Link } from "../../navigation.js";
import ProductContainer from "./ProductContainer";

export default async function AsyncProductsFromCategories({ text }) {
  const response = await fetch(`${baseUrlApi}/shop/products/fetch/client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      limit: 40,
    }),
    cache: "no-store",
  });
  const data = await response.json();

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* {data.products?.map((item) => {
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
                  {text}
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
      })} */}
      <div className="products-grid">
        {data.products?.map((item) => {
          return <ProductContainer key={item.id} productData={item} />;
        })}
      </div>
    </div>
  );
}
