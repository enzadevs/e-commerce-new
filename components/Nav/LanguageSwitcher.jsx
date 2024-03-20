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
    <button className="flex flex-col items-center" onClick={toggleLocale}>
      <LiaGlobeEuropeSolid className="h-6 w-6" />
      <p className="hidden lg:block">
        {currentLocale === "ru" ? "Язык" : "Dil"}
      </p>
    </button>
  );
}
