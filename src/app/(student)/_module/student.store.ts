import { create } from "@/stores";
import { devtools, persist } from "zustand/middleware";

import { IBanner, IBankDetails, IReferral } from "./student.interface";

export interface StudentState {
  banners: IBanner[];
  referral: IReferral | null;
  bankDetails: IBankDetails | null;
}

const initialState: StudentState = {
  banners: [],
  referral: null,
  bankDetails: null,
}

type Actions = {
  setBanners: (banners: IBanner[]) => void;
  setReferral: (referral: IReferral) => void;
  setBankDetails: (bankDetails: IBankDetails) => void;
}

type StudentStore = StudentState & Actions;

export const useStudentStore = create<StudentStore>()(
  devtools(persist((set) =>
  ({
    ...initialState,
    setBanners: (banners) => set({ banners }),
    setReferral: (referral) => set({ referral }),
    setBankDetails: (bankDetails) => set({ bankDetails }),
  }), { name: 'the-grind::student-store' }))
)
