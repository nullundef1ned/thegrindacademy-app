import { ICourseLesson, IEnrolledCourseLesson, IEnrolledCourseDetail } from '@/app/(student)/_module/_interfaces/course.interface';
import useStudentMutations from '@/app/(student)/_module/student.mutations';
import { useFetchUser } from '@/app/_module/_apis/useFetchUser';
import IconifyIcon from '@/components/IconifyIcon';
import { Checkbox } from '@/components/ui/checkbox';
import useURL from '@/hooks/useURL';
import { queryClient } from '@/providers/tanstack-query.provder';
import notificationUtil from '@/utils/notification.util';
import clsx from 'clsx';
import LoadingIcons from 'react-loading-icons';

interface CourseLessonCardProps {
  index: number;
  course?: IEnrolledCourseDetail;
  lesson: ICourseLesson | IEnrolledCourseLesson;
  isPreview?: boolean;
}

export default function CourseLessonCard({ index, course, lesson, isPreview }: CourseLessonCardProps) {
  const { data: user } = useFetchUser();

  const { searchParams, replaceParams } = useURL();
  const lessonId = searchParams.get('lessonId');

  const { updateLessonStatusMutation } = useStudentMutations();

  const isActiveLesson = lessonId === lesson.id;
  const isCompleted = (lesson as IEnrolledCourseLesson).status === 'completed';
  const isCourseCompleted = course?.status === 'completed';

  const title = isPreview ? (lesson as ICourseLesson).title : (lesson as IEnrolledCourseLesson).lesson.title;

  const selectLesson = () => {
    if (isPreview) return;
    replaceParams({ key: 'lessonId', value: lesson.id });
  }

  const toggleLessonCompletion = () => {
    const status = isCompleted ? 'in-progress' : 'completed';
    const courseSlug = course?.course.slug;
    const lessonId = (lesson as IEnrolledCourseLesson).lessonId;
    if (!courseSlug || !lessonId || isPreview || isCourseCompleted) return;

    updateLessonStatusMutation.mutate({ courseSlug, lessonId, status }, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: [user?.id, 'enrolled-course', courseSlug] })
      },
      onError: (error) => {
        notificationUtil.error(error.message);
      }
    });
  }

  return (
    <div className={clsx(!isPreview ? "cursor-pointer" : " cursor-not-allowed", "flex items-center gap-2 justify-between")}>
      <div onClick={selectLesson} className="flex items-center gap-4">
        <div className={clsx(
          "text-[#8D8E91]",
          isActiveLesson && "bg-[#004DE866] text-white font-semibold",
          isCompleted && "bg-green-900 text-white",
          "border flex-shrink-0 border-[#B0CAFF1A] size-8 grid place-items-center rounded ")}>
          <p className="text-sm">{index + 1}</p>
        </div>
        <p className={clsx(isActiveLesson ? "text-white" : "text-accent/50", "text-sm")}>{title}</p>
      </div>
      <div className="size-8 grid place-items-center border border-[#B0CAFF1A] text-[#8D8E91] rounded flex-shrink-0">
        {!isPreview ?
          updateLessonStatusMutation.isPending ? <LoadingIcons.TailSpin className="size-3" /> :
            <Checkbox
              checked={isCompleted}
              disabled={isCourseCompleted}
              onCheckedChange={toggleLessonCompletion}
              className='data-[state=checked]:!bg-white data-[state=checked]:!text-black !border-white !rounded-[1px]'
            /> :
          <IconifyIcon icon="ri:lock-2-fill" className='w-3 h-3 flex items-center justify-center' />}
      </div>
    </div>
  )
}
