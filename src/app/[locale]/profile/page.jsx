"use client";

import { Provider } from "../provider";
import SignUp from "@/components/Containers/SignUp";
import ProfileInfoContainer from "@/components/Containers/ProfileInfoContainer";
import { IsSignedInStore } from "@/utils/IsSignedIn";

export default function ProfilePage({ params }) {
  const isSignedIn = IsSignedInStore((state) => state.isSignedIn);

  return (
    <div className="flex flex-col gap-4" suppressHydrationWarning>
      <Provider locale={params.locale}>
        {isSignedIn ? (
          <ProfileInfoContainer />
        ) : (
          <div className="center">
            <SignUp />
          </div>
        )}
      </Provider>
    </div>
  );
}
