"use client";

import SignedUserCartContainer from "components/Containers/SignedUserCartContainer";
import { IsSignedInStore } from "utils/IsSignedIn";
import { useTranslations } from "next-intl";

export default function ShoppingCartPage() {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);
  const t = useTranslations("Pages");

  return (
    <div className="flex flex-col gap-4">
      {isSignedIn ? (
        <SignedUserCartContainer />
      ) : (
        <p className="mt-4">{t("shoppingCartText")}</p>
      )}
    </div>
  );
}
