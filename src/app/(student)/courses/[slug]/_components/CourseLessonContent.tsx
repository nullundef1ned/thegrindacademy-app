import { ICourseLesson } from "@/app/(student)/_module/student.interface";
import Video from "@/components/Video";
import helperUtil from "@/utils/helper.util";
import { useEffect, useState } from "react";

interface ICourseLessonContentProps {
  lesson: ICourseLesson;
}

export default function CourseLessonContent({ lesson }: ICourseLessonContentProps) {
  const lessonStudyTimeInSeconds = lesson.studyTime * 60; // studyTime is in minutes, convert to seconds

  const [timeLeft, setTimeLeft] = useState(lessonStudyTimeInSeconds);

  const percentageCompleted = (lessonStudyTimeInSeconds - timeLeft) / lessonStudyTimeInSeconds * 100;

  useEffect(() => {
    if (!lessonStudyTimeInSeconds) return;
    let interval: NodeJS.Timeout;
    setTimeLeft(lessonStudyTimeInSeconds);

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          };
          return prev - 1;
        });
      }, 1000);
    }, 100)

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    }

  }, [lesson.id, lessonStudyTimeInSeconds]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 justify-between">
        <p className="text-sm font-semibold">{lesson.name}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm">{helperUtil.convertTimeToMinutesAndSeconds(timeLeft)}</p>
          <p className="text-sm">{percentageCompleted.toFixed(2)}%</p>
        </div>
      </div>
      {lesson.content.video && <Video src={lesson.content.video} poster={lesson.content.video} />}
      {lesson.content.html && <div className="prose" dangerouslySetInnerHTML={{ __html: lesson.content.html }} />}
    </div>
  )
}
