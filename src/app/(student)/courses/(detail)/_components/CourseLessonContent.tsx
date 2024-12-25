import { ICourseLesson } from "@/app/(student)/_module/_interfaces/course.interface";
import { IEnrolledCourseLesson } from "@/app/(student)/_module/_interfaces/course.interface";
import Video from "@/components/Video";

interface ICourseLessonContentProps {
  lesson: ICourseLesson & IEnrolledCourseLesson;
  isPreview?: boolean;
}

export default function CourseLessonContent({ lesson, isPreview }: ICourseLessonContentProps) {
  const title = isPreview ? lesson.title : lesson.lesson.title;
  const content = isPreview ? lesson.content : lesson.lesson.content;
  const videoUrl = isPreview ? lesson.videoUrl : lesson.lesson.videoUrl;
  // const lessonStudyTimeInSeconds = isPreview ? lesson.studyTimeInMinutes * 60 : lesson.lesson.studyTimeInMinutes * 60; // studyTime is in minutes, convert to seconds

  // const [timeLeft, setTimeLeft] = useState(lessonStudyTimeInSeconds);

  // const percentageCompleted = (lessonStudyTimeInSeconds - timeLeft) / lessonStudyTimeInSeconds * 100;

  // useEffect(() => {
  //   if (!lessonStudyTimeInSeconds) return;
  //   let interval: NodeJS.Timeout;
  //   setTimeLeft(lessonStudyTimeInSeconds);

  //   const timeout = setTimeout(() => {
  //     interval = setInterval(() => {
  //       setTimeLeft(prev => {
  //         if (prev <= 0) {
  //           clearInterval(interval);
  //           return 0;
  //         };
  //         return prev - 1;
  //       });
  //     }, 1000);
  //   }, 100)

  //   return () => {
  //     clearTimeout(timeout);
  //     clearInterval(interval);
  //   }

  // }, [lesson.id, lessonStudyTimeInSeconds]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 justify-between">
        <p className="text-sm font-semibold">{title}</p>
        {/* {!isPreview &&
          <div className="flex items-center gap-2">
            <p className="text-sm">{helperUtil.convertTimeToMinutesAndSeconds(timeLeft)}</p>
            <p className="text-sm">{percentageCompleted.toFixed(2)}%</p>
          </div>
        } */}
      </div>
      {videoUrl && <Video src={videoUrl} poster={''} />}
      {content && <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />}
    </div>
  )
}
