import { IUser } from "@/app/_module/app.interface";

export enum AffiliateResourceType {
  MESSAGE = "message",
  IMAGE = "image",
  VIDEO = "video",
  DOCUMENT = "document",
}

export interface IAffiliate extends IUser {
  referrals: number,
  views: number,
  payout: number,
}

export interface IAffiliateResource {
  id: string,
  type: AffiliateResourceType,
  telegramChannelId: string,
  telegramMessageId: string,
  url?: string,
  message?: string,
  updatedAt: string,
  createdAt: string
}

export interface IAffiliateTelegramCommunityUpdate {
  telegramChannelId: string,
}

export interface IAffiliateResourceForm {
  type: AffiliateResourceType,
  message?: string,
  url?: string,
}

export interface ISendTelegramMessage {
  courseIds: string[],
  message: string,
}