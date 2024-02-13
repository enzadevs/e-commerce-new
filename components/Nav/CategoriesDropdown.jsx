"use client";

import Link from "next/link";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { MdFormatListBulleted } from "react-icons/md";

export default function CategoriesDropdown() {
  const [isShowing, setIsShowing] = useState(false);

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
        className="center absolute top-24 left-0 h-auto w-full z-20"
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-haze-200 rounded-3xl shadow-lg center h-full w-fit max-w-7xl">
          <div className="p-4 h-full w-full">
            <div className="categories-grid">
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Электроника
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Здоровье
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Косметика
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Ежедневные
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Для женщин
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Для мужчин
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Детям
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
                <Link href="/" className="nav-link h-6">
                  Под категория
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
