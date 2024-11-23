import { ICourse } from '@/app/(student)/_module/student.interface';
import IconifyIcon from '@/components/IconifyIcon'
import { Button } from '@/components/ui/button'
import Link from 'next/link';


interface ICourseHeaderProps {
  course: ICourse;
}

export default function CourseHeader({ course }: ICourseHeaderProps) {
  return (
    <div className="flex justify-between border-b border-[#B0CAFF1A] pb-4 w-screen -mx-4 px-4">
      <div className='flex flex-col gap-1'>
        <Link href='/courses' className='w-max'>
          <div className="flex items-center gap-2 cursor-pointer text-muted-foreground">
            <IconifyIcon icon="ri:arrow-left-line" />
            <p className='text-xs'>Back to Courses</p>
          </div>
        </Link>
        <p className='text-lg font-semibold'>{course.name}</p>
      </div>
      <div>
        <Button>Enroll</Button>
      </div>
    </div>
  )
}
