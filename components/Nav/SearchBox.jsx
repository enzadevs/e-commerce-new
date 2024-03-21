"use client";

import { useRef } from "react";
import { useRouter } from "../../navigation.js";
import { BiSearch } from "react-icons/bi";

export default function SearchBox({ placeholder }) {
  const queryRef = useRef();
  const router = useRouter();

  return (
    <div className="flex-grow flex-row-center relative h-11 w-full md:w-auto">
      <input
        type="text"
        ref={queryRef}
        className="search-input w-full"
        placeholder={placeholder}
        minLength={2}
        maxLength={64}
        onKeyDown={(event) => {
          if (event.key === "Enter" && queryRef.current.value.length >= 2) {
            router.push(`/search/` + queryRef.current.value);
          }
        }}
      ></input>
      <button
        onClick={() => {
          if (queryRef.current.value.length >= 2) {
            router.push(`/search/` + queryRef.current.value);
          }
        }}
        className="rounded-md absolute center right-0 h-9 w-9 sm:h-11 sm:w-11"
      >
        <BiSearch className="text-blueviolet-700 h-6 w-6" />
      </button>
    </div>
  );
}
