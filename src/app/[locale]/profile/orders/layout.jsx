"use client";

import { Provider } from "../../provider";

export default function OrderViewLayout({ children, params }) {
  return <Provider locale={params.locale}>{children}</Provider>;
}
