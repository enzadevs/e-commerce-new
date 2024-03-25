"use client";

import Image from "next/image";
import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { Link } from "../../../../../navigation.js";
import { UseFetcher } from "components/Functions/UseFetcher";
import { useTranslations } from "next-intl";

export default function OrdersPage({ params }) {
  const t = useTranslations("UsersOrderPage");

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:3001/orders/fetch/` + params.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  const {
    address,
    comment,
    sum,
    paymentType,
    deliveryType,
    orderStatus,
    createdAt,
    updatedAt,
    productsList,
  } = data;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex-row-center justify-between h-10">
        <h2 className="text-lg font-bold">
          {t("orderNumber")} {params.id}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-gallery rounded-md shadow-md flex flex-col gap-2 w-full">
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {t("address")}
            <p className="font-bold">{address}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {t("comment")}
            <p className="font-bold">{comment ? comment : "Нет"}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {t("paymentType")}
            <p className="font-bold">{paymentType?.titleRu}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {t("deliveryType")}
            <p className="font-bold">{deliveryType?.titleRu}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {t("createdAt")}
            <p className="font-bold">{createdAt}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {t("updatedAt")}
            <p className="font-bold">{updatedAt}</p>
          </div>
          <div className="flex-row-center justify-between px-2 h-10">
            {t("orderSum")}
            <p className="font-bold">{sum}М</p>
          </div>
        </div>
        <div className="bg-gallery rounded-md shadow-md flex flex-col pb-2 w-full">
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            {t("orderStatus")}
            <p className="font-bold">{orderStatus?.titleRu}</p>
          </div>
          <div className="flex-row-center justify-between px-2 h-10">
            {t("products")}
          </div>
          <div className="flex flex-col gap-2 px-2">
            {productsList.map((item) => {
              let sum = item.quantity * item.product?.sellPrice;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-gallery-200 rounded-md flex-row-center gap-2 p-2"
                >
                  <Image
                    src={
                      `http://localhost:3001/images/` + item.product?.images[0]
                    }
                    alt="image"
                    className="object-contain"
                    height={40}
                    width={40}
                  ></Image>
                  <div className="flex flex-col grow">
                    {t("productName")}
                    <div>
                      <Link
                        href={`/product/` + item.product?.id}
                        className="nav-link font-bold line-clamp-1"
                      >
                        {item.product?.titleRu}
                      </Link>
                    </div>
                  </div>
                  <div className="flex-row-center gap-2 md:gap-4 ml-auto">
                    <div className="flex flex-col items-center w-10">
                      <p>{t("productSellPrice")}</p>
                      <p className="font-bold">{item.product?.sellPrice}М</p>
                    </div>
                    <div className="flex flex-col items-center w-10">
                      <p>{t("productQuantity")}</p>
                      <p className="font-bold">{item.quantity} шт.</p>
                    </div>
                    <div className="flex flex-col items-center w-10">
                      <p>{t("productSum")}</p>
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
