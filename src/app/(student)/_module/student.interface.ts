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
  name: string;
  price: number;
  duration: number;
  renewalDate: string;
  status: 'active' | 'inactive';
}

export interface IOverviewStatistics {
  completedCourses: number;
  activeCourses: number;
  enrolledCourses: number;
}

export interface IReferralStatistics {
  totalReferrals: number;
  totalPayouts: number;
  totalEarnings: number;
}


export interface IPayout {
  id: string;
  name: string;
  amount: number;
  status: 'pending' | 'paid';
  createdAt: string;
}

export interface IBanner {
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