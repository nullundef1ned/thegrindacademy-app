import { ICourseDetail, ICourseLesson, IEnrolledCourseDetail, IEnrolledCourseLesson } from "@/app/(student)/_module/_interfaces/course.interface";
import Video from "@/components/Video";
import useURL from "@/hooks/useURL";
import CourseLessonContent from "./CourseLessonContent";

interface ICourseMainContentProps {
  course: ICourseDetail | IEnrolledCourseDetail;
  isPreview?: boolean;
}

export default function CourseMainContent({ course, isPreview }: ICourseMainContentProps) {
  const { searchParams } = useURL();
  const lessonId = searchParams.get('lessonId');

  const media = isPreview ? (course as ICourseDetail).media : (course as IEnrolledCourseDetail).course.media;

  if (!lessonId) {
    return (
      <Video src={media.introVideoUrl} poster={media.thumbnailUrl} fullScreenOnPlay />
    )
  }

  const lesson = course.lessons.find(lesson => lesson.id === lessonId) as ICourseLesson & IEnrolledCourseLesson;

  if (!lesson) return null;

  return (
    <CourseLessonContent lesson={lesson} isPreview={isPreview} />
  )
}
