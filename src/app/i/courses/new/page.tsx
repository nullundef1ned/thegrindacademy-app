'use client';


import Breadcrumbs from '@/components/Breadcrumbs';
import { BreadcrumbItem } from '@/components/Breadcrumbs';
import { useTitle } from '@/providers/title.provider';
import React, { createContext, useContext, useState } from 'react'
import { adminRoutes } from '../../_module/admin.routes';
import IconifyIcon from '@/components/IconifyIcon';
import clsx from 'clsx';
import CourseBasicDetailsForm from './_components/CourseBasicDetailsForm';
import CourseMediaForm from './_components/CourseMediaForm';
import CourseLessonsForm from './_components/CourseLessonsForm';
import CourseExtrasForm from './_components/CourseExtrasForm';
import { IAdminCourseForm, IAdminCourseMediaForm, IAdminBulkCourseLessonForm, IAdminBulkCourseMaterialForm } from '@/interfaces/course';

interface CourseFormContextType {
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

export const newLesson: IAdminBulkCourseLessonForm = { title: 'New Lesson', content: '', position: 1, studyTimeInMinutes: 10, description: '', videoUrl: '' };

const CourseFormContext = createContext<CourseFormContextType>({
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

export default function NewCoursePage() {
  const { setTitle } = useTitle();

  const [currentStep, setCurrentStep] = useState(1);
  const [course, setCourse] = useState<CourseFormContextType['course']>({
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
  });

  const setCourseDetails = ({ details, id }: { details: IAdminCourseForm, id: string }) => {
    setCourse({ ...course, details, id });
  }

  const setCourseMaterials = (materials: IAdminBulkCourseMaterialForm[]) => {
    setCourse({ ...course, materials });
  }

  const setCourseLessons = (lessons: IAdminBulkCourseLessonForm[]) => {
    setCourse({ ...course, lessons });
  }

  const setCourseMedia = (media: IAdminCourseMediaForm) => {
    setCourse({ ...course, media });
  }

  const steps = [
    { name: "Basic details", step: 1 },
    { name: "Media", step: 2 },
    { name: "Course Content", step: 3 },
    { name: "Course Extras", step: 4 },
  ]

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Courses', link: adminRoutes.courses },
    { name: 'Add New Course' },
  ]

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  }

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  }

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    if (step < currentStep) {
    }
  }

  setTitle(`New Course | The Grind Academy`);

  const context = {
    currentStep,
    course,
    setCourseDetails,
    setCourseMaterials,
    setCourseLessons,
    setCourseMedia,
    goToNextStep,
    goToPreviousStep,
  }

  return (
    <div className='w-full responsive-section !max-w-screen-md space-y-8 pb-10'>
      <Breadcrumbs items={breadcrumbs} />
      <CourseFormContext.Provider value={context}>
        <div className="flex items-center gap-4 w-full overflow-x-auto">
          {steps.map((step, index) => (
            <div key={index}
              className={clsx("flex items-center gap-2",
                currentStep < step.step ? "opacity-50" : "cursor-pointer")}>
              <div
                onClick={() => handleStepClick(step.step)}
                className={clsx(
                  currentStep == step.step ? "!border-primary/70" :
                    currentStep > step.step && "hover:border-primary/70",
                  "w-10 h-10 rounded bg-[#00246B66] border-transparent text-white grid place-items-center border")}>
                {step.step}
              </div>
              <p className="text-sm font-medium whitespace-nowrap">{step.name}</p>
              {index < steps.length - 1 && <IconifyIcon icon="ri:arrow-right-s-line"
                className={clsx("text-lg",
                  currentStep < step.step ? "opacity-50" : "")} />}
            </div>
          ))}
        </div>
        {
          {
            1: <CourseBasicDetailsForm />,
            2: <CourseMediaForm />,
            3: <CourseLessonsForm />,
            4: <CourseExtrasForm />,
          }[currentStep]
        }
      </CourseFormContext.Provider>
    </div>
  )
}