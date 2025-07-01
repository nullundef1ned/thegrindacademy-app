export interface IUserForm {
  firstName: string;
  lastName: string;
  email: string;
  telegramUserName?: string;
  subscriptionPlanId: string;
  autoRenewal: boolean;
  referralCode?: string;
  courseSlug?: string;
}

export interface IUserSubscriptionPlanCreate {
  subscriptionPlanId?: string;
  startDate?: string;
  userId: string;
}

export interface IUserSubscriptionPlanUpdate extends IUserSubscriptionPlanCreate {
  status: 'active' | 'expired';
  subscriptionId: string;
}