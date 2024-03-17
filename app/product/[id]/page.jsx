"use client";

import Link from "next/link";
import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import ProductViewSwiper from "components/Containers/ProductViewSwiper";
import { useState } from "react";
import { handleAddToCart } from "components/Functions/PostRequests";
import { UseFetcher } from "components/Functions/UseFetcher";
import { IsSignedInStore } from "utils/IsSignedIn";
import { FiPlus, FiMinus } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";

export default function ProductViewPage({ params }) {
  const [count, setCount] = useState(0);
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:3001/products/fetch/` + params.id
  );

  if (isLoading) return <LoadingBlock height={"h-72"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-72"} width="" />;

  const {
    id,
    titleRu,
    sellPrice,
    description,
    images,
    brand,
    unitType,
    category,
    subCategory,
  } = data;

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="rounded-md md:flex-[50%] md:max-w-[50%] w-full">
        <ProductViewSwiper images={images} />
      </div>
      <div className="flex flex-col gap-2 md:text-base md:flex-[50%] md:max-w-[50%] w-full">
        <h2 className="text-lg font-bold">{titleRu}</h2>
        <p>{description}</p>
        <div className="flex flex-col gap-2">
          <div className="info-holder">
            Бренд :
            <p className="bg-gallery rounded-md flex-row-center px-4 h-8">
              {brand.title}
            </p>
          </div>
          <div className="info-holder">
            Ед. измерения :
            <p className="bg-gallery rounded-md flex-row-center px-4 h-8">
              {unitType.titleRu}
            </p>
          </div>
          <div className="info-holder">
            Категория :
            <Link
              href={`/category/` + category.id}
              className="nav-link bg-gallery rounded-md center px-4 h-8"
            >
              {category.titleRu}
            </Link>
          </div>
          <div className="info-holder">
            Под категория :
            <Link
              href={`/subcategory/` + subCategory.id}
              className="bg-gallery rounded-md center px-4 h-8"
            >
              {subCategory.titleRu}
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-2 sm:text-base mt-4">
          <p className="bg-gallery-100 rounded-md font-bold center h-10 w-48">
            {sellPrice} М
          </p>
          <div className="bg-gallery-100 rounded-md flex-row-center justify-between px-4 h-10 w-48">
            <button
              onClick={() => setCount((current) => Math.max(current - 1, 0))}
              className="rounded-full center transition hover:bg-white h-8 w-8"
            >
              <FiMinus className="icons nav-link" />
            </button>
            <p>{count}</p>
            <button
              onClick={() => setCount((current) => current + 1)}
              className="rounded-full center transition hover:bg-white h-8 w-8"
            >
              <FiPlus className="icons nav-link" />
            </button>
          </div>
          <button
            onClick={() => {
              handleAddToCart({
                customerId: currentUserObject?.user?.id,
                productId: id,
                quantity: count,
              });
            }}
            className="button-primary justify-center px-2 w-48"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
