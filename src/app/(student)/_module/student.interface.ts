import { IUser } from "@/app/_module/app.interface";
import { ICourse, IEnrolledCourse } from "./_interfaces/course.interface";

export interface IReferral {
  id: string;
  userId: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBankDetails {
  id: string;
  userId: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDashboardData {
  course: {
    active: IEnrolledCourse,
    count: {
      completed: number;
      active: number;
      enrolled: number;
    }
  }
}

export interface IBankDetailForm {
  bankName: string;
  bankCode: string;
  accountNumber: string;
}

export interface IBankDetailCreationResponse {
  bankDetail: IBankDetails;
  referralCode: IReferral;
}

export interface IContactSupportForm {
  subject: string;
  message: string;
}

export interface ISubscriptionForm {
  subscriptionPlanId: string;
  autoRenewal: boolean;
}

export interface ISubscription {
  id: string;
  userId: string;
  subscriptionPlanId: string;
  status: 'active' | 'inactive';
  autoRenewal: boolean;
  startDate: string;
  endDate: string;
  paymentAuthorization: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  subscriptionPlan: Omit<ISubscriptionPlan, 'features'>;
}

export interface ISubscriptionResponse {
  active: ISubscription | null;
  upcoming: ISubscription | null;
  unpaid: IBillingHistory | null;
}

export interface IUserSubscription {
  id: string;
  status: string,
  userId: string;
  subscriptionPlanId: string;
  autoRenewal: boolean;
  startDate: string;
  endDate: string;
  updatedAt: string;
  createdAt: string;
  subscriptionPlan: ISubscriptionPlan;
  paymentAuthorization: string | null;
  deletedAt: string | null;
  billingHistory: Exclude<IBillingHistory, 'userSubscription'>[];
}

export interface ISubscriptionRenewalResponse {
  userSubscription: IUserSubscription,
  paymentData: {
    authorization_url: string;
    access_code: string;
    reference: string;
  }
}

export interface IOverviewStatistics {
  completedCourses: number;
  activeCourses: number;
  enrolledCourses: number;
}

export interface IReferralStatistics {
  totalReferredUsers: number;
  totalPayoutsProcessed: number;
  totalPayoutsAmount: number;
}

export interface IUserReferral {
  id: string;
  userId: string;
  refereeId: string;
  referee: IUser;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IPayout {
  id: string;
  userId: string;
  userReferralId: string;
  amount: string;
  status: string;
  reference: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userReferral: IUserReferral;
}

export interface IBillingHistory {
  paymentLink: string | null;
  id: string;
  userId: string;
  userSubscriptionId: string;
  price: string;
  amountPaid: string;
  amountReceived: string;
  startDate: string;
  endDate: string;
  paymentStatus: string;
  paymentReference: string;
  paymentAccessCode: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userSubscription: Exclude<IUserSubscription, 'billingHistory'>;
}
export interface IBanner {
  slug: string;
  message: string;
  link?: string;
  blank?: boolean;
  buttonText?: string;
  permanent: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface ISubscriptionPlanFeature {
  id: string;
  content: string;
  label: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  frequency: string;
  duration: number;
  upSellPrice?: number;
  price: number;
  isDeal: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  features: ISubscriptionPlanFeature[];
}

export interface ICourseCommunity {
  telegramChannelInviteLink: string;
  telegramChannelMemberCount: number;
  id: string;
  userId: string;
  courseId: string;
  status: 'pending' | 'completed';
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  course: Exclude<ICourse, 'media'>;
}