"use client";

import Link from "next/link";
import { useState } from "react";
import { MdFormatListBulleted } from "react-icons/md";

export default function CategoriesDropdown() {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div>
      <button
        className="button-primary dropdown gap-2 px-4"
        onClick={() => setIsHidden((current) => !current)}
      >
        <MdFormatListBulleted className="icons" />
        <>Категории</>
      </button>
      <div
        className={
          isHidden
            ? "hidden"
            : "center absolute top-24 left-0 h-auto w-full z-20"
        }
      >
        <div className="bg-haze-100 rounded-3xl shadow-lg center h-full w-fit max-w-7xl">
          <div className="p-4 h-full w-full">
            <div className="categories-grid">
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Elektronika
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Saglyk
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Öý harytlary
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Gündelik
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Aýallar üçin
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Erkekler üçin
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
              </ul>
              <ul className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="nav-link flex-row-center gap-1 font-bold h-8 w-fit"
                >
                  Çagalara
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
                <Link href="/" className="nav-link h-6">
                  Sub category
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
