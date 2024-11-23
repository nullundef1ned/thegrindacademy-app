import { create } from "@/stores";
import { devtools, persist } from "zustand/middleware";

import { IBanner, ISubscription } from "./student.interface";
import fakerUtil from "@/utils/faker.util";

export interface StudentState {
  banners: IBanner[];
  subscription: ISubscription | null;
}

const initialState: StudentState = {
  banners: [],
  subscription: fakerUtil.subscription || null,
}

type Actions = {
  setBanners: (banners: IBanner[]) => void;
}

type StudentStore = StudentState & Actions;

export const useStudentStore = create<StudentStore>()(
  devtools(persist((set) =>
  ({
    ...initialState,
    setBanners: (banners) => set({ banners }),
  }), { name: 'the-grind::student-store' }))
)
