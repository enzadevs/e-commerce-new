import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { useState } from "react";
import { UseFetcher } from "components/Functions/UseFetcher";

export default function PostOrder({ orderInfo }) {
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);

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
    console.log(true);
  };

  const handlePaymentChange = (event) => {
    setSelectedPaymentType(event.target.value);
  };

  return (
    <div className="bg-grey-100 rounded-3xl flex flex-col shadow-sm transition hover:shadow-md p-4 h-full w-full">
      <h2 className="text-base font-bold">Оформить заказ</h2>
      <div className="info-holder">
        <p className="text-sm">Сумма</p>
        <p className="bg-white rounded-3xl center font-bold px-4 h-9">
          {orderInfo.totalSum} ман.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:justify-around gap-2 sm:gap-16">
        <div className="border-b border-grey-200 flex flex-col mt-2 w-full">
          <label htmlFor="deliveryType">Способ доставки :</label>
          <div className="font-bold flex-row-center justify-between h-9">
            {deliveryTypes?.map((item) => (
              <label key={item.id} className="flex gap-2">
                <input
                  type="radio"
                  id={item.id}
                  name="deliveryType"
                  value={item.id}
                  checked={item.id}
                  onChange={handleDeliveryChange}
                />
                {item.title}
              </label>
            ))}
          </div>
        </div>
        <div className="border-b border-grey-200 flex flex-col mt-2 w-full">
          <label htmlFor="paymentType">Способ оплаты :</label>
          <div className="font-bold flex-row-center justify-between h-9">
            {paymentTypes?.map((item) => (
              <label key={item.id} className="flex gap-2">
                <input
                  type="radio"
                  id={item.id}
                  name="paymentType"
                  value={item.id}
                  checked={item.id}
                  onChange={handlePaymentChange}
                />
                {item.title}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full">
        <button className="button-primary center ml-auto mt-2 px-8 w-fit">
          Заказать
        </button>
      </div>
    </div>
  );
}
