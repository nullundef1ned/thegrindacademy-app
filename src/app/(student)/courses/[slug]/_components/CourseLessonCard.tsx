import { ICourseLesson } from '@/app/(student)/_module/student.interface';
import IconifyIcon from '@/components/IconifyIcon';
import { Checkbox } from '@/components/ui/checkbox';
import clsx from 'clsx';

interface CourseLessonCardProps {
  index: number;
  activeLessonId: string | undefined;
  lesson: ICourseLesson;
  courseEnrolled: boolean;
}

export default function CourseLessonCard({ index, activeLessonId, lesson, courseEnrolled }: CourseLessonCardProps) {
  const completedLesson = courseEnrolled && lesson.completed;
  const activeLesson = activeLessonId === lesson.id;

  const isClickable = completedLesson || activeLesson;

  return (
    <div className={clsx(courseEnrolled ? "cursor-pointer" : " cursor-not-allowed", "flex items-center gap-2 justify-between")}>
      <div className="flex items-center gap-4">
        <div className={clsx(isClickable ? "bg-[#004DE866] text-white" : "text-[#8D8E91]", "border border-[#B0CAFF1A] size-8 grid place-items-center rounded ")}>
          <p className="text-sm">{index + 1}</p>
        </div>
        <p className={clsx(isClickable ? "text-white" : "text-accent", "text-sm")}>{lesson.name}</p>
      </div>
      <div className="size-8 grid place-items-center border border-[#B0CAFF1A] text-[#8D8E91] rounded ">
        {courseEnrolled ?
          <Checkbox className='data-[state=checked]:!bg-white data-[state=checked]:!text-black !border-white !rounded-[1px]' /> :
          <IconifyIcon icon="ri:lock-2-fill" className='w-3 h-3 flex items-center justify-center' />}
      </div>
    </div>
  )
}
