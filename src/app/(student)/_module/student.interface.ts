import { IUser } from "@/app/_module/app.interface";
import { IEnrolledCourse } from "./_interfaces/course.interface";

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

export interface IBanner {
  slug: string;
  message: string;
  link?: string;
  buttonText?: string;
  permanent: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface ISubscriptionPlanFeature {
  id: string;
  planId: string;
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
  price: string;
  isDeal: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  features: ISubscriptionPlanFeature[];
}