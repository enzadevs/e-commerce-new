"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import ErrorBlock from "@/components/Functions/ErrorBlock";
import LoadingBlock from "@/components/Functions/LoadingBlock";
import { baseUrlApi } from "@/utils/Utils";
import { usePathname } from "next/navigation";
import { useScopedI18n } from "@/locales/client";
import { UseFetcher } from "@/components/Functions/UseFetcher";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function OrdersPage({ params }) {
  const pathname = usePathname();
  const useTmTitles = pathname.includes("/tm");
  const scopedT = useScopedI18n("UsersOrderPage");

  const handleStatusUpdate = async (id) => {
    try {
      const response = await fetch(
        `${baseUrlApi}/actions/admin/orders/status/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            orderStatusId: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        SuccessToast({ successText: "Заказ был успешно изменен." });
      } else {
        ErrorToast({ errorText: "Произошла непредвиденная ошибка.." });
      }
    } catch (err) {
      return <ErrorBlock height={"h-20 lg:h-32"} width="w-full" />;
    }
  };

  function confirmOrderRestoration(id) {
    if (window.confirm(scopedT("restoreOrderAlert"))) {
      handleStatusUpdate(id).then(() => mutate());
    }
  }

  function confirmOrderCancelation(id) {
    if (window.confirm(scopedT("cancelOrderAlert"))) {
      handleStatusUpdate(id).then(() => mutate());
    }
  }

  const { data, error, isLoading, mutate } = useSWR(
    `${baseUrlApi}/actions/admin/orders/fetch/` + params.id,
    fetcher
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
            <div className="flex flex-col justify-end sm:flex-row gap-2">
              {OrderStatus?.id === 1 ? (
                <button
                  onClick={() => confirmOrderCancelation(4)}
                  className="button-primary center gap-2 px-4"
                >
                  {scopedT("cancelOrder")}
                </button>
              ) : OrderStatus?.id === 4 ? (
                <button
                  onClick={() => confirmOrderRestoration(1)}
                  className="button-primary center gap-2 px-4"
                >
                  {scopedT("restoreOrder")}
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
