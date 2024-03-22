"use client";

import LoadingBlock from "components/Functions/LoadingBlock.jsx";
import ErrorBlock from "components/Functions/ErrorBlock.jsx";
import { Link } from "../../../navigation.js";
import { UseFetcher } from "components/Functions/UseFetcher.jsx";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation.js";

export default function CategoriesPage() {
  const t = useTranslations("Pages");
  const pathname = usePathname();

  const { data, isLoading, error } = UseFetcher(
    "http://localhost:3001/manage/categories/all"
  );
  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  const useTmTitles = pathname.includes("/tm");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">{t("allCategories")}</h2>
      <div className="flex flex-col gap-2 w-fit">
        {data?.map((item) => {
          return (
            <Link
              key={item.id}
              href={"/categories/" + item.id}
              className="button-outline px-4 w-fit"
            >
              {useTmTitles ? item.titleTm : item.titleRu}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
