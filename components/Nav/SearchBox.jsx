"use client";

import { BiSearch } from "react-icons/bi";

export default function SearchBox() {
  return (
    <div className="flex-grow flex-row-center relative h-full">
      <input
        type="text"
        className="search-input w-full"
        placeholder="Gözleg sözi"
        minLength={2}
        maxLength={64}
      ></input>
      <button className="bg-calm rounded-r-3xl absolute center right-0 h-9 sm:h-11 w-9 sm:w-11">
        <BiSearch className="text-white h-6 w-6" />
      </button>
    </div>
  );
}
