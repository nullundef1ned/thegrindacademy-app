import { create, resetAllStores } from "@/stores";
import { devtools, persist } from "zustand/middleware";
import storageUtil, { StorageKey } from "@/utils/storage.util";
import { IAuthResponse, IUser } from "./app.interface";

export interface AppState {
  user: IUser | null;
  token: string | null;
}

const initialState: AppState = {
  user: storageUtil.getItem(StorageKey.user) || null,
  token: storageUtil.getItem(StorageKey.token) || null,
}

type Actions = {
  setUser: (user: IUser) => void;
  setToken: (token: string) => void;
  initialize: (payload: IAuthResponse) => void;
  logout: () => void;
}

type AppStore = AppState & Actions;

export const useAppStore = create<AppStore>()(
  devtools(persist((set) =>
  ({
    ...initialState,
    setUser: (user) => {
      set({ user })
      storageUtil.saveItem(StorageKey.user, user)
    },
    setToken: (token) => {
      set({ token })
      storageUtil.saveItem(StorageKey.token, token)
    },
    initialize: (payload) => {
      set({ user: payload.user, token: payload.accessToken })
      storageUtil.saveItem(StorageKey.user, payload.user)
      storageUtil.saveItem(StorageKey.token, payload.accessToken)
    },
    logout: () => {
      resetAllStores();
      set({ user: null, token: null })
      storageUtil.deleteItem(StorageKey.user)
      storageUtil.deleteItem(StorageKey.token)
    }
  }), { name: 'the-grind::store' }))
)