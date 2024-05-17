"use client";

import ErrorBlock from "components/Functions/ErrorBlock";
import { baseUrlApi } from "utils/Utils.jsx";
import { Link } from "../../navigation.js";
import { Fragment } from "react";
import { UseFetcher } from "components/Functions/UseFetcher";
import { Menu, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation.js";
import { MdFormatListBulleted } from "react-icons/md";

export default function CategoriesDropdown({ title }) {
  const pathname = usePathname();

  const { data, isLoading, error } = UseFetcher(
    `${baseUrlApi}/management/categories/fetch/all`
  );

  if (isLoading) {
    return (
      <button className="button-primary dropdown gap-1 px-4">
        <MdFormatListBulleted className="icons" />
        <>Категории</>
      </button>
    );
  }
  if (error) return <ErrorBlock height={"h-20 lg:h-[280px]"} width="w-48" />;

  const useTmTitles = pathname.includes("/tm");

  return (
    <Menu as="div" className="inline-block">
      <Menu.Button className="button-primary dropdown gap-1 px-4">
        <MdFormatListBulleted className="icons" />
        <>{title}</>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute outline-none origin-top-right mt-2">
          <div className="bg-white border border-gallery-200 rounded-md shadow-sm flex flex-row gap-2 p-2 w-fit">
            {data?.categories?.map((category) => (
              <div key={category.id}>
                <Menu.Item className="flex-row items-center">
                  {({ active }) => (
                    <Link
                      href={"/categories/" + category.id}
                      className={`${
                        active ? "bg-blueviolet-700 text-white" : ""
                      } flex items-center text-start font-bold transition rounded-md p-2`}
                    >
                      {useTmTitles ? category.nameTm : category.nameRu}
                    </Link>
                  )}
                </Menu.Item>
                {category?.SubCategories?.length > 0 && (
                  <ul className="flex flex-col">
                    {category?.SubCategories?.map((subCategory) => (
                      <Link
                        href={"/subcategories/" + subCategory.id}
                        key={subCategory.id}
                        className="text-gray-700 hover:text-blueviolet-700 p-2"
                      >
                        {useTmTitles ? subCategory.nameTm : subCategory.nameRu}
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
