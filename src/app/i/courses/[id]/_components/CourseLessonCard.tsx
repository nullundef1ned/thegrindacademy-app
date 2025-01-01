import { ICourseLesson } from '@/app/(student)/_module/_interfaces/course.interface'
import IconifyIcon from '@/components/IconifyIcon'
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import Video from '@/components/Video'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import pluralize from 'pluralize'

interface CourseLessonCardProps {
  lesson: ICourseLesson
  isSorting: boolean
}

export default function CourseLessonCard({ lesson, isSorting }: CourseLessonCardProps) {

  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id: lesson.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isSorting) {
    return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <div className="gap-4 bg-[#00246B14] border border-[#548DFF24] rounded px-4 flex flex-1 items-center justify-between py-4 font-semibold transition-all">
          <div className="flex items-center gap-2 overflow-hidden">
            {isSorting && <IconifyIcon icon="ri:draggable" />}
            <p className='text-left truncate'>{lesson.title}</p>
            <div className='bg-background rounded border py-0.5 px-2'>
              <p className='text-xs font-medium text-primary-50 whitespace-nowrap'>
                {lesson.content && lesson.videoUrl ? 'Text & Video Content' :
                  lesson.content ? 'Text Content' :
                    lesson.videoUrl ? 'Video Content' :
                      'No Content'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AccordionItem value={lesson.position.toString()}>
      <AccordionTrigger className='overflow-hidden gap-4'>
        <div className="flex items-center gap-2 overflow-hidden">
          {isSorting && <IconifyIcon icon="ri:draggable" />}
          <p className='text-left truncate'>{lesson.title}</p>
          <div className='bg-background rounded border py-0.5 px-2'>
            <p className='text-xs font-medium text-primary-50 whitespace-nowrap'>
              {lesson.content && lesson.videoUrl ? 'Text & Video Content' :
                lesson.content ? 'Text Content' :
                  lesson.videoUrl ? 'Video Content' :
                    'No Content'}
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className='space-y-4'>
        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-3 flex flex-col gap-2'>
            <p className='text-xs font-medium text-primary-50'>Lesson Title</p>
            <p className='text-sm text-primary-50'>{lesson.title}</p>
          </div>
          <div className='col-span-1 flex flex-col gap-2'>
            <p className='text-xs font-medium text-primary-50'>Study Time</p>
            <p className='text-sm text-primary-50'>{lesson.studyTimeInMinutes} {pluralize('minute', lesson.studyTimeInMinutes)}</p>
          </div>
        </div>
        {lesson.description && (
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-primary-50'>Description</p>
            <p className='text-sm text-primary-50'>{lesson.description}</p>
          </div>
        )}
        {lesson.videoUrl && (
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-primary-50'>Video</p>
            <Video src={lesson.videoUrl} />
          </div>
        )}
        {lesson.content && (
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-medium text-primary-50'>Text Content</p>
            <div dangerouslySetInnerHTML={{ __html: lesson.content || '' }} className='text-sm text-primary-50' />
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}