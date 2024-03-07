import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function CartProductContainer({ productData, quantity }) {
  const [count, setCount] = useState(quantity || 0);
  const { id, title, sellPrice, images } = productData;

  return (
    <div className="bg-grey-100 rounded-3xl shadow-sm flex-row-center gap-4 transition hover:shadow-md px-2 h-24 w-full">
      <div className="center h-16 w-16">
        <Image
          src={`http://localhost:5000/images/${images[0]}`}
          alt="image"
          height={0}
          width={0}
          style={{ height: "auto", width: "100%" }}
          className="rounded-3xl"
          sizes="50vw"
        ></Image>
      </div>
      <div className="flex-row-center justify-between gap-2">
        <div className="flex flex-col h-full">
          Имя
          <Link
            href={"/product/" + id}
            className="nav-link md:text-base font-bold line-clamp-1"
          >
            {title}
          </Link>
        </div>
        <div className="w-24">
          Цена
          <p className="md:text-base font-bold">{sellPrice} ман.</p>
        </div>
      </div>
      <div className="flex-row-center gap-2 ml-auto">
        <div className="bg-grey-200 rounded-3xl flex-row-center justify-between px-4 h-9 sm:h-11 w-44">
          <button
            onClick={() => setCount((current) => Math.max(current - 1, 0))}
            className="rounded-full center transition hover:bg-white h-9 w-9"
          >
            <FiMinus className="icons nav-link" />
          </button>
          <p>{count}</p>
          <button
            onClick={() => setCount((current) => current + 1)}
            className="rounded-full center transition hover:bg-white h-9 w-9"
          >
            <FiPlus className="icons nav-link" />
          </button>
        </div>
        <button className="icons-wrapper hover:text-red-500">
          <RiDeleteBin6Line className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
