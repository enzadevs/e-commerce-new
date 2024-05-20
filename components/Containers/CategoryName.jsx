"use client";

import { usePathname } from "next/navigation.js";

export default function CategoryName({ nameTm, nameRu }) {
  const pathname = usePathname();
  const useTmTitles = pathname.includes("/tm");
  return <h2 className="text-lg font-bold">{useTmTitles ? nameTm : nameRu}</h2>;
}
