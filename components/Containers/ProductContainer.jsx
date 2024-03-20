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

export default function ProductContainer({ productData }) {
  const { status, id, titleRu, sellPrice, wishlist } = productData;
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    if (wishlist) {
      setIsWished(
        wishlist.some((item) => item.user?.id === currentUserObject.user?.id)
      );
    } else {
      setIsWished(false);
    }
  }, [wishlist, currentUserObject]);

  return (
    <div className="product-container">
      <div className="border-b border-gallery-200 relative">
        <div className="rounded-t-md flex-row-center absolute top-1 right-1 z-[4] w-full">
          {status.id !== 1 && (
            <p className="bg-green-600 rounded-md center text-white text-xs ml-2 px-2 h-8 sm:h-10 w-fit">
              {status.titleRu}
            </p>
          )}
          <button
            onClick={() => {
              if (isSignedIn === false) {
                SuccessToast({ successText: "Войдите или создайте аккаунт." });
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
            src={`http://localhost:3001/images/${productData.images[0]}`}
            alt="image"
            className="rounded-t-md object-contain"
            sizes="33vw"
            fill
          ></Image>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 px-2 h-full">
        <Link
          href={"/product/" + id}
          className="nav-link sm:text-base text-start line-clamp-2"
        >
          {titleRu}
        </Link>
        <p className="sm:text-base font-bold mt-auto">{sellPrice} М</p>
        <button
          onClick={() => {
            if (isSignedIn === false) {
              SuccessToast({ successText: "Войдите или создайте аккаунт." });
              return;
            }
            handleAddToCart({
              customerId: currentUserObject.user.id,
              productId: id,
            });
          }}
          className="button-primary center gap-2 px-8 w-full"
        >
          В корзину
        </button>
      </div>
    </div>
  );
}
