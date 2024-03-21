"use client";

import SignedUserWishlistContainer from "components/Containers/SigneduserWishlistContainer";
import { IsSignedInStore } from "utils/IsSignedIn";

export default function WishListPage() {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Избранные</h2>
      {isSignedIn ? (
        <SignedUserWishlistContainer />
      ) : (
        <p className="mt-4">
          Войдите или создайте аккаунт чтобы добавлять сюда продукты.
        </p>
      )}
    </div>
  );
}
