import { Link } from "../../navigation.js";
import { baseUrlApi } from "utils/Utils.jsx";
import CategoryName from "./CategoryName.jsx";
import ProductContainer from "./ProductContainer";

export default async function AsyncProductsFromCategories({ text }) {
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
                    <ProductContainer key={product.id} productData={product} />
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
