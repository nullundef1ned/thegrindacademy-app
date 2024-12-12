import { ICourseDetail, ICourseLesson, IEnrolledCourseLesson, IStudentEnrolledCourseDetail } from "@/app/(student)/_module/student.interface";
import Video from "@/components/Video";
import useURL from "@/hooks/useURL";
import CourseLessonContent from "./CourseLessonContent";

interface ICourseMainContentProps {
  course: ICourseDetail | IStudentEnrolledCourseDetail;
  isPreview?: boolean;
}

export default function CourseMainContent({ course, isPreview }: ICourseMainContentProps) {
  const { searchParams } = useURL();
  const lessonId = searchParams.get('lessonId');

  const media = isPreview ? (course as ICourseDetail).media : (course as IStudentEnrolledCourseDetail).course.media;

  if (!lessonId) {
    return (
      <Video src={media.introVideoUrl} poster={media.thumbnailUrl} />
    )
  }

  const lesson = course.lessons.find(lesson => lesson.id === lessonId) as ICourseLesson & IEnrolledCourseLesson;

  if (!lesson) return null;

  return (
    <CourseLessonContent lesson={lesson} isPreview={isPreview} />
  )
}
