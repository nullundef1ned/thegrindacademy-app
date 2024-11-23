import { create } from "@/stores";
import { devtools, persist } from "zustand/middleware";

import { IBanner } from "./student.interface";

export interface StudentState {
  banners: IBanner[];
}

const initialState: StudentState = {
  banners: [],
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
