"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IsSignedInStore } from "utils/IsSignedIn";
import { handleAddToWishlist } from "components/Functions/PostRequests";
import { AiFillHeart } from "react-icons/ai";

export default function ProductContainer({ productData }) {
  const { status, id, title, sellPrice, wishedBy } = productData;
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);

  const [isWished, setIsWished] = useState(
    wishedBy?.id !== currentUserObject.user?.id
  );

  return (
    <div className="product-container">
      <div className="border-b border-haze-200 relative pb-2">
        <div className="rounded-t-3xl flex-row-center absolute top-1 right-1 z-[4] w-full">
          {status.id !== 1 && (
            <p className="bg-calm rounded-full center text-white text-xs ml-2 px-2 h-8 sm:h-11 w-fit">
              {status.title}
            </p>
          )}
          <button
            onClick={() => {
              handleAddToWishlist({
                userId: currentUserObject.user.id,
                productId: id,
              });
              setIsWished(!isWished);
            }}
            className={
              isWished
                ? "icons-wrapper text-red-500 ml-auto"
                : "icons-wrapper hover:text-red-500 ml-auto"
            }
          >
            <AiFillHeart className="icons" />
          </button>
        </div>
        <div className="relative rounded-t-3xl h-40 sm:h-56">
          <Image
            src={`http://localhost:5000/images/${productData.images[0]}`}
            alt="image"
            className="rounded-t-3xl object-contain"
            sizes="33vw"
            fill
          ></Image>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 px-2 h-full">
        <Link
          href={"/product/" + id}
          className="nav-link text-sm sm:text-base text-start line-clamp-2"
        >
          {title}
        </Link>
        <p className="text-sm sm:text-base font-bold mt-auto">
          {sellPrice} ман.
        </p>
        <button className="button-primary center gap-2 px-8 w-full">
          В корзину
        </button>
      </div>
    </div>
  );
}
