import { useContext } from "react";
import { IAdminBulkCourseMaterialForm, IAdminCourseMediaForm } from "@/interfaces/course";
import { IAdminCourseForm } from "@/interfaces/course";
import { IAdminBulkCourseLessonForm } from "@/interfaces/course";
import { createContext } from "react";

export const newLesson: IAdminBulkCourseLessonForm = { title: 'New Lesson', content: '', position: 1, studyTimeInMinutes: 10, description: '', videoUrl: '' };

export interface CourseFormContextType {
  currentStep: number;
  course: {
    id: string;
    details: IAdminCourseForm;
    materials: IAdminBulkCourseMaterialForm[];
    lessons: IAdminBulkCourseLessonForm[];
    media: IAdminCourseMediaForm;
  }
  setCourseDetails: ({ details, id }: { details: IAdminCourseForm, id: string }) => void;
  setCourseMaterials: (materials: IAdminBulkCourseMaterialForm[]) => void;
  setCourseLessons: (lessons: IAdminBulkCourseLessonForm[]) => void;
  setCourseMedia: (media: IAdminCourseMediaForm) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const CourseFormContext = createContext<CourseFormContextType>({
  currentStep: 1,
  course: {
    id: "",
    details: {
      name: "",
      shortDescription: "",
      description: "",
      telegramChannelId: "",
    },
    materials: [],
    lessons: [newLesson],
    media: {
      courseId: "",
      thumbnailUrl: "",
      imageUrls: [],
      introVideoUrl: "",
    },
  },
  setCourseDetails: () => { },
  setCourseMaterials: () => { },
  setCourseLessons: () => { },
  setCourseMedia: () => { },
  goToNextStep: () => { },
  goToPreviousStep: () => { },
});

export const useCourseForm = () => {
  return useContext(CourseFormContext);
}
