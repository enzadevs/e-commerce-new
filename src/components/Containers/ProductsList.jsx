import Link from "next/link.js";
import { baseUrlApi } from "@/utils/Utils";
import { getScopedI18n } from "@/locales/server";
import CategoryName from "./CategoryName";
import ProductContainer from "./ProductContainer";

export default async function ProductsList({ text, params }) {
  const scopedT = await getScopedI18n("Product");

  try {
    const response = await fetch(
      `${baseUrlApi}/management/categories/fetch/withproducts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: 1,
          limit: 20,
        }),
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    const categories = data?.categories;

    return (
      <div className="flex flex-col gap-4 mb-4 h-full">
        {categories.map((category) => {
          if (category.Products.length > 0) {
            return (
              <div
                key={category.id}
                className="bg-white rounded-md shadow-md flex flex-col gap-4 p-2"
              >
                <div className="flex-row-center justify-between">
                  <CategoryName
                    nameTm={category.nameTm}
                    nameRu={category.nameRu}
                  />
                  <Link
                    href={"/categories/" + category.id}
                    className="nav-link w-fit"
                  >
                    {text}
                  </Link>
                </div>
                <div className="products-grid">
                  {category.Products?.slice(0, 5).map((product) => (
                    <ProductContainer
                      key={product.id}
                      productData={product}
                      addToCart={scopedT("addToCart")}
                      signupAlert={scopedT("signupAlert")}
                    />
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
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div className="center h-full">Error while fetching data.</div>;
  }
}
