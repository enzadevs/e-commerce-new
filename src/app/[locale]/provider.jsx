"use client";

import { I18nProviderClient } from "@/locales/client";

export function Provider({ locale, children }) {
  return (
    <I18nProviderClient locale={locale} fallback={<p>Loading...</p>}>
      {children}
    </I18nProviderClient>
  );
}
