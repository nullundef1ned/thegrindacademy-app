import { ICourse } from "@/app/(student)/_module/student.interface";
import Video from "@/components/Video";
import useURL from "@/hooks/useURL";
import CourseLessonContent from "./CourseLessonContent";

interface ICourseMainContentProps {
  course: ICourse;
}

export default function CourseMainContent({ course }: ICourseMainContentProps) {
  const { searchParams } = useURL();
  const lessonId = searchParams.get('lessonId');

  if (!lessonId) {
    return (
      <Video src={course.introVideo} poster={course.thumbnail} />
    )
  }

  const lesson = course.lessons.find(lesson => lesson.id === lessonId);

  if (!lesson) {
    return null;
  }

  return (
    <CourseLessonContent lesson={lesson} />
  )
}
