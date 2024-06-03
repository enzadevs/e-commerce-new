"use client";

import { Provider } from "../../provider";

export default function WishListLayout({ children, params }) {
  return <Provider locale={params.locale}>{children}</Provider>;
}
