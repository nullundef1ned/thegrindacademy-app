import { ICourse, ICourseEnrollment } from '@/app/(student)/_module/student.interface';
import IconifyIcon from '@/components/IconifyIcon'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress';
import helperUtil from '@/utils/helper.util';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { Fragment } from 'react';
import LoadingIcons from 'react-loading-icons';


interface ICourseHeaderProps {
  course: ICourse;
  enrollment: ICourseEnrollment | null;
}

export default function CourseHeader({ course, enrollment }: ICourseHeaderProps) {
  const { mutate: downloadCertificate, isPending } = useMutation({
    mutationFn: async () => {
      if (!enrollment?.certificateLink) return;
      await helperUtil.downloadFile(enrollment?.certificateLink, `${course.name} Certificate`);
    },
  })

  return (
    <div className="flex justify-between border-b border-[#B0CAFF1A] pb-4 w-screen -mx-4 px-4">
      <div className='flex flex-col gap-1.5'>
        <Link href='/courses' className='w-max'>
          <div className="flex items-center gap-2 cursor-pointer text-muted-foreground">
            <IconifyIcon icon="ri:arrow-left-line" />
            <p className='text-xs'>Back to Courses</p>
          </div>
        </Link>
        <p className='text-lg font-semibold'>{course.name}</p>
      </div>
      {!!enrollment ?
        <div className='flex items-end gap-4'>
          <div className="flex flex-col gap-2 w-72">
            <div className="flex items-center gap-2">
              <p className='text-xs text-muted-foreground'>{enrollment.lessonsCompleted}/{course.lessons.length} completed</p>
              {enrollment.isCompleted &&
                <Fragment>
                  <p onClick={() => downloadCertificate()} className='text-xs text-primary-100 hover:underline cursor-pointer'>Download Certificate</p>
                </Fragment>}
            </div>
            <Progress value={enrollment.progress} />
          </div>
          <div
            onClick={() => downloadCertificate()}
            className={clsx(
              enrollment.isCompleted ? "bg-primary text-white cursor-pointer" : "bg-[#00246B66] text-[#E6E6E7] cursor-not-allowed",
              "border border-[#B0CAFF1A]  size-10 grid place-items-center rounded")}>
            {isPending ?
              <LoadingIcons.TailSpin className="size-3" /> :
              <IconifyIcon icon="ri:award-fill" className='size-5 flex items-center justify-center' />
            }
          </div>
        </div>
        :
        <Button>Enroll</Button>
      }
    </div>
  )
}
