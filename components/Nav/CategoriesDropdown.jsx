"use client";

import Link from "next/link";
import ErrorBlock from "components/Functions/ErrorBlock";
import { UseFetcher } from "components/Functions/UseFetcher";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdFormatListBulleted } from "react-icons/md";

export default function CategoriesDropdown() {
  const {
    data: categories,
    isLoading,
    error,
  } = UseFetcher("http://localhost:5000/manage/category/withsubcategories");

  if (isLoading)
    return (
      <button className="button-primary dropdown gap-1 px-4">
        <MdFormatListBulleted className="icons" />
        <>Категории</>
      </button>
    );
  if (error) return <ErrorBlock height={"h-20 lg:h-[280px]"} width="w-48" />;

  return (
    <div>
      <Menu as="div" className="relative inline-block">
        <div>
          <Menu.Button className="button-primary dropdown gap-1 px-4">
            <MdFormatListBulleted className="icons" />
            <>Категории</>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="bg-white border border-grey-200 rounded-3xl shadow-md absolute left-0 outline-none origin-top-right p-2 mt-4 w-48">
            {categories?.map((category) => (
              <div key={category.id} className="rounded-3xl">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={"/category/" + category.id}
                      className={`${
                        active ? "bg-calm text-white" : ""
                      } group flex-row-center text-start transition rounded-3xl py-2 px-3 w-full`}
                    >
                      {category.title}
                    </Link>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
