import { ICourseLesson } from '@/app/(student)/_module/student.interface';
import IconifyIcon from '@/components/IconifyIcon';
import { Checkbox } from '@/components/ui/checkbox';
import useURL from '@/hooks/useURL';
import clsx from 'clsx';

interface CourseLessonCardProps {
  index: number;
  lesson: ICourseLesson;
  courseEnrolled: boolean;
  toggleLessonCompletion: (lessonId: string) => void;
}

export default function CourseLessonCard({ index, lesson, courseEnrolled, toggleLessonCompletion }: CourseLessonCardProps) {
  const { searchParams, replaceParams } = useURL();
  const lessonId = searchParams.get('lessonId');

  const completedLesson = courseEnrolled && lesson.completed;
  const isActiveLesson = lessonId === lesson.id;

  const isClickable = courseEnrolled;
  const isActive = completedLesson || isActiveLesson;

  const selectLesson = () => {
    if (!isClickable) return;
    replaceParams({ key: 'lessonId', value: lesson.id });
  }

  return (
    <div className={clsx(isClickable ? "cursor-pointer" : " cursor-not-allowed", "flex items-center gap-2 justify-between")}>
      <div onClick={selectLesson} className="flex items-center gap-4">
        <div className={clsx(isActive ? "bg-[#004DE866] text-white" : "text-[#8D8E91]", "border border-[#B0CAFF1A] size-8 grid place-items-center rounded ")}>
          <p className="text-sm">{index + 1}</p>
        </div>
        <p className={clsx(isActive ? "text-white" : "text-accent", "text-sm")}>{lesson.name}</p>
      </div>
      <div className="size-8 grid place-items-center border border-[#B0CAFF1A] text-[#8D8E91] rounded ">
        {isClickable ?
          <Checkbox
            checked={completedLesson}
            onCheckedChange={() => toggleLessonCompletion(lesson.id)}
            className='data-[state=checked]:!bg-white data-[state=checked]:!text-black !border-white !rounded-[1px]'
          /> :
          <IconifyIcon icon="ri:lock-2-fill" className='w-3 h-3 flex items-center justify-center' />}
      </div>
    </div>
  )
}
