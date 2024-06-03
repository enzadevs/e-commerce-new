"use client";

import Link from "next/link";
import Image from "next/image";
import {
  handleQuantityChange,
  handleRemoveProductFromCart,
} from "@/components/Functions/PostRequests";
import { usePathname } from "next/navigation";
import { baseUrlApi } from "@/utils/Utils";
import { useScopedI18n } from "@/locales/client";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function CartProductContainer({
  productData,
  quantity,
  shoppingCartItemId,
  shoppingCartId,
}) {
  const pathname = usePathname();
  const useTmTitles = pathname.includes("/tm");
  const scopedT = useScopedI18n("ShoppingCart");

  const { barcode, nameTm, nameRu, sellPrice, images } = productData;

  let sum = quantity * sellPrice;

  return (
    <div className="bg-gallery border border-gallery-200 rounded-md shadow-md flex flex-col md:flex-row gap-4 p-2 md:p-4">
      <div className="flex gap-4">
        <div className="h-20 w-20">
          <Image
            src={`${baseUrlApi}/${images[0]}`}
            alt="image"
            height={0}
            width={0}
            style={{ height: "100%", width: "100%" }}
            className="object-cover relative rounded-md shadow-md"
            sizes="25vw"
            quality={50}
          ></Image>
        </div>
        <Link
          href={"/product/" + barcode}
          className="flex-row-center md:text-base font-bold line-clamp-1 nav-link"
        >
          {useTmTitles ? nameTm : nameRu}
        </Link>
      </div>
      <div className="flex-row-center justify-between md:flex-start gap-2 md:gap-4 ml-auto w-full md:w-auto">
        <div className="bg-white rounded-md shadow-md flex flex-col md:flex-row items-center justify-center font-bold px-2 h-10 w-20 md:w-24">
          <p className="block md:hidden text-xs font-normal">
            {scopedT("price")}
          </p>
          {sellPrice} m.
        </div>
        <div className="bg-white rounded-md shadow-md flex-row-center justify-between px-1 h-10 w-24">
          <button
            onClick={() => {
              handleQuantityChange({
                shoppingCartId: Number(shoppingCartId),
                barcode: barcode,
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
                shoppingCartId: Number(shoppingCartId),
                barcode: barcode,
                quantity: Number(quantity) + Number(1),
              });
            }}
            className="rounded-full center transition hover:bg-gallery-100 h-8 w-8"
          >
            <FiPlus className="icons nav-link" />
          </button>
        </div>
        <div className="bg-white rounded-md shadow-md flex flex-col md:flex-row items-center justify-center font-bold px-2 h-10 w-20 md:w-24">
          <p className="block md:hidden text-xs font-normal">
            {scopedT("sum")}
          </p>
          {sum} m.
        </div>
        <button
          onClick={() => {
            handleRemoveProductFromCart({
              shoppingCartItemId: shoppingCartItemId,
            });
          }}
          className="bg-white rounded-md shadow-md center transition hover:text-red-500 h-10 w-12"
        >
          <RiDeleteBin6Line className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
