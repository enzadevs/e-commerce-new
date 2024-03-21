"use client";

import Image from "next/image";
import {
  handleQuantityChange,
  handleRemoveProductFromCart,
} from "components/Functions/PostRequests";
import { Link } from "../../navigation.js";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function CartProductContainer({
  userId,
  productData,
  quantity,
  shoppingCartItemId,
}) {
  const { id, titleRu, sellPrice, images } = productData;

  let sum = quantity * sellPrice;

  return (
    <div className="bg-gallery rounded-md shadow-md flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-2 h-fit sm:h-24 w-full">
      <div className="flex-row-center gap-2 grow w-full">
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
        <Link
          href={"/product/" + id}
          className="nav-link sm:text-base font-bold line-clamp-1"
        >
          {titleRu}
        </Link>
        <p className="font-bold ml-auto">{sellPrice} М</p>
      </div>
      <div className="flex-row-center justify-between w-full sm:justify-normal sm:w-auto gap-2 ml-auto">
        <div className="bg-gallery-100 rounded-md flex-row-center justify-between gap-4 px-4 h-8 sm:h-10">
          <button
            onClick={() => {
              handleQuantityChange({
                customerId: userId,
                productId: id,
                quantity: Number(quantity) - Number(1),
              });
            }}
            className="rounded-full center transition hover:bg-white h-8 w-8"
          >
            <FiMinus className="icons nav-link" />
          </button>
          <p>{productData.id}</p>
          <button
            onClick={() => {
              handleQuantityChange({
                customerId: userId,
                productId: id,
                quantity: Number(quantity) + Number(1),
              });
            }}
            className="rounded-full center transition hover:bg-white h-8 w-8"
          >
            <FiPlus className="icons nav-link" />
          </button>
        </div>
        <p className="bg-white rounded-md shadow-sm center font-bold h-8 sm:h-10 w-20">
          {sum} М
        </p>
        <button
          onClick={() => {
            handleRemoveProductFromCart({
              shoppingCartItemId: shoppingCartItemId,
              userId: userId,
            });
          }}
          className="icons-wrapper hover:text-red-500"
        >
          <RiDeleteBin6Line className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
