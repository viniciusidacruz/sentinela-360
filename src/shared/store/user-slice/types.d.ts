import { User } from "@/generated/prisma";

export interface UserState {
  user: User | null;
}

export interface UserActions {
  setUser: (user: User) => void;
  clearUser: () => void;
}

export type UserSlice = UserState & UserActions;
