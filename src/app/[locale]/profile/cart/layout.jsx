"use client";

import { Provider } from "../../provider";

export default function CartLayout({ children, params }) {
  return <Provider locale={params.locale}>{children}</Provider>;
}
