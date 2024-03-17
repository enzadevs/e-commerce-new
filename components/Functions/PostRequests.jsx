import { SuccessToast, ErrorToast } from "./Toaster";

export const handleAddToWishlist = async ({ userId, productId }) => {
  try {
    const response = await fetch(
      `http://localhost:3001/manage/utils/addtowishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      SuccessToast({ successText: responseData.message });
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

export const handleAddToCart = async ({ customerId, productId, quantity }) => {
  try {
    const response = await fetch(
      `http://localhost:3001/manage/utils/addproducttocart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId, productId, quantity }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      SuccessToast({ successText: responseData.message });
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

// ! This code doesnt work
export const handleRemoveProductFromCart = async ({
  customerId,
  shoppingCartItemId,
}) => {
  try {
    const response = await fetch(
      `http://localhost:3001/manage/utils/removeproductfromcart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId, shoppingCartItemId }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      SuccessToast({ successText: responseData.message });
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

export const handleQuantityChange = async ({
  customerId,
  productId,
  quantity,
}) => {
  try {
    const response = await fetch(
      `http://localhost:3001/manage/utils/handlequantitychange`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId, productId, quantity }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      SuccessToast({ successText: responseData.message });
    } else {
      const errorData = await response.json();
      ErrorToast({
        errorText: errorData.message || "Вышла Ошибка. Попробуйте снова.",
      });
    }
  } catch (error) {
    ErrorToast({
      errorText: "Ошибка сетевого соединения. Попробуйте снова позже.",
    });
  }
};

export const handleOrderRequest = async ({
  customerId,
  productsList,
  shoppingCartId,
  totalSum,
  address,
  comment,
  deliveryTypeId,
  paymentTypeId,
}) => {
  const products = productsList;
  try {
    const response = await fetch(`http://localhost:3001/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
        shoppingCartId,
        products: products,
        address,
        sum: totalSum,
        comment,
        deliveryTypeId,
        paymentTypeId,
        orderStatusId: 4,
      }),
    });
    console.log(products);

    if (response.ok) {
      const responseData = await response.json();
      SuccessToast({ successText: responseData.message });
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
