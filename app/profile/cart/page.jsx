// "use client";

// import LoadingBlock from "components/Functions/LoadingBlock";
// import ErrorBlock from "components/Functions/ErrorBlock";
import CartProductContainer from "components/Containers/CartProductContainer";
// import { IsSignedInStore } from "utils/IsSignedIn";
// import { UseFetcher } from "components/Functions/UseFetcher";

export default async function ShoppingCartPage() {
  // const currentUserObject = IsSignedInStore((state) => state.currentUserObject);

  // const { data, isLoading, error } = UseFetcher(
  //   `http://localhost:5000/users/get/` + currentUserObject.user.id
  // );

  // if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  // if (error) return <ErrorBlock height={"h-20"} width="" />;

  // const { shoppingCart } = data;

  const response = await fetch("http://localhost:5000/products/all");
  const data = await response.json();

  return (
    <div className="flex flex-col gap-4 mt-2">
      {/* {shoppingCart?.map((cartItem) => {
        const productData = cartItem.productsList[0].product;
        return (
          <>
            <CartProductContainer productData={productData} />
          </>
        );
      })} */}
      {data.slice(0, 5).map((item) => {
        return (
          <>
            <CartProductContainer productData={item} />
          </>
        );
      })}
    </div>
  );
}
