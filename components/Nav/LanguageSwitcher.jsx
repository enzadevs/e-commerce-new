"use client";

import { useState } from "react";
import { useRouter, usePathname } from "../../navigation.js";
import { LiaGlobeEuropeSolid } from "react-icons/lia";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const [currentLocale, setCurrentLocale] = useState("ru");

  const toggleLocale = () => {
    const newLocale = currentLocale === "ru" ? "tm" : "ru";
    setCurrentLocale(newLocale);
    router.push(pathname, { locale: newLocale });
  };

  return (
    <button className="button-primary px-4" onClick={toggleLocale}>
      <LiaGlobeEuropeSolid className="h-6 w-6" />
      <p className="hidden lg:block">
        {currentLocale === "ru" ? "Русский" : "Türkmen"}
      </p>
    </button>
  );
}
