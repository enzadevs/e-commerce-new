"use client";

import { useRouter } from "next/navigation";
import { baseUrlApi } from "@/utils/Utils";
import { IsSignedInStore } from "@/utils/IsSignedIn";

export default function SendVisitorRequest() {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);
  const router = useRouter();

  const sendPostRequest = async () => {
    await fetch(`${baseUrlApi}/user/visitors/new/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boolean: isSignedIn }),
    });
  };

  return (
    <button
      onClick={() => {
        sendPostRequest();
        router.push("/");
      }}
      className="button-primary px-4"
    >
      Super Market
    </button>
  );
}
