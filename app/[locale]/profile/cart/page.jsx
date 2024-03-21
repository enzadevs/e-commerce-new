"use client";

import SignedUserCartContainer from "components/Containers/SignedUserCartContainer";
import { IsSignedInStore } from "utils/IsSignedIn";

export default function ShoppingCartPage() {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);

  return (
    <div className="flex flex-col gap-4">
      {isSignedIn ? (
        <SignedUserCartContainer />
      ) : (
        <p className="mt-4">
          Войдите или создайте аккаунт чтобы добавлять сюда продукты.
        </p>
      )}
    </div>
  );
}
