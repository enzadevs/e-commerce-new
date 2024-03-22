"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import ProductViewSwiper from "components/Containers/ProductViewSwiper";
import { Link } from "../../../../navigation.js";
import { useState } from "react";
import { UseFetcher } from "components/Functions/UseFetcher";
import { SuccessToast } from "components/Functions/Toaster";
import { handleAddToCart } from "components/Functions/PostRequests";
import { IsSignedInStore } from "utils/IsSignedIn";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useTranslations } from "next-intl";

export default function ProductViewPage({ params }) {
  const [count, setCount] = useState(0);
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);
  const t = useTranslations("Product");

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
    stock,
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
            {t("brandName")}
            <p className="bg-gallery rounded-md flex-row-center px-4 h-8">
              {brand.title}
            </p>
          </div>
          <div className="info-holder">
            {t("unitType")}
            <p className="bg-gallery rounded-md flex-row-center px-4 h-8">
              {unitType.titleRu}
            </p>
          </div>
          <div className="info-holder">
            {t("available")}
            <p className="bg-gallery rounded-md flex-row-center px-4 h-8">
              {stock}
            </p>
          </div>
          <div className="info-holder">
            {t("category")}
            <Link
              href={`/categories/` + category.id}
              className="nav-link bg-gallery rounded-md center px-4 h-8"
            >
              {category.titleRu}
            </Link>
          </div>
          <div className="info-holder">
            {t("subCategory")}
            <Link
              href={`/subcategories/` + subCategory.id}
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
              <FiMinus className="h-6 w-6 nav-link" />
            </button>
            <p>{count}</p>
            <button
              onClick={() => {
                if (count < Number(stock)) {
                  setCount((current) => current + 1);
                } else {
                  SuccessToast({
                    successText: t("stockWarning"),
                  });
                }
              }}
              className="rounded-full center transition hover:bg-white h-8 w-8"
            >
              <FiPlus className="h-6 w-6 nav-link" />
            </button>
          </div>
          <button
            onClick={() => {
              if (isSignedIn === false) {
                SuccessToast({ successText: t("signupAlert") });
                return;
              }
              handleAddToCart({
                customerId: currentUserObject?.user?.id,
                productId: id,
                quantity: count,
              });
            }}
            className="button-primary justify-center px-2 w-48"
          >
            {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}
