import { create } from "@/stores";
import { devtools, persist } from "zustand/middleware";
import storageUtil, { StorageKey } from "@/utils/storage.util";
import { IUser } from "./app.interface";

import fakerUtil from "@/utils/faker.util";

export interface AppState {
  user: IUser | null;
  token: string | null;
}

const initialState: AppState = {
  user: storageUtil.getItem(StorageKey.user) || fakerUtil.user || null,
  token: storageUtil.getItem(StorageKey.token) || null,
}

type Actions = {
  setUser: (user: IUser) => void;
  setToken: (token: string) => void;
  initialize: () => void;
}

type AppStore = AppState & Actions;

export const useAppStore = create<AppStore>()(
  devtools(persist((set) =>
  ({
    ...initialState,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    initialize: () => set({}),
  }), { name: 'the-grind::store' }))
)