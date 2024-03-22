import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { SuccessToast, ErrorToast } from "components/Functions/Toaster.jsx";
import { useState, useRef } from "react";
import { useRouter } from "../../navigation.js";
import { RadioGroup } from "@headlessui/react";
import { UseFetcher } from "components/Functions/UseFetcher";

export default function PostOrder({ customerData, shoppingCartData }) {
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(customerData.phoneNumber);
  const commentRef = useRef();
  const router = useRouter();

  const { data: paymentTypes } = UseFetcher(
    "http://localhost:3001/manage/payment_types/all"
  );

  const {
    data: deliveryTypes,
    isLoading,
    error,
  } = UseFetcher("http://localhost:3001/manage/delivery_types/all");

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="" />;

  let totalSum = 0;

  shoppingCartData?.productsList?.forEach((product) => {
    const quantity = parseFloat(product.quantity);
    const sellPrice = parseFloat(product.product.sellPrice);
    const productTotal = quantity * sellPrice;
    totalSum += productTotal;
  });

  const products = shoppingCartData?.productsList?.map((item) => ({
    productId: item?.product?.id,
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
    productsList,
    paymentTypeId,
    deliveryTypeId,
    shoppingCartId,
  }) => {
    try {
      if (!address) {
        SuccessToast({ successText: "Пожалуйста, укажите адрес доставки." });
        return;
      }
      if (!paymentTypeId) {
        SuccessToast({ successText: "Пожалуйста, выберите способ оплаты." });
        return;
      }
      if (!deliveryTypeId) {
        SuccessToast({ successText: "Пожалуйста, выберите способ доставки." });
        return;
      }

      const response = await fetch(`http://localhost:3001/orders/new/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          productsList,
          phoneNumber,
          address,
          sum,
          comment,
          deliveryTypeId,
          paymentTypeId,
          shoppingCartId,
          orderStatusId: 1,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        SuccessToast({ successText: responseData.message });
        router.push("/profile/orders/" + responseData.order?.id);
      } else {
        const errorData = await response.json();
        ErrorToast({
          errorText: errorData.message || "Вышла Ошибка. Попробуйте снова.",
        });
      }
    } catch (error) {
      console.error("Ошибка добавления продукта в избранное:", error);
      ErrorToast({
        errorText: "Ошибка сетевого соединения. Попробуйте снова позже.",
      });
    }
  };

  return (
    <div className="bg-gallery rounded-md flex flex-col gap-2 shadow-sm transition hover:shadow-md p-4 h-full w-full">
      <div className="border-b border-gallery-200 flex-row-center justify-end gap-4 p-2">
        Сумма заказа :
        <p className="bg-white border border-gallery-200 rounded-md shadow-sm center font-bold px-4 h-10">
          {totalSum} М
        </p>
      </div>
      <div className="border-b border-gallery-200 flex-row-center justify-end gap-4 p-2">
        <p className="bg-white border border-gallery-200 rounded-md shadow-sm center font-bold px-4 h-10">
          {totalSum >= 250 ? (
            "Доставка бесплатная!"
          ) : (
            <div className="flex-row-center justify-end gap-4 p-2">
              Цена доставки 15 ман.
            </div>
          )}
        </p>
      </div>
      <div className="border-b border-gallery-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-16 p-2 w-full">
        Номер телефона:
        <input
          name="phoneNumber"
          type="number"
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
        Адрес:
        <input
          name="address"
          type="text"
          placeholder="Адрес"
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
        Коментарий:
        <input
          ref={commentRef}
          name="comment"
          type="text"
          placeholder="Коментарий"
          className="input-primary px-4 sm:flex-[50%] sm:max-w-[50%]"
        ></input>
      </div>
      <div className="border-b border-gallery-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-16 p-2 w-full">
        Способ доставки:
        <div className="sm:flex-[50%] sm:max-w-[50%]">
          <RadioGroup className="flex flex-col sm:flex-row justify-end gap-2 w-full">
            {deliveryTypes?.map((item) => (
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
                    {item.titleRu}
                  </button>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="border-b border-gallery-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-16 p-2 w-full">
        Способ оплаты:
        <div className="sm:flex-[50%] sm:max-w-[50%]">
          <RadioGroup className="flex flex-col sm:flex-row justify-end gap-2 w-full">
            {paymentTypes?.map((item) => (
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
                    {item.titleRu}
                  </button>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="border-b border-gallery-200 flex-row-center justify-end gap-4 p-2">
        Оформить заказ :
        <button
          onClick={() => {
            handleOrderRequest({
              customerId: customerData.id,
              phoneNumber: phoneNumber,
              address: address,
              comment: commentRef.current.value,
              sum: totalSum,
              productsList: products,
              paymentTypeId: selectedPaymentType,
              deliveryTypeId: selectedDeliveryType,
              shoppingCartId: shoppingCartData.id,
            });
          }}
          className="button-primary center px-4"
        >
          Заказать
        </button>
      </div>
    </div>
  );
}
