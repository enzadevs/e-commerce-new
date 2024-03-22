"use client";

import Image from "next/image";
import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { Link } from "../../../../../navigation.js";
import { UseFetcher } from "components/Functions/UseFetcher";

export default function OrdersPage({ params }) {
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
    customer,
    productsList,
  } = data;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-row-center justify-between h-10">
        <h2 className="text-lg font-bold">Заказ номер: {params.id}</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-gallery rounded-md shadow-md flex flex-col gap-2 w-full">
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            Адрес доставки:
            <p className="font-bold">{address}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            Комментарий:
            <p className="font-bold">{comment ? comment : "Нет"}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            Способ оплаты:
            <p className="font-bold">{paymentType?.titleRu}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            Способ доставки:
            <p className="font-bold">{deliveryType?.titleRu}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            Создано:
            <p className="font-bold">{createdAt}</p>
          </div>
          <div className="border-b border-gallery-200 flex-row-center justify-between px-2 h-10">
            Обновлено:
            <p className="font-bold">{updatedAt}</p>
          </div>
          <div className="flex-row-center justify-between px-2 h-10">
            Сумма:
            <p className="font-bold">{sum}М</p>
          </div>
        </div>
        <div className="bg-gallery rounded-md shadow-md flex flex-col gap-2 w-full">
          <div className="border-b border-gallery-200 flex-row-center justify-between text-base px-2 h-10">
            Статус заказа:
            <p>{orderStatus?.titleRu}</p>
          </div>
          <div className="border-gallery-200 flex-row-center justify-between px-2 h-10">
            Продукты :
          </div>
          {productsList.map((item) => {
            let sum = item.quantity * item.product?.sellPrice;
            return (
              <div
                key={item.id}
                className="bg-white rounded-md flex-row-center gap-2 px-2 h-10"
              >
                <div className="relative h-10 w-10">
                  <Image
                    src={
                      `http://localhost:3001/images/` + item.product?.images[0]
                    }
                    alt="image"
                    className="object-contain"
                    sizes="20vw"
                    fill
                  ></Image>
                </div>
                <div className="flex flex-col">
                  Имя
                  <Link
                    href={`/product/` + item.product?.id}
                    className="nav-link font-bold"
                  >
                    {item.product?.titleRu}
                  </Link>
                </div>
                <div className="ml-auto flex-row-center gap-4">
                  <div className="flex flex-col">
                    Цена
                    <p className="font-bold">{item.product?.sellPrice}М</p>
                  </div>
                  <div className="flex flex-col">
                    Количество
                    <p className="font-bold">{item.quantity} шт.</p>
                  </div>
                  <div className="flex flex-col">
                    Сумма
                    <p className="font-bold">{sum}М</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
