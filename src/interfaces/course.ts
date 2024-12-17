import { ICourse } from "@/app/(student)/_module/_interfaces/course.interface";

export interface IAdminCourse extends Omit<ICourse, 'media'> {
}

export interface IAdminCourseForm {
  name: string;
  shortDescription: string;
  description: string;
  telegramChannelId: string;
}


export interface IAdminCourseUpdateForm extends IAdminCourseForm {
  id: string;
}

export interface IAdminCourseMediaForm {
  courseId: string;
  thumbnailUrl: string;
  imageUrls: string[];
  introVideoUrl: string;
}

export interface IAdminCourseLessonForm {
  courseId: string;
  position: number;
  title: string;
  studyTimeInMinutes: number;
  description: string | null;
  videoUrl: string;
  content: string;
}

export interface IAdminCourseLessonUpdateForm extends IAdminCourseLessonForm {
  lessonId: string;
}

export interface IAdminCourseLessonDeleteForm {
  courseId: string;
  lessonId: string;
}

export interface IAdminCourseMaterialForm {
  courseId: string;
  title: string;
  content: string;
}

export interface IAdminCourseMaterialUpdateForm extends IAdminCourseMaterialForm {
  materialId: string;
}

export interface IAdminCourseMaterialDeleteForm {
  courseId: string;
  materialId: string;
}