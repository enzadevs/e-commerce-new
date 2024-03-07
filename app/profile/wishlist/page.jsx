"use client";

import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { UseFetcher } from "components/Functions/UseFetcher";
import { IsSignedInStore } from "utils/IsSignedIn";
import ProductContainer from "components/Containers/ProductContainer";
import { SuccessToast, ErrorToast } from "components/Functions/Toaster";

export default function WishListPage() {
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:5000/users/get/` + currentUserObject.user.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="" />;

  const { wishList } = data;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Избранные</h2>
      <div className="products-grid">
        {/* {wishList?.map((item) => {
          return <ProductContainer key={item.id} productData={item} />;
        })} */}
        
      </div>
    </div>
  );
}
