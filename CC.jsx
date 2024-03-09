"use client";

import Link from "next/link";
import Image from "next/image";
import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { ErrorToast, SuccessToast } from "components/Functions/Toaster";
import {
  handleRemoveProductFromCart,
  handleQuantityChange,
} from "components/Functions/PostRequests";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus, FiMinus } from "react-icons/fi";
import CartProductContainer from "components/Containers/CartProductContainer";
import PostOrder from "components/Containers/PostOrder";
import { UseFetcher } from "components/Functions/UseFetcher";
import { IsSignedInStore } from "utils/IsSignedIn";

export default function ShoppingCartPage() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  let [plan, setPlan] = useState("startup");

  const { data: paymentTypes } = UseFetcher(
    "http://localhost:5000/manage/payment_type/all"
  );

  const { data: deliveryTypes } = UseFetcher(
    "http://localhost:5000/manage/delivery_type/all"
  );

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:5000/users/get/` + currentUserObject?.user?.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  const handleDeliveryChange = (event) => {
    setSelectedDeliveryType(event.target.value);
    console.log(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setSelectedPaymentType(event.target.value);
  };

  const { shoppingCart } = data;

  let totalSum = 0;

  shoppingCart[0].productsList.forEach((product) => {
    const quantity = parseFloat(product.quantity);
    const sellPrice = parseFloat(product.product.sellPrice);
    const productTotal = quantity * sellPrice;
    totalSum += productTotal;
  });

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* {console.log(shoppingCart[0].productsList)} */}
      <div className="flex flex-col gap-4">
        {shoppingCart[0] ? (
          shoppingCart[0]?.productsList?.length > 0 ? (
            <>
              {shoppingCart[0]?.productsList?.map((item) => {
                return (
                  <div className="flex flex-col gap-4" key={item.id}>
                    <>
                      {/* <CartProductContainer
                      productData={item.product}
                      quantity={item.quantity}
                    /> */}
                      <div className="bg-grey-100 rounded-3xl shadow-sm flex-row-center gap-4 transition hover:shadow-md px-2 h-24 w-full">
                        <div className="center h-16 w-16">
                          <Image
                            src={`http://localhost:5000/images/${item.product.images[0]}`}
                            alt="image"
                            height={0}
                            width={0}
                            style={{ height: "auto", width: "100%" }}
                            className="rounded-3xl"
                            sizes="50vw"
                          ></Image>
                        </div>
                        <div className="flex-row-center justify-between gap-2 grow">
                          <div className="flex flex-col h-full">
                            Имя
                            <Link
                              href={"/product/" + item.product.id}
                              className="nav-link md:text-base font-bold line-clamp-1"
                            >
                              {item.product.title}
                            </Link>
                          </div>
                          <div className="ml-auto w-24">
                            Цена
                            <p className="md:text-base font-bold">
                              {item.product.sellPrice} ман.
                            </p>
                          </div>
                        </div>
                        <div className="flex-row-center gap-2 ml-auto">
                          <div className="bg-grey-200 rounded-3xl flex-row-center justify-between px-4 h-9 sm:h-11 w-44">
                            <button
                              onClick={() => {
                                handleQuantityChange({
                                  customerId: currentUserObject.user.id,
                                  productId: item.product.id,
                                  quantity: Number(item.quantity) - Number(1),
                                });
                              }}
                              className="rounded-full center transition hover:bg-white h-9 w-9"
                            >
                              <FiMinus className="icons nav-link" />
                            </button>
                            <p>{item.quantity}</p>
                            <button
                              onClick={() => {
                                handleQuantityChange({
                                  customerId: currentUserObject.user.id,
                                  productId: item.product.id,
                                  quantity: Number(item.quantity) + Number(1),
                                });
                              }}
                              className="rounded-full center transition hover:bg-white h-9 w-9"
                            >
                              <FiPlus className="icons nav-link" />
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              handleRemoveProductFromCart({
                                customerId: currentUserObject.user.id,
                                productId: item.product.id,
                              });
                            }}
                            className="icons-wrapper hover:text-red-500"
                          >
                            <RiDeleteBin6Line className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  </div>
                );
              })}
              <div className="flex flex-col gap-4">
                <div className="bg-grey-100 rounded-3xl flex flex-col shadow-sm transition hover:shadow-md p-4 h-full w-full">
                  <h2 className="text-base font-bold">Оформить заказ</h2>
                  <div className="info-holder">
                    <p className="text-sm">Сумма</p>
                    <p className="bg-white rounded-3xl center font-bold px-4 h-9">
                      {totalSum} ман.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center sm:justify-around gap-2 sm:gap-16">
                    <RadioGroup className="flex-row-center justify-between gap-4 h-9">
                      {deliveryTypes?.map((item) => (
                        <RadioGroup.Option value={item.id} key={item.id}>
                          {({ checked }) => (
                            <button
                              onClick={handleDeliveryChange}
                              key={item.id}
                              value={item.id}
                              className={
                                checked
                                  ? "button-primary center px-8 w-full"
                                  : "button-outline center px-8 w-full"
                              }
                            >
                              {item.title}
                            </button>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </RadioGroup>
                    <>
                      <RadioGroup className="flex-row-center justify-between gap-4 h-9">
                        {paymentTypes?.map((item) => (
                          <RadioGroup.Option value={item.id} key={item.id}>
                            {({ checked }) => (
                              <button
                                onClick={handlePaymentChange}
                                key={item.id}
                                value={item.id}
                                className={
                                  checked
                                    ? "button-primary center px-8 w-full"
                                    : "button-outline center px-8 w-full"
                                }
                              >
                                {item.title}
                              </button>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </RadioGroup>
                    </>
                  </div>
                  <div className="w-full">
                    <button
                      onClick={handleOrderRequest}
                      className="button-primary center ml-auto mt-2 px-8 w-fit"
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Добавьте продукты В Корзину и они появятся тут.</p>
          )
        ) : (
          <p>
            Пожалуйста создайте или войдите в аккаунт чтобы добавлять сюда
            продуты.
          </p>
        )}
      </div>
    </div>
  );
}
