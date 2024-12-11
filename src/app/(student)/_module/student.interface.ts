import { IUserInfo } from "@/app/_module/app.interface";

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

export interface IStudentEnrolledCourse {
  completionPercentage: string;
  id: string;
  userId: string;
  courseId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  course: ICourse;
}

export interface IDashboardData {
  course: {
    active: IStudentEnrolledCourse,
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

export interface IStudentAccountInformationForm {
  info: Partial<IUserInfo>
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

export interface ICourseMaterial {
  id: string;
  name: string;
  link: string;
  type: 'video' | 'document' | 'image';
}

export type ICourseLessonContent = {
  video: string;
  html?: string;
} | {
  video?: string;
  html: string;
};

export interface ICourseEnrollment {
  lessonsCompleted: number;
  isCompleted: boolean;
  certificateLink?: string;
}

export interface ICourseLesson {
  id: string;
  name: string;
  content: ICourseLessonContent;
  completed: boolean;
  studyTime: number;
}

export interface ICourseMedia {
  id: string;
  courseId: string;
  thumbnailUrl: string;
  imageUrls: string[];
  introVideoUrl: string;
}

export interface ICourse {
  id: string;
  name: string;
  shortDescription: string;
  materials: ICourseMaterial[];
  description: string;
  thumbnail: string;
  introVideo: string;
  media: ICourseMedia;
  lessons: ICourseLesson[];
  slug: string;
  telegramChannelId: string;
  status: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
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