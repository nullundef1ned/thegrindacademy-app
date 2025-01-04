import { IUser } from "@/app/_module/app.interface";

export interface IAffiliate extends IUser {
  referrals: number,
  views: number,
  payout: number,
}