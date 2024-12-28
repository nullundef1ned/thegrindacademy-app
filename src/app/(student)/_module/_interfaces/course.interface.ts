import { CourseStatusType, EnrolledCourseStatusType, LessonStatusType } from "@/app/_module/app.type";

export interface ICourse {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  media: ICourseMedia;
  slug: string;
  telegramChannelId: string;
  status: EnrolledCourseStatusType & CourseStatusType;
  isFeatured: boolean;
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

export interface ICourseMedia {
  id: string;
  courseId: string;
  thumbnailUrl: string;
  imageUrls: string[];
  introVideoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseMaterial {
  id: string;
  courseId: string;
  title: string;
  content: string;
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

export interface IEnrolledCourse {
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

export interface ICourseDetail extends ICourse {
  enrollmentCount: number;
  lessons: ICourseLesson[];
  materials: ICourseMaterial[];
}

export interface IEnrolledCourseDetail extends IEnrolledCourse {
  lessons: IEnrolledCourseLesson[];
  course: ICourseDetail;
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