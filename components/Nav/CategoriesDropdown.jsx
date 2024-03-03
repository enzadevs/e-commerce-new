"use client";

import Link from "next/link";
import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { UseFetcher } from "components/Functions/UseFetcher";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { MdFormatListBulleted } from "react-icons/md";

export default function CategoriesDropdown() {
  const [isShowing, setIsShowing] = useState(false);

  const {
    data: categories,
    isLoading,
    error,
  } = UseFetcher("http://localhost:5000/manage/category/withsubcategories");

  if (isLoading)
    return (
      <button className="button-primary dropdown gap-2 px-4">
        <MdFormatListBulleted className="icons" />
        <>Категории</>
      </button>
    );
  if (error)
    return <ErrorBlock height={"h-20 lg:h-[280px]"} width="w-full max-w-7xl" />;

  return (
    <div>
      <button
        className="button-primary dropdown gap-2 px-4"
        onClick={() => setIsShowing((current) => !current)}
      >
        <MdFormatListBulleted className="icons" />
        <>Категории</>
      </button>
      <Transition
        show={isShowing}
        className="absolute top-24 h-auto z-20"
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-haze-200 rounded-3xl shadow-lg h-full w-fit">
          <div className="p-4 h-full w-full">
            <div className="categories-grid">
              {categories?.map((category) => (
                <div key={category.id}>
                  <Link
                    href={
                      "http://localhost:5000/manage/category/fetch/" +
                      category.id
                    }
                    className="nav-link flex-row-center font-bold h-8 w-fit"
                  >
                    {category.title}
                  </Link>
                  <div className="flex flex-col">
                    {category.subCategories.map((subCategory) => (
                      <Link
                        href={
                          "http://localhost:5000/manage/subcategory/fetch/" +
                          subCategory.id
                        }
                        key={subCategory.id}
                        className="nav-link h-6"
                      >
                        {subCategory.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
