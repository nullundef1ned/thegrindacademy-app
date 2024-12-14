import { ICompletionCertificate, ICourseDetail, IEnrolledCourseLesson } from '@/app/(student)/_module/_interfaces/course.interface';
import { IEnrolledCourseDetail } from '@/app/(student)/_module/_interfaces/course.interface';
import useStudentMutations from '@/app/(student)/_module/student.mutations';
import { useAppStore } from '@/app/_module/app.store';
import BrandBars from '@/components/BrandBars';
import IconifyIcon from '@/components/IconifyIcon'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress';
import helperUtil from '@/utils/helper.util';
import notificationUtil from '@/utils/notification.util';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import LoadingIcons from 'react-loading-icons';


interface ICourseHeaderProps {
  course: ICourseDetail | IEnrolledCourseDetail;
  isPreview?: boolean;
}

export default function CourseHeader({ course, isPreview }: ICourseHeaderProps) {
  const user = useAppStore((state) => state.user);

  const router = useRouter();
  const { downloadCertificateMutation, enrollCourseMutation } = useStudentMutations();

  const name = isPreview ? (course as ICourseDetail).name : (course as IEnrolledCourseDetail).course.name;

  const completedLessons = (course as IEnrolledCourseDetail).lessons.filter((lesson: IEnrolledCourseLesson) => lesson.status === 'completed').length;

  const progress = Math.round((completedLessons / course.lessons.length) * 100);
  const isCompleted = completedLessons === course.lessons.length;

  const downloadCertificate = () => {
    if (!isCompleted || !course.id || isPreview) return;
    downloadCertificateMutation.mutate({ courseId: course.id }, {
      onSuccess: async (data: ICompletionCertificate) => {
        await helperUtil.downloadFile(data.certificateUrl, `${user?.info.firstName} ${user?.info.lastName} | ${name} certificate.pdf`);
      }
    });
  }

  const enrollCourse = () => {
    enrollCourseMutation.mutate({ courseSlug: (course as ICourseDetail).slug }, {
      onSuccess: () => {
        notificationUtil.success(`You have been enrolled in ${name} successfully`);
        router.push(`/courses/${(course as ICourseDetail).slug}`);
      }
    });
  }

  return (
    <Fragment>
      <div className="border-b border-[#B0CAFF1A] pb-4 w-screen -mx-4 px-4">
        <div className="responsive-section flex flex-wrap gap-4 justify-between">
          <div className='flex flex-col gap-1.5'>
            <Link href={isPreview ? '/courses?tab=browse-courses' : '/courses'} className='w-max'>
              <div className="flex items-center gap-2 cursor-pointer text-muted-foreground">
                <IconifyIcon icon="ri:arrow-left-line" />
                <p className='text-xs'>Back to Courses</p>
              </div>
            </Link>
            <p className='text-lg font-semibold'>{name}</p>
          </div>
          {!isPreview ?
            <div className='flex items-end gap-4'>
              <div className="flex flex-col gap-2 w-72">
                <div className="flex items-center gap-2">
                  <p className='text-xs text-muted-foreground'>{completedLessons}/{course.lessons.length} completed</p>
                  {isCompleted &&
                    <Fragment>
                      <p onClick={() => downloadCertificate()} className='text-xs text-primary-100 hover:underline cursor-pointer'>Download Certificate</p>
                    </Fragment>}
                </div>
                <Progress value={progress} />
              </div>
              <div
                onClick={() => downloadCertificate()}
                className={clsx(
                  isCompleted ? "bg-primary text-white cursor-pointer" : "bg-[#00246B66] text-[#E6E6E7] cursor-not-allowed",
                  "border border-[#B0CAFF1A]  size-10 grid place-items-center rounded")}>
                {downloadCertificateMutation.isPending ?
                  <LoadingIcons.TailSpin className="size-3" /> :
                  <IconifyIcon icon="ri:award-fill" className='size-5 flex items-center justify-center' />
                }
              </div>
            </div>
            :
            <Button loading={enrollCourseMutation.isPending} onClick={enrollCourse}>Enroll</Button>
          }
        </div>
      </div>
      {isPreview && (enrollCourseMutation.isPending || enrollCourseMutation.isSuccess) &&
        <div className='fixed inset-0 w-screen h-screen bg-[#07090FD9] z-50 grid place-items-center place-content-center space-y-6'>
          <BrandBars barClassName='!bg-[#1D253F] h-6 w-32' containerClassName='!space-y-2 animate-pulse' />
          <p className='text-accent text-sm'>Unlocking course...</p>
        </div>
      }
    </Fragment>
  )
}
