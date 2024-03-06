import Link from "next/link";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CartProductContainer({ productData }) {
  const { id, title, sellPrice, images } = productData;
  return (
    <div className="bg-grey-100 border border-grey-200 rounded-3xl shadow-md flex-row-center gap-4 py-2 px-4">
      <div className="h-24 w-24">
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
      <div className="flex-row-center justify-between px-2 sm:px-4 max-w-[70%]  w-full">
        <div className="flex flex-col gap-2 w-full">
          <p>Имя</p>
          <Link
            href={""}
            className="nav-link md:text-base font-bold line-clamp-1"
          >
            {title}
          </Link>
        </div>
        <div className="flex flex-col gap-2 w-[25%]">
          Цена
          <p className="md:text-base font-bold">{sellPrice} ман.</p>
        </div>
      </div>
      {/* quantity buttons and sum of added quantity goes here */}
      <div className="ml-auto">
        <button className="icons-wrapper hover:text-red-500">
          <RiDeleteBin6Line className="icons" />
        </button>
      </div>
    </div>
  );
}
