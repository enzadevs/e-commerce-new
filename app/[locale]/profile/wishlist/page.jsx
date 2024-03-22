"use client";

import SignedUserWishlistContainer from "components/Containers/SignedUserWishlistContainer";
import { IsSignedInStore } from "utils/IsSignedIn";
import { useTranslations } from "next-intl";

export default function WishListPage() {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);
  const t = useTranslations("Pages");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">{t("wishlistTitle")}</h2>
      {isSignedIn ? (
        <SignedUserWishlistContainer />
      ) : (
        <p>{t("wishlistText")}</p>
      )}
    </div>
  );
}
