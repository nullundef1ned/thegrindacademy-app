import { create } from "@/stores";
import { devtools, persist } from "zustand/middleware";

import { IBanner, IBankDetails, IReferral } from "../app/(student)/_module/student.interface";

export interface AffiliateState {
  banners: IBanner[];
  referral: IReferral | null;
  bankDetails: IBankDetails | null;
}

const initialState: AffiliateState = {
  banners: [],
  referral: null,
  bankDetails: null,
}

type Actions = {
  setBanners: (banners: IBanner[]) => void;
  setReferral: (referral: IReferral) => void;
  setBankDetails: (bankDetails: IBankDetails) => void;
}

type AffiliateStore = AffiliateState & Actions;

export const useAffiliateStore = create<AffiliateStore>()(
  devtools(persist((set) =>
  ({
    ...initialState,
    setBanners: (banners) => set({ banners }),
    setReferral: (referral) => set({ referral }),
    setBankDetails: (bankDetails) => set({ bankDetails }),
  }), { name: 'the-grind::affiliate-store' }))
)