import { SuccessToast, ErrorToast } from "./Toaster";

export const handleAddToWishlist = async ({ userId, productId }) => {
  try {
    const response = await fetch(
      `http://localhost:5000/manage/utils/addtowishlist`,
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
      `http://localhost:5000/manage/utils/addproducttocart`,
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
