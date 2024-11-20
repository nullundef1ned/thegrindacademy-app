import { devtools, persist } from "zustand/middleware";
import { create } from "@/stores";
import storageUtil, { StorageKey } from "@/utils/storage.util";
import { IUser } from "./app.interface";
import fakerUtil from "@/utils/faker.util";

export interface AppState {
  user: IUser | null;
}

const initialState: AppState = {
  user: storageUtil.getItem(StorageKey.user) || fakerUtil.user || null,
}

type Actions = {
  // setUser: (user: UserType) => void;
  initialize: () => void;
}

type AppStore = AppState & Actions;

export const useAppStore = create<AppStore>()(
  devtools(persist((set) =>
  ({
    ...initialState,
    // setUser: (user) => set({ user }),
    initialize: () => set({}),
  }), { name: 'the-grind::store' }))
)