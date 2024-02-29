"use client";

import Link from "next/link";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

export default function ProductContainer({ productData }) {
  return (
    <div className="bg-white border border-haze-200 rounded-3xl flex flex-col gap-2 pb-2 sm:pb-4 h-auto w-full">
      <div className="border-b border-haze-200 relative pb-2">
        <div className="center absolute top-1 right-1 z-[4]">
          <button className="bg-white icons-wrapper hover:text-red-500">
            <AiOutlineHeart className="icons" />
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
      <div className="flex flex-col items-start gap-2 px-2">
        <Link
          href={"/product/" + productData.id}
          className="nav-link text-sm sm:text-base text-start line-clamp-2"
        >
          {productData.title}
        </Link>
        <p className="font-bold">{productData.sellPrice} ман.</p>
        <button className="button-primary center gap-2 px-8 mt-auto w-full">
          В корзину
        </button>
      </div>
    </div>
  );
}
