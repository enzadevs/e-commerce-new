"use client";

import Link from "next/link";
import Image from "next/image";
import { baseUrlApi } from "@/utils/Utils";
import { SuccessToast } from "@/components/Functions/Toaster";
import { IsSignedInStore } from "@/utils/IsSignedIn";
import { useState, useEffect } from "react";
import {
  addToWishlistRequest,
  handleAddToCart,
} from "@/components/Functions/PostRequests";
import { usePathname } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";

export default function ProductContainer({
  productData,
  addToCart,
  signupAlert,
}) {
  const pathname = usePathname();
  const useTmTitles = pathname.includes("/tm");
  const { barcode, nameTm, nameRu, sellPrice, images } = productData;
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const updateCurrentUserObject = IsSignedInStore(
    (state) => state.updateCurrentUserObject
  );
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      if (isSignedIn && currentUserObject.user?.wishlist) {
        const isInWishlist = currentUserObject.user.wishlist.includes(barcode);
        setIsWished(isInWishlist);
      }
    };

    checkWishlist();
  }, [isSignedIn, currentUserObject.user?.wishlist, barcode]);

  const handleAddToWishlist = () => {
    if (isSignedIn === false) {
      SuccessToast({ successText: scopedT("signupAlert") });
      return;
    }
    addToWishlistRequest({
      phoneNumber: currentUserObject.user.phoneNumber,
      barcode: barcode,
    });

    const updatedWishlist = isWished
      ? currentUserObject.user.wishlist.filter((item) => item !== barcode)
      : [...currentUserObject.user.wishlist, barcode];

    const updatedUserObject = {
      ...currentUserObject,
      user: {
        ...currentUserObject.user,
        wishlist: updatedWishlist,
      },
    };

    updateCurrentUserObject(updatedUserObject);
    setIsWished(!isWished);
  };

  return (
    <div className="product-container">
      <div className="border-b border-gallery-200 relative">
        <div className="rounded-t-md flex-row-center absolute top-1 right-1 z-[4] w-full">
          <button
            onClick={() => {
              if (isSignedIn === false) {
                SuccessToast({ successText: signupAlert });
                return;
              }
              handleAddToWishlist();
              setIsWished(true);
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
            src={baseUrlApi + "/" + images[0]}
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
          {useTmTitles ? nameTm : nameRu}
        </Link>
        <p className="sm:text-base font-bold mt-auto">{sellPrice} М</p>
        <button
          onClick={() => {
            if (isSignedIn === false) {
              SuccessToast({ successText: signupAlert });
              return;
            }
            handleAddToCart({
              phoneNumber: currentUserObject.user.phoneNumber,
              barcode: barcode,
            });
          }}
          className="button-primary center gap-2 px-8 w-full"
        >
          {addToCart}
        </button>
      </div>
    </div>
  );
}
