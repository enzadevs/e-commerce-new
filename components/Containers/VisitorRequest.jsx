"use client";

import { useEffect } from "react";
import { IsSignedInStore } from "utils/IsSignedIn";

export default function VisitorRequest() {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);

  useEffect(() => {
    const sendPostRequest = async () => {
      if (isSignedIn === false) {
        await fetch(`http://localhost:3001/visitor/new/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ boolean: false }),
        });
        return;
      } else {
        await fetch(`http://localhost:3001/visitor/new/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ boolean: true }),
        });
        return;
      }
    };
    sendPostRequest();
  }, [isSignedIn]);

  return null;
}
