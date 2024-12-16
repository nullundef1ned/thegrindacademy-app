import { IUserInfo } from "@/app/_module/app.interface";
import { LessonStatusType } from "@/app/_module/app.type";

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
  completionPercentage: number;
  id: string;
  userId: string;
  courseId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  course: ICourse;
}

export interface IStudentEnrolledCourseDetail extends IStudentEnrolledCourse {
  lessons: IEnrolledCourseLesson[];
}

export interface ICompletionCertificate {
  id: string;
  userId: string;
  courseId: string;
  certificateUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IStudentEnrolledCourseDetail extends IStudentEnrolledCourse {
  lessons: IEnrolledCourseLesson[];
  course: ICourseDetail;
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
  courseId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseLesson {
  id: string;
  content: string | null;
  courseId: string;
  position: number;
  title: string;
  slug: string;
  studyTimeInMinutes: number;
  description: string | null;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEnrolledCourseLesson {
  id: string;
  userCourseId: string;
  position: number;
  lessonId: string;
  status: LessonStatusType;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  lesson: ICourseLesson;
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
  description: string;
  media: ICourseMedia;
  slug: string;
  telegramChannelId: string;
  status: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseDetail extends ICourse {
  lessons: ICourseLesson[];
  materials: ICourseMaterial[];
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