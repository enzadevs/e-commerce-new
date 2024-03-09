"use client";

import { useRef } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchBox() {
  const queryRef = useRef();

  return (
    <div className="flex-grow flex-row-center relative h-11 w-full md:w-auto">
      <input
        type="text"
        ref={queryRef}
        className="search-input w-full"
        placeholder="Поиск..."
        minLength={2}
        maxLength={64}
        onKeyDown={(event) => {
          if (event.key === "Enter" && queryRef.current.value.length >= 2) {
            window.location.href = `/search/` + queryRef.current.value;
          }
        }}
      ></input>
      <button
        onClick={() => {
          window.location.href = `/search/` + queryRef.current.value;
        }}
        className="bg-calm rounded-r-3xl absolute center right-0 h-9 sm:h-11 w-9 sm:w-11"
      >
        <BiSearch className="text-white h-6 w-6" />
      </button>
    </div>
  );
}
