import { create, resetAllStores } from "@/stores";
import { devtools, persist } from "zustand/middleware";
import storageUtil, { StorageKey } from "@/utils/storage.util";
import { IAuthResponse } from "./app.interface";
import { queryClient } from "@/providers/tanstack-query.provder";

export interface AppState {
  token: string | null;
}

const initialState: AppState = {
  token: storageUtil.getItem(StorageKey.token) || null,
}

type Actions = {
  setToken: (token: string) => void;
  initialize: (payload: IAuthResponse) => void;
  logout: () => void;
}

type AppStore = AppState & Actions;

export const useAppStore = create<AppStore>()(
  devtools(persist((set) =>
  ({
    ...initialState,
    setToken: (token) => {
      set({ token })
      storageUtil.saveItem(StorageKey.token, token)
    },
    initialize: (payload) => {
      set({ token: payload.accessToken })
      storageUtil.saveItem(StorageKey.token, payload.accessToken)
    },
    logout: () => {
      resetAllStores();
      queryClient.clear();
      set({ token: null })
      storageUtil.deleteItem(StorageKey.user)
      storageUtil.deleteItem(StorageKey.token)
    }
  }), { name: 'the-grind::store' }))
)