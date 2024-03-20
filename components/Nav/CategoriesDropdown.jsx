"use client";

import ErrorBlock from "components/Functions/ErrorBlock";
import { Link } from "../../navigation.js";
import { Fragment } from "react";
import { UseFetcher } from "components/Functions/UseFetcher";
import { Menu, Transition } from "@headlessui/react";
import { MdFormatListBulleted } from "react-icons/md";

export default function CategoriesDropdown() {
  const {
    data: categories,
    isLoading,
    error,
  } = UseFetcher("http://localhost:3001/manage/categories/all");

  if (isLoading) {
    return (
      <button className="button-primary dropdown gap-1 px-4">
        <MdFormatListBulleted className="icons" />
        <>Категории</>
      </button>
    );
  }
  if (error) return <ErrorBlock height={"h-20 lg:h-[280px]"} width="w-48" />;

  return (
    <div>
      <Menu as="div" className="relative inline-block">
        <Menu.Button className="button-primary dropdown gap-1 px-4">
          <MdFormatListBulleted className="icons" />
          <>Категории</>
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
          <Menu.Items className="bg-white border border-gallery-200 rounded-md shadow-sm flex flex-row gap-2 absolute left-0 outline-none origin-top-right p-2 mt-2">
            {categories?.map((category) => (
              <div key={category.id} className="w-full">
                <Menu.Item className="flex-row items-center">
                  {({ active }) => (
                    <Link
                      href={"/categories/" + category.id}
                      className={`${
                        active ? "bg-blueviolet-700 text-white" : ""
                      } w-28 flex items-center text-start font-bold transition rounded-md p-2`}
                    >
                      {category.titleRu}
                    </Link>
                  )}
                </Menu.Item>
                {category.subCategories?.length > 0 && (
                  <ul className="flex flex-col">
                    {category.subCategories.map((subCategory) => (
                      <Link
                        href={"/subcategories/" + subCategory.id}
                        key={subCategory.id}
                        className="text-gray-700 hover:text-blueviolet-700 p-2"
                      >
                        {subCategory.titleRu}
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
