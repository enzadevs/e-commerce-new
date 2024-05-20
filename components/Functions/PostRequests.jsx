import { baseUrlApi } from "utils/Utils";
import { SuccessToast, ErrorToast } from "./Toaster";

export const handleAddToWishlist = async ({ phoneNumber, barcode }) => {
  try {
    const response = await fetch(`${baseUrlApi}/actions/shop/addtowishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, barcode }),
    });

    if (response.ok) {
      const responseData = await response.json();
      SuccessToast({ successText: responseData.message });
    } else {
      const errorData = await response.json();
      ErrorToast({
        errorText: errorData.message || "Вышла Ошибка. Попробуйте снова.",
      });
    }
  } catch (err) {
    ErrorToast({
      errorText: "Ошибка добавления продукта в избранное:",
    });
  }
};

export const handleAddToCart = async ({ phoneNumber, barcode, quantity }) => {
  try {
    const response = await fetch(`${baseUrlApi}/actions/shop/addtocart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, barcode, quantity }),
    });

    if (response.ok) {
      const responseData = await response.json();
      SuccessToast({ successText: responseData.message });
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

export const handleRemoveProductFromCart = async ({ shoppingCartItemId }) => {
  try {
    const response = await fetch(`${baseUrlApi}/actions/shop/deletefromcart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shoppingCartItemId }),
    });

    if (response.ok) {
      const responseData = await response.json();
      SuccessToast({ successText: responseData.message });
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

export const handleQuantityChange = async ({
  shoppingCartId,
  barcode,
  quantity,
}) => {
  try {
    const response = await fetch(`${baseUrlApi}/actions/shop/quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shoppingCartId, barcode, quantity }),
    });

    if (response.ok) {
      const responseData = await response.json();
      SuccessToast({ successText: responseData.message });
    } else {
      const errorData = await response.json();
      ErrorToast({
        errorText: errorData.message || "Вышла Ошибка. Попробуйте снова.",
      });
    }
  } catch (err) {
    console.log(err);
    ErrorToast({
      errorText: "Ошибка сетевого соединения. Попробуйте снова позже.",
    });
  }
};

export const cancelOrder = async ({ customerId, orderId }) => {
  try {
    const response = await fetch(`${baseUrlApi}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
        orderId,
        orderStatusId: 4,
      }),
    });

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
