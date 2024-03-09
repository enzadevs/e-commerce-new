import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { useState, useRef } from "react";
import { RadioGroup } from "@headlessui/react";
import { UseFetcher } from "components/Functions/UseFetcher";
import { handleOrderRequest } from "components/Functions/PostRequests";

export default function PostOrder({
  customerId,
  products,
  shoppingCartId,
  totalSum,
}) {
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const addressRef = useRef();
  const commentRef = useRef();

  const { data: paymentTypes } = UseFetcher(
    "http://localhost:5000/manage/payment_type/all"
  );

  const {
    data: deliveryTypes,
    isLoading,
    error,
  } = UseFetcher("http://localhost:5000/manage/delivery_type/all");

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="" />;

  const handleDeliveryChange = (event) => {
    setSelectedDeliveryType(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setSelectedPaymentType(event.target.value);
  };

  return (
    <div className="bg-grey-100 rounded-3xl flex flex-col gap-2 shadow-sm transition hover:shadow-md p-4 h-full w-full">
      <h2 className="text-base font-bold">Оформить заказ</h2>
      <div className="flex flex-col md:flex-row items-center sm:justify-around gap-2 md:gap-8">
        <div className="bg-white rounded-3xl shadow-sm flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-2 w-full">
          <p className="flex-[20%]">Адрес:</p>
          <input
            ref={addressRef}
            name="address"
            type="text"
            className="input-primary px-4"
            placeholder="Адрес"
          ></input>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center sm:justify-around gap-2 md:gap-8">
        <div className="bg-white rounded-3xl shadow-sm flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-2 w-full">
          <p className="flex-[20%]">Коментарий:</p>
          <input
            ref={commentRef}
            name="comment"
            type="text"
            className="input-primary px-4"
            placeholder="Коментарий"
          ></input>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center sm:justify-around gap-2 md:gap-8">
        <div className="bg-white rounded-3xl shadow-sm flex flex-col sm:flex-row items-center gap-4 p-2 w-full">
          <p>Способ доставки:</p>
          <RadioGroup className="flex-row-center justify-between gap-4 grow">
            {deliveryTypes?.map((item) => (
              <RadioGroup.Option value={item.id} key={item.id}>
                {({ checked }) => (
                  <button
                    onClick={handleDeliveryChange}
                    key={item.id}
                    value={item.id}
                    className={
                      checked
                        ? "button-primary center px-4 sm:px-8 w-full"
                        : "button-outline center px-4 sm:px-8 w-full"
                    }
                  >
                    {item.title}
                  </button>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="bg-white rounded-3xl shadow-sm flex flex-col sm:flex-row items-center gap-4 p-2 w-full">
          <p>Способ оплаты:</p>
          <RadioGroup className="flex-row-center justify-between gap-4 grow">
            {paymentTypes?.map((item) => (
              <RadioGroup.Option value={item.id} key={item.id}>
                {({ checked }) => (
                  <button
                    onClick={handlePaymentChange}
                    key={item.id}
                    value={item.id}
                    className={
                      checked
                        ? "button-primary center px-4 sm:px-8 w-full"
                        : "button-outline center px-4 sm:px-8 w-full"
                    }
                  >
                    {item.title}
                  </button>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 p-2 w-full">
        <p className="text-sm">Сумма :</p>
        <div className="flex-row-center gap-2">
          <p className="button-outline center font-bold px-4">
            {totalSum} ман.
          </p>
          <button
            onClick={() => {
              handleOrderRequest({
                customerId: customerId,
                productsList: products,
                shoppingCartId: shoppingCartId,
                totalSum: totalSum,
                address: addressRef.current.value,
                comment: commentRef.current.value,
                deliveryTypeId: selectedDeliveryType,
                paymentTypeId: selectedPaymentType,
              });
            }}
            className="button-primary center px-4 sm:px-8 w-fit"
          >
            Заказать
          </button>
        </div>
      </div>
    </div>
  );
}
