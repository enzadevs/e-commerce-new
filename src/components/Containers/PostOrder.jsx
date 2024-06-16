"use client";

import LoadingBlock from "@/components/Functions/LoadingBlock";
import ErrorBlock from "@/components/Functions/ErrorBlock";
import { baseUrlApi } from "@/utils/Utils";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup } from "@headlessui/react";
import { UseFetcher } from "@/components/Functions/UseFetcher";
import { SuccessToast, ErrorToast } from "@/components/Functions/Toaster";
import { useScopedI18n } from "@/locales/client";
import { usePathname } from "next/navigation";

export default function PostOrder({ customerData, shoppingCartData }) {
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(customerData.phoneNumber);
  const commentRef = useRef();
  const router = useRouter();
  const scopedT = useScopedI18n("Order");
  const pathname = usePathname();
  const useTmTitles = pathname.includes("/tm");

  const { data: payment_response } = UseFetcher(
    `${baseUrlApi}/management/paymenttypes/fetch/all`
  );

  const {
    data: delivery_response,
    isLoading,
    error,
  } = UseFetcher(`${baseUrlApi}/management/deliverytypes/fetch/all`);

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="" />;

  let totalSum = 0;

  shoppingCartData?.ProductsList?.forEach((product) => {
    const quantity = parseFloat(product.quantity);
    const sellPrice = parseFloat(product.Product.sellPrice);
    const productTotal = quantity * sellPrice;
    totalSum += productTotal;
  });

  const products = shoppingCartData?.ProductsList?.map((item) => ({
    barcode: item?.Product?.barcode,
    quantity: parseFloat(item.quantity),
  }));

  const handleDeliveryChange = (event) => {
    setSelectedDeliveryType(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setSelectedPaymentType(event.target.value);
  };

  const handleOrderRequest = async ({
    customerId,
    phoneNumber,
    address,
    comment,
    sum,
    orderItems,
    paymentTypeId,
    deliveryTypeId,
    shoppingCartId,
  }) => {
    try {
      if (!address) {
        SuccessToast({
          successText: "Пожалуйста, укажите адрес доставки.",
        });
        return;
      }

      if (!deliveryTypeId) {
        SuccessToast({
          successText: "Пожалуйста, выберите способ доставки.",
        });
        return;
      }

      if (!paymentTypeId) {
        SuccessToast({
          successText: "Пожалуйста, выберите способ оплаты.",
        });
        return;
      }

      const response = await fetch(`${baseUrlApi}/actions/admin/orders/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          phoneNumber,
          address,
          comment,
          sum,
          orderItems,
          paymentTypeId,
          deliveryTypeId,
          orderStatusId: 1,
          shoppingCartId,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        SuccessToast({ successText: scopedT("orderIsDone") });
        setTimeout(() => {
          router.push("/profile/orders/" + responseData.order?.id);
        }, 1250);
      } else {
        const errorData = await response.json();
        ErrorToast({
          errorText: errorData.message || "Вышла Ошибка. Попробуйте снова.",
        });
      }
    } catch (err) {
      ErrorToast({
        errorText: "Ошибка сетевого соединения. Попробуйте снова позже.",
      });
    }
  };

  return (
    <div className="bg-gallery border border-gallery-200 rounded-md flex flex-col gap-2 shadow-md p-4 h-full w-full">
      <div className="border-b border-gallery-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-16 p-2 w-full">
        {scopedT("phoneNumber")}
        <input
          name="phoneNumber"
          type="text"
          placeholder={customerData.phoneNumber}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={`${
            phoneNumber.length >= 8
              ? "input-primary px-4 sm:flex-[50%] sm:max-w-[50%]"
              : "input-caution px-4 sm:flex-[50%] sm:max-w-[50%]"
          }`}
          minLength={8}
          maxLength={8}
        />
      </div>
      <div className="border-b border-gallery-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-16 p-2 w-full">
        {scopedT("address")}
        <input
          name="address"
          type="text"
          placeholder={scopedT("addressInput")}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={`${
            address.length >= 4
              ? "input-primary px-4 sm:flex-[50%] sm:max-w-[50%]"
              : "input-caution px-4 sm:flex-[50%] sm:max-w-[50%]"
          }`}
        />
      </div>
      <div className="border-b border-gallery-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-16 p-2 w-full">
        {scopedT("commentary")}
        <input
          ref={commentRef}
          name="comment"
          type="text"
          placeholder={scopedT("commentInput")}
          className="input-primary px-4 sm:flex-[50%] sm:max-w-[50%]"
        ></input>
      </div>
      <div className="border-b border-gallery-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-16 p-2 w-full">
        {scopedT("deliveryType")}
        <div className="sm:flex-[50%] sm:max-w-[50%]">
          <RadioGroup className="flex flex-col sm:flex-row justify-end gap-2 w-full">
            {delivery_response?.deliveryTypes?.map((item) => (
              <RadioGroup.Option value={item.id} key={item.id}>
                {({ checked }) => (
                  <button
                    onClick={handleDeliveryChange}
                    key={item.id}
                    value={item.id}
                    className={
                      checked
                        ? "button-primary center px-4 w-full sm:w-auto"
                        : "button-outline center px-4 w-full sm:w-auto"
                    }
                  >
                    {useTmTitles ? item.nameTm : item.nameRu}
                  </button>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="border-b border-gallery-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-16 p-2 w-full">
        {scopedT("paymentType")}
        <div className="sm:flex-[50%] sm:max-w-[50%]">
          <RadioGroup className="flex flex-col sm:flex-row justify-end gap-2 w-full">
            {payment_response?.paymentTypes?.map((item) => (
              <RadioGroup.Option value={item.id} key={item.id}>
                {({ checked }) => (
                  <button
                    onClick={handlePaymentChange}
                    key={item.id}
                    value={item.id}
                    className={
                      checked
                        ? "button-primary center px-4 w-full sm:w-auto"
                        : "button-outline center px-4 w-full sm:w-auto"
                    }
                  >
                    {useTmTitles ? item.nameTm : item.nameRu}
                  </button>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="border-b border-gallery-200 flex-row-center justify-end gap-4 p-2">
        {scopedT("makeOrder")}
        <button
          onClick={() => {
            handleOrderRequest({
              customerId: customerData.id,
              phoneNumber: phoneNumber,
              address: address,
              comment: commentRef.current.value,
              sum: totalSum,
              orderItems: products,
              paymentTypeId: selectedPaymentType,
              deliveryTypeId: selectedDeliveryType,
              shoppingCartId: shoppingCartData.id,
            });
          }}
          className="button-primary center px-4"
        >
          {scopedT("postOrder")}
        </button>
      </div>
    </div>
  );
}
