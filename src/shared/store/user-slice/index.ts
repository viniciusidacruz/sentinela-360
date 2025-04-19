import { StateCreator } from "zustand";

import { User } from "@/generated/prisma";

import { UserSlice } from "./types";

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
});
