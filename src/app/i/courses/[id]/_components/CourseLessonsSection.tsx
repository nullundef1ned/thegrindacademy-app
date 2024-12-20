import React, { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ICourseDetail, ICourseLesson } from '@/app/(student)/_module/_interfaces/course.interface';
import useAdminCourseMutations from '../../_apis/admin-course.mutations';
import LoadingIcons from 'react-loading-icons';
import { useFetchAdminCourseLessons } from '../../_apis/useFetchAdminCourseLessons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import pluralize from 'pluralize';
import Video from '@/components/Video';
import CourseLessonForm from './_forms/CourseLessonForm';
import { IAdminCourseLessonForm, IAdminCourseLessonUpdateForm } from '@/interfaces/course';

interface ICourseLessonsSectionProps {
  course: ICourseDetail;
}

export default function CourseLessonsSection({ course }: ICourseLessonsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeLesson, setActiveLesson] = useState<string>('1');

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setIsEditing(false)
    setLessons(data?.result || []);
  };

  const { data, isPending } = useFetchAdminCourseLessons(course?.id);
  const { updateCourseLessonMutation } = useAdminCourseMutations();

  const [lessons, setLessons] = useState<(ICourseLesson | IAdminCourseLessonForm)[]>(data?.result || []);

  const finishEditing = () => {
    lessons.forEach((lesson, index) => {
      if ((lesson as ICourseLesson).id) {
        const lessonForm: IAdminCourseLessonUpdateForm = {
          courseId: course.id,
          lessonId: (lesson as ICourseLesson).id,
          position: index + 1,
          title: lesson.title,
          studyTimeInMinutes: lesson.studyTimeInMinutes,
          description: lesson.description || '',
          videoUrl: lesson.videoUrl || '',
          content: lesson.content || '',
        };
        updateCourseLessonMutation.mutate(lessonForm);
      }
    });
    setIsEditing(false)
    setActiveLesson('1');
  }

  const addLesson = () => {
    const position = lessons.length + 1;
    const newLesson: IAdminCourseLessonForm = { courseId: course.id, title: 'New Lesson', content: '', position, studyTimeInMinutes: 10, description: '', videoUrl: '' };
    setLessons([...lessons, newLesson]);
    setActiveLesson(position.toString());
  }

  const removeLesson = (position: number) => {
    const newLessons = lessons.filter((lesson) => lesson.position !== position);
    setLessons(newLessons);
    setActiveLesson(newLessons[newLessons.length - 1].position.toString());
  }

  return (
    <div className='space-y-4'>
      <div className="flex items-center gap-4 justify-between">
        <p className="font-medium text-accent">Course Content</p>
        {isEditing ? (
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" onClick={cancelEditing}>
              Cancel
            </Button>
            <Button size="sm" variant="success" onClick={finishEditing}>
              Finish Editing
            </Button>
            <Button size="sm" onClick={addLesson}>
              Add Lesson
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={startEditing}>
            Edit
          </Button>
        )}
      </div>
      {isPending ? (
        <div className="flex flex-col items-center gap-3 py-6">
          <LoadingIcons.TailSpin className='text-lg' />
          <p className="text-sm font-medium text-primary-50">Loading Content...</p>
        </div>
      ) : (
        <Fragment>
          {!isEditing ? (
            <Accordion type='single' value={activeLesson} onValueChange={setActiveLesson} collapsible className='space-y-4'>
              {lessons.map((lesson: ICourseLesson | IAdminCourseLessonForm) => (
                <AccordionItem key={lesson.position} value={lesson.position.toString()}>
                  <AccordionTrigger>
                    <p>{lesson.title}</p>
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
              ))}
            </Accordion>
          ) : (
            <Accordion type='single' value={activeLesson} onValueChange={setActiveLesson} collapsible className='space-y-4'>
              {lessons.map((lesson: ICourseLesson | IAdminCourseLessonForm, index) => (
                <CourseLessonForm key={index} lesson={lesson} position={index + 1} removeLesson={removeLesson} />
              ))}
            </Accordion>
          )}
        </Fragment>
      )}
    </div>
  )
}
