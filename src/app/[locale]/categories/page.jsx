"use client";

import Link from "next/link";
import LoadingBlock from "@/components/Functions/LoadingBlock";
import ErrorBlock from "@/components/Functions/ErrorBlock";
import { baseUrlApi } from "@/utils/Utils";
import { UseFetcher } from "@/components/Functions/UseFetcher";
import { useScopedI18n } from "@/locales/client";
import { usePathname } from "next/navigation";

export default function CategoriesPage() {
  const scopedT = useScopedI18n("Pages");
  const pathname = usePathname();
  const useTmTitles = pathname.includes("/tm");

  const { data, isLoading, error } = UseFetcher(
    `${baseUrlApi}/management/categories/fetch/all`
  );
  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="w-full" />;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">{scopedT("allCategories")}</h2>
      <div className="flex flex-row flex-wrap gap-2 w-fit">
        {data?.categories?.map((item) => {
          return (
            <Link
              key={item.id}
              href={"/categories/" + item.id}
              className="button-outline px-4 w-fit"
            >
              {useTmTitles ? item.nameTm : item.nameRu}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
