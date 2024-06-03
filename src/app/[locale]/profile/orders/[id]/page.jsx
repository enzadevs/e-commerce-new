"use client";

import Link from "next/link";
import Image from "next/image";
import LoadingBlock from "@/components/Functions/LoadingBlock";
import ErrorBlock from "@/components/Functions/ErrorBlock";
import { baseUrlApi } from "@/utils/Utils";
import { usePathname } from "next/navigation";
import { useScopedI18n } from "@/locales/client";
import { UseFetcher } from "@/components/Functions/UseFetcher";

export default function OrdersPage({ params }) {
  const pathname = usePathname();
  const useTmTitles = pathname.includes("/tm");
  const scopedT = useScopedI18n("UsersOrderPage");

  const { data, isLoading, error } = UseFetcher(
    `${baseUrlApi}/actions/admin/orders/fetch/` + params.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  const {
    address,
    comment,
    sum,
    PaymentType,
    DeliveryType,
    OrderStatus,
    OrderItems,
    createdAt,
    updatedAt,
  } = data?.order;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex-row-center justify-between h-10">
        <h2 className="text-lg font-bold">
          {scopedT("orderNumber")} {params.id}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-gallery rounded-md shadow-md flex flex-col gap-2 w-full">
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {scopedT("address")}
            <p className="font-bold">{address}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between gap-8 px-2 h-10">
            {scopedT("comment")}
            <p className="font-bold line-clamp-1">
              {comment ? comment : "Нет"}
            </p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {scopedT("paymentType")}
            <p className="font-bold">
              {useTmTitles ? PaymentType?.nameTm : PaymentType?.nameRu}
            </p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {scopedT("deliveryType")}
            <p className="font-bold">
              {useTmTitles ? DeliveryType?.nameTm : DeliveryType?.nameRu}
            </p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {scopedT("createdAt")}
            <p className="font-bold">{createdAt}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {scopedT("updatedAt")}
            <p className="font-bold">{updatedAt}</p>
          </div>
          <div className="flex-row-center justify-between px-2 h-10">
            {scopedT("orderSum")}
            <p className="font-bold">{sum}М</p>
          </div>
        </div>
        <div className="bg-gallery rounded-md shadow-md flex flex-col pb-2 w-full">
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {scopedT("orderStatus")}
            <p className="font-bold">
              {useTmTitles ? OrderStatus?.nameTm : OrderStatus?.nameRu}
            </p>
          </div>
          <div className="flex-row-center justify-between px-2 h-10">
            {scopedT("products")}
          </div>
          <div className="flex flex-col gap-2 px-2">
            {OrderItems.map((item) => {
              let sum = item.quantity * item.Product?.sellPrice;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-gallery-200 rounded-md flex-row-center gap-2 p-2"
                >
                  <Image
                    src={`${baseUrlApi}/${item?.Product?.images[0]}`}
                    alt="image"
                    className="object-contain"
                    height={40}
                    width={40}
                  ></Image>
                  <div className="flex flex-col grow">
                    {scopedT("productName")}
                    <div>
                      <Link
                        href={`/product/` + item.Product?.barcode}
                        className="nav-link font-bold line-clamp-1"
                      >
                        {useTmTitles
                          ? item.Product?.nameTm
                          : item.Product?.nameRu}
                      </Link>
                    </div>
                  </div>
                  <div className="flex-row-center gap-2 md:gap-4 ml-auto">
                    <div className="flex flex-col items-center w-10">
                      <p>{scopedT("productSellPrice")}</p>
                      <p className="font-bold">{item.Product?.sellPrice}М</p>
                    </div>
                    <div className="flex flex-col items-center w-10">
                      <p>{scopedT("productQuantity")}</p>
                      <p className="font-bold">{item.quantity}</p>
                    </div>
                    <div className="flex flex-col items-center w-10">
                      <p>{scopedT("productSum")}</p>
                      <p className="font-bold">{sum}М</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
