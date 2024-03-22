"use client";

import Image from "next/image";
import {
  handleQuantityChange,
  handleRemoveProductFromCart,
} from "components/Functions/PostRequests";
import { Link } from "../../navigation.js";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useTranslations } from "next-intl";

export default function CartProductContainer({
  userId,
  productData,
  quantity,
  shoppingCartItemId,
  shoppingCartId,
}) {
  const { id, titleRu, sellPrice, images } = productData;
  const t = useTranslations("Product");

  let sum = quantity * sellPrice;

  return (
    <div className="bg-gallery rounded-md shadow-md flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-2 h-fit w-full">
      <div className="flex-row-center gap-2 w-full">
        <div className="block h-16 w-16">
          <Image
            src={`http://localhost:3001/images/${images[0]}`}
            alt="image"
            height={0}
            width={0}
            style={{ height: "100%", width: "100%" }}
            className="object-cover relative rounded-md"
            sizes="25vw"
          ></Image>
        </div>
        <div className="flex flex-col gap-2 h-14">
          {t("productTitle")}
          <Link
            href={"/product/" + id}
            className="nav-link font-bold line-clamp-1"
          >
            {titleRu}
          </Link>
        </div>
        <div className="flex flex-col gap-2 ml-auto h-14">
          {t("productSellPrice")}
          <p className="font-bold">{sellPrice} М</p>
        </div>
      </div>
      <div className="flex-row-center justify-between gap-2 sm:w-auto w-full">
        <div className="bg-white shadow-md flex flex-col items-center rounded-md px-2 h-14 w-26">
          {t("productQuantity")}
          <div className="flex-row-center justify-between gap-4">
            <button
              onClick={() => {
                handleQuantityChange({
                  shoppingCartId: shoppingCartId,
                  productId: id,
                  quantity: Number(quantity) - Number(1),
                });
              }}
              className="rounded-full center transition hover:bg-gallery-100 h-8 w-8"
            >
              <FiMinus className="icons nav-link" />
            </button>
            <p>{quantity}</p>
            <button
              onClick={() => {
                handleQuantityChange({
                  shoppingCartId: shoppingCartId,
                  productId: id,
                  quantity: Number(quantity) + Number(1),
                });
              }}
              className="rounded-full center transition hover:bg-gallery-100 h-8 w-8"
            >
              <FiPlus className="icons nav-link" />
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md flex flex-col gap-2 items-center rounded-md px-4 h-14">
          {t("productsSum")}
          <p className="font-bold">{sum}М</p>
        </div>
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
