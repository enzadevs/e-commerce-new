import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const IsSignedInStore = create(
  persist(
    (set, get) => ({
      currentUserObject: {},
      updateCurrentUserObject: (userData) =>
        set((state) => ({ currentUserObject: userData })),
      isSignedIn: false,
      setIsSignedIn: (isSignedIn) => set(() => ({ isSignedIn: isSignedIn })),
    }),
    {
      name: "user-token",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
