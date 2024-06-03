"use client";

import WishlistContainer from "@/components/Containers/WishListContainer";
import { IsSignedInStore } from "@/utils/IsSignedIn";
import { useScopedI18n } from "@/locales/client";

export default function WishListPage() {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);
  const scopedT = useScopedI18n("Pages");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">{scopedT("wishlistTitle")}</h2>
      {isSignedIn ? <WishlistContainer /> : <p>{scopedT("wishlistText")}</p>}
    </div>
  );
}
