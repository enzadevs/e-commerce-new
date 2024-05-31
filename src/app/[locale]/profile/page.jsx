"use client";

import SignUp from "components/Containers/SignUp";
import ProfileInfoContainer from "components/Containers/ProfileInfoContainer";
import { IsSignedInStore } from "utils/IsSignedIn";

export default function ProfilePage() {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);

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
