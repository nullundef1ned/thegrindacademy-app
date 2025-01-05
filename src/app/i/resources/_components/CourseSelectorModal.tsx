import IconifyIcon from '@/components/IconifyIcon'
import Modal from '@/components/Modal'
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useFetchAdminCourses } from '../../courses/_apis/useFetchAdminCourses';
import { clsx } from 'clsx';
import LoadingIcons from 'react-loading-icons';
import { Button } from '@/components/ui/button';
import { IAdminCourse } from '@/interfaces/course';

interface ICourseSelectorModal {
  selectedCourses: IAdminCourse[];
  setSelectedCourses: (courses: IAdminCourse[]) => void;
}

export default function CourseSelectorModal({ selectedCourses, setSelectedCourses }: ICourseSelectorModal) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<IAdminCourse[]>(selectedCourses);

  const { data, isPending, isError, refetch } = useFetchAdminCourses({ page, search });
  const courses = data?.result || [];

  const toggleCourseSelection = (course: IAdminCourse) => {
    const updatedSelected = selected.includes(course) ? selected.filter((c) => c.id !== course.id) : [...selected, course];
    setSelected(updatedSelected);
    setSelectedCourses(updatedSelected);
  }

  const prevPage = () => {
    setPage(page - 1);
  }

  const nextPage = () => {
    setPage(page + 1);
  }

  return (
    <Modal title='Select Telegram Groups and Channels' position='bottom-left' height='max'>
      <div className="flex w-full gap-4">
        <Input className='w-full' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="flex items-center gap-2">
          <div
            className={clsx(page == 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer", "size-8 grid place-items-center bg-[#00246B33] border rounded border-[#B0CAFF1A]")}
            onClick={prevPage}>
            <IconifyIcon icon="ri:arrow-left-s-line" className="text-lg" />
          </div>
          <div
            className={clsx(data && data?.totalPages <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer", "size-8 grid place-items-center bg-[#00246B33] border rounded border-[#B0CAFF1A]")}
            onClick={nextPage}>
            <IconifyIcon icon="ri:arrow-right-s-line" className="text-lg" />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        {courses.map((course, index) => (
          <div key={index} onClick={() => toggleCourseSelection(course)} className='flex items-center gap-2 justify-between bg-black/40 p-3 rounded-md cursor-pointer'>
            <p className='text-sm'>{course.name}</p>
            <div className='flex items-center gap-2'>
              <p className='text-xs text-accent'>Course Group</p>
              {selected.find((c) => c.id === course.id) && <IconifyIcon icon="ri:check-fill" className="text-lg flex items-center" />}
            </div>
          </div>
        ))}
        {isPending &&
          <div className='flex items-center justify-center h-60'>
            <LoadingIcons.TailSpin />
          </div>
        }
        {!isPending && courses.length === 0 &&
          <div className='flex items-center justify-center h-60'>
            <p className='text-sm text-accent'>No courses found</p>
          </div>
        }
        {isError &&
          <div className='flex flex-col items-center gap-4 justify-center h-60'>
            <p className='text-sm text-accent'>Error fetching courses</p>
            <Button size="sm" onClick={() => refetch()}>Retry</Button>
          </div>
        }
      </div>
    </Modal>
  )
}
