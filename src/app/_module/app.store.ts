import { devtools, persist } from "zustand/middleware";
import { create } from "@/stores";
import storageUtil, { StorageKey } from "@/utils/storage.util";

export type AppState = {
  user: null;
}

const initialState: AppState = {
  user: storageUtil.getItem(StorageKey.user) || null,
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