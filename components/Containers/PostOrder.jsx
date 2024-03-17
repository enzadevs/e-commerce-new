import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { useState, useRef } from "react";
import { RadioGroup } from "@headlessui/react";
import { UseFetcher } from "components/Functions/UseFetcher";
import { handleOrderRequest } from "components/Functions/PostRequests";

export default function PostOrder({ customerId, shoppingCartData }) {
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const addressRef = useRef();
  const commentRef = useRef();

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

  return (
    <div className="bg-gallery rounded-md flex flex-col gap-2 shadow-sm transition hover:shadow-md p-4 h-full w-full">
      <div className="border-b border-gallery-200 flex-row-center justify-between gap-4 p-2 w-full">
        Сумма :
        <p className="bg-white border border-gallery-200 rounded-md shadow-sm center font-bold px-4 h-10">
          {totalSum} М
        </p>
      </div>
      <div className="border-b border-gallery-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-16 p-2 w-full">
        Адрес:
        <input
          ref={addressRef}
          name="address"
          type="text"
          className="input-primary px-4 sm:flex-[50%] sm:max-w-[50%]"
          placeholder="Адрес"
        ></input>
      </div>
      <div className="border-b border-gallery-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-16 p-2 w-full">
        Коментарий:
        <input
          ref={commentRef}
          name="comment"
          type="text"
          className="input-primary px-4 sm:flex-[50%] sm:max-w-[50%]"
          placeholder="Коментарий"
        ></input>
      </div>
      <div className="border-b border-gallery-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-16 p-2 w-full">
        Способ доставки:
        <div className="sm:flex-[50%] sm:max-w-[50%]">
          <RadioGroup className="flex flex-col sm:flex-row justify-between gap-2 w-full">
            {deliveryTypes?.map((item) => (
              <RadioGroup.Option value={item.id} key={item.id}>
                {({ checked }) => (
                  <button
                    onClick={handleDeliveryChange}
                    key={item.id}
                    value={item.id}
                    className={
                      checked
                        ? "button-primary center px-4"
                        : "button-outline center px-4"
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
          <RadioGroup className="flex flex-col sm:flex-row justify-between gap-2 w-full">
            {paymentTypes?.map((item) => (
              <RadioGroup.Option value={item.id} key={item.id}>
                {({ checked }) => (
                  <button
                    onClick={handlePaymentChange}
                    key={item.id}
                    value={item.id}
                    className={
                      checked
                        ? "button-primary center px-4"
                        : "button-outline center px-4"
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
      <div className="border-b border-gallery-200 flex-row-center justify-between p-2 w-full">
        Оформить заказ
        <button
          onClick={() => {
            handleOrderRequest({
              customerId: customerId,
              address: addressRef.current.value,
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
