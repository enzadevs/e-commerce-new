"use client";

import Image from "next/image";
import { Link } from "../../navigation.js";
import { SuccessToast } from "components/Functions/Toaster";
import { IsSignedInStore } from "utils/IsSignedIn";
import { useState, useEffect } from "react";
import {
  handleAddToWishlist,
  handleAddToCart,
} from "components/Functions/PostRequests";
import { AiFillHeart } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation.js";
import { baseUrlApi } from "utils/Utils.jsx";

export default function ProductContainer({ productData }) {
  const { id, barcode, nameRu, sellPrice, wishlist } = productData;
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);
  const [isWished, setIsWished] = useState(false);
  const t = useTranslations("Product");
  const pathname = usePathname();

  useEffect(() => {
    if (wishlist) {
      setIsWished(
        wishlist.some((item) => item.user?.id === currentUserObject.user?.id)
      );
    } else {
      setIsWished(false);
    }
  }, [wishlist, currentUserObject]);

  const useTmTitles = pathname.includes("/tm");

  return (
    <div className="product-container">
      <div className="border-b border-gallery-200 relative">
        <div className="rounded-t-md flex-row-center absolute top-1 right-1 z-[4] w-full">
          <button
            onClick={() => {
              if (isSignedIn === false) {
                SuccessToast({ successText: t("signupAlert") });
                return;
              }
              handleAddToWishlist({
                userId: currentUserObject.user.id,
                productId: id,
              });
              setIsWished(!isWished);
            }}
            className={
              isWished
                ? "icons-wrapper text-red-500 ml-auto"
                : "icons-wrapper text-gallery-200 hover:text-red-500 ml-auto"
            }
          >
            <AiFillHeart className="h-6 w-6" />
          </button>
        </div>
        <div className="relative rounded-t-md h-40 sm:h-56">
          <Image
            src={baseUrlApi + "/images/products/" + id + ".jpg"}
            // src={baseUrlApi + images[0]}
            alt="image"
            className="rounded-t-md object-contain"
            quality={60}
            sizes="33vw"
            fill
          ></Image>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 px-2 h-full">
        <Link
          href={"/product/" + barcode}
          className="nav-link sm:text-base text-start line-clamp-2"
        >
          {nameRu}
        </Link>
        <p className="sm:text-base font-bold mt-auto">{sellPrice} М</p>
        <button
          onClick={() => {
            if (isSignedIn === false) {
              SuccessToast({ successText: t("signupAlert") });
              return;
            }
            handleAddToCart({
              customerId: currentUserObject.user.id,
              productId: id,
            });
          }}
          className="button-primary center gap-2 px-8 w-full"
        >
          {t("addToCart")}
        </button>
      </div>
    </div>
  );
}
