"use client";

import Link from "next/link";
import Image from "next/image";
import {
  handleQuantityChange,
  handleRemoveProductFromCart,
} from "components/Functions/PostRequests";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function CartProductContainer({
  customerId,
  productData,
  quantity,
}) {
  const { id, titleRu, sellPrice, images } = productData;

  let sum = quantity * sellPrice;

  return (
    <div className="bg-gallery rounded-md shadow-md flex-row-center gap-4 px-2 h-24 w-full">
      <div className="center h-16 w-16">
        <Image
          src={`http://localhost:3001/images/${images[0]}`}
          alt="image"
          height={0}
          width={0}
          style={{ height: "auto", width: "100%" }}
          className="rounded-md"
          sizes="50vw"
        ></Image>
      </div>
      <div className="flex-row-center justify-between gap-2 grow">
        <div className="flex flex-col h-full">
          Имя
          <Link
            href={"/product/" + id}
            className="nav-link md:text-base font-bold line-clamp-1"
          >
            {titleRu}
          </Link>
        </div>
        <div className="ml-auto text-end h-10">
          Цена
          <p className="font-bold">{sellPrice} М</p>
        </div>
      </div>
      <div className="flex-row-center gap-2 ml-auto">
        <div className="bg-gallery-100 rounded-md flex-row-center justify-between gap-4 px-4 h-10">
          <button
            onClick={() => {
              handleQuantityChange({
                customerId: customerId,
                productId: id,
                quantity: Number(quantity) - Number(1),
              });
            }}
            className="rounded-full center transition hover:bg-white h-8 w-8"
          >
            <FiMinus className="icons nav-link" />
          </button>
          <p>{quantity}</p>
          <button
            onClick={() => {
              handleQuantityChange({
                customerId: customerId,
                productId: id,
                quantity: Number(quantity) + Number(1),
              });
            }}
            className="rounded-full center transition hover:bg-white h-8 w-8"
          >
            <FiPlus className="icons nav-link" />
          </button>
        </div>
        <p className="bg-white rounded-md shadow-sm center font-bold h-10 w-20">
          {sum} М
        </p>
        <button
          onClick={() => {
            // handleRemoveProductFromCart({
            //   customerId: customerId,
            //   shoppingCartItemId: shoppingCartItemId,
            // });
          }}
          className="icons-wrapper hover:text-red-500"
        >
          <RiDeleteBin6Line className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
