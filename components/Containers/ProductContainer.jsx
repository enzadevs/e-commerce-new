"use client";

import Link from "next/link";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

export default function ProductContainer({ productData }) {
  return (
    <div className="bg-white border border-haze-200 rounded-3xl flex flex-col gap-2 pb-2 sm:pb-4 h-fit">
      <div className="border-b border-haze-200 relative pb-2">
        <div className="center absolute top-1 right-1 z-[4]">
          <button className="bg-white icons-wrapper hover:text-red-500">
            <AiOutlineHeart className="icons" />
          </button>
        </div>
        <div className="relative rounded-t-3xl h-40 sm:h-56">
          <Image
            src={
              "https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=740&t=st=1707828850~exp=1707829450~hmac=4cbdae34c07521dea56ec81f0b73a154841bee35588b779000711eb0ce815b08"
            }
            alt="image"
            className="rounded-t-3xl object-contain"
            sizes="33vw"
            fill
          ></Image>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 px-2">
        <Link
          href={"/"}
          className="nav-link text-sm sm:text-base text-center line-clamp-2"
        >
          Super cute kitten
        </Link>
        <div className="flex flex-col sm:flex-row sm:gap-2 sm:text-base">
          <p className="text-red-500 italic line-through">269 man</p>
          <p className="font-bold">199 man.</p>
        </div>
        <button className="button-primary gap-2 px-8">В корзину</button>
      </div>
    </div>
  );
}
