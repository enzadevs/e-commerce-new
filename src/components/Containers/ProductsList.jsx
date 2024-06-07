import Link from "next/link";
import Image from "next/image";
import { baseUrlApi } from "@/utils/Utils";
import { getScopedI18n } from "@/locales/server";
import CategoryName from "./CategoryName";
import ProductContainer from "./ProductContainer";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default async function ProductsList({ text, params }) {
  const scopedT = await getScopedI18n("Product");

  try {
    const categoriesResponse = await fetch(
      `${baseUrlApi}/management/categories/fetch/withproducts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: 1,
          limit: 10,
        }),
        cache: "no-cache",
      }
    );

    if (!categoriesResponse.ok) {
      throw new Error(
        `Error fetching categories: ${categoriesResponse.statusText}`
      );
    }

    const categoriesData = await categoriesResponse.json();
    const categories = categoriesData?.categories;

    const adsResponse = await fetch(`${baseUrlApi}/shop/ads/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!adsResponse.ok) {
      throw new Error(`Error fetching ads: ${adsResponse.statusText}`);
    }

    const adsData = await adsResponse.json();
    const ads = adsData?.ads;

    return (
      <div className="flex flex-col gap-4 mb-4 h-full">
        {categories.map((category, index) => {
          if (category.Products.length > 0) {
            return (
              <div key={category.id}>
                <div className="bg-white rounded-md shadow-md flex flex-col gap-4 p-2">
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
                {(index + 1) % 2 === 0 && (
                  <div className="rounded-md flex flex-col md:flex-row gap-2 md:gap-4 mt-4 px-2 md:p-0">
                    {ads && ads.length > 1 && (
                      <>
                        {shuffle(ads)
                          .slice(0, 2)
                          .map((ad, index) => (
                            <div key={index} className="relative">
                              <Image
                                className="rounded-md shadow-md"
                                src={`${baseUrlApi}/${ad.posterImage}`}
                                alt="image of current ad"
                                height={0}
                                width={0}
                                priority
                                style={{ height: "auto", width: "100%" }}
                                // fill
                                quality={80}
                                sizes="50vw"
                              ></Image>
                            </div>
                          ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } catch (error) {
    return (
      <div className="center text-red-600 text-3xl font-bold h-full">
        Error.
      </div>
    );
  }
}
