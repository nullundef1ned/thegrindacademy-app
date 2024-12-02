import { create } from "@/stores";
import { devtools, persist } from "zustand/middleware";

import { IBanner, IBankDetails, IReferral, ISubscription } from "./student.interface";
import fakerUtil from "@/utils/faker.util";

export interface StudentState {
  banners: IBanner[];
  referral: IReferral | null;
  bankDetails: IBankDetails | null;
  subscription: ISubscription | null;
}

const initialState: StudentState = {
  banners: [],
  referral: null,
  bankDetails: null,
  subscription: fakerUtil.subscription || null,
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
