"use client";

import { useEffect } from "react";
import { IsSignedInStore } from "utils/IsSignedIn";
import SignUp from "components/Containers/SignUp";
import ProfileInfoContainer from "components/Containers/ProfileInfoContainer";

export default function ProfilePage() {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);

  useEffect(() => {
    console.log(true);
  }, []);

  return (
    <div className="flex flex-col gap-4" suppressHydrationWarning>
      {isSignedIn ? (
        <ProfileInfoContainer />
      ) : (
        <div className="center">
          <SignUp />
        </div>
      )}
    </div>
  );
}
