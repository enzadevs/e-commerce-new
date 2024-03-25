"use client";

import { useRouter } from "../../navigation.js";
import { IsSignedInStore } from "utils/IsSignedIn";

export default function SendVisitorRequest() {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);
  const router = useRouter();

  const sendPostRequest = async () => {
    const url = isSignedIn
      ? `http://localhost:3001/visitor/new/true`
      : `http://localhost:3001/visitor/new/false`;

    const body = { boolean: isSignedIn };

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  return (
    <button
      onClick={() => {
        router.push("/");
        sendPostRequest();
      }}
      className="button-primary px-4"
    >
      Super Market
    </button>
  );
}
