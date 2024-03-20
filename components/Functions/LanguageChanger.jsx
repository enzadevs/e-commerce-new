"use client";

import { useRouter, usePathname } from "@/navigation";

export default function LanguageChanger({ locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e) => {
    router.push(pathname, { locale: e.target.value });
  };

  return (
    <select value={locale} onChange={handleChange}>
      <option value="ru">Язык</option>
      <option value="tm">Dil</option>
    </select>
  );
}
