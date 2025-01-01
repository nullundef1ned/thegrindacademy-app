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
import { IAdminCourseLessonForm } from '@/interfaces/course';
import Card from '@/components/Card';
import notificationUtil from '@/utils/notification.util';

interface ICourseLessonsSectionProps {
  course: ICourseDetail;
}

export default function CourseLessonsSection({ course }: ICourseLessonsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeLesson, setActiveLesson] = useState<string>('1');

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setIsEditing(false)
  };

  const { data, isPending } = useFetchAdminCourseLessons(course?.id);
  const { createCourseLessonMutation, deleteCourseLessonMutation } = useAdminCourseMutations();

  const lessons = data?.result || [];

  const addLesson = () => {
    const position = lessons.length + 1;
    const newLesson: IAdminCourseLessonForm = { courseId: course.id, title: 'New Lesson ' + position, content: 'Sample content', position, studyTimeInMinutes: 10, description: 'Sample description' };
    createCourseLessonMutation.mutate(newLesson);
    setActiveLesson(position.toString());
  }

  const duplicateLesson = (position: number) => {
    const lesson = lessons.find((lesson) => lesson.position === position);
    if (!lesson) return;
    const duplicateLesson: IAdminCourseLessonForm = { courseId: course.id, title: lesson.title + ' (Copy)', content: lesson.content || '', position: lessons.length + 1, studyTimeInMinutes: lesson.studyTimeInMinutes || 10, description: lesson.description || '', videoUrl: lesson.videoUrl || '' };
    if (!duplicateLesson.content) delete duplicateLesson.content;
    if (!duplicateLesson.videoUrl) delete duplicateLesson.videoUrl;
    createCourseLessonMutation.mutate(duplicateLesson);
  }

  const removeLesson = async (position: number) => {
    const lesson = lessons.find((lesson) => lesson.position === position);
    await deleteCourseLessonMutation.mutateAsync({ courseId: course.id, lessonId: (lesson as ICourseLesson).id });
    setActiveLesson(lessons[lessons.length - 1].position.toString());
    notificationUtil.success('Lesson deleted successfully');
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
            {/* <Button size="sm" variant="success" onClick={finishEditing}>
              Finish Editing
            </Button> */}
            <Button loading={createCourseLessonMutation.isPending} size="sm" onClick={addLesson}>
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
                  <AccordionTrigger className='overflow-hidden gap-4'>
                    <div className="flex items-center gap-2 overflow-hidden flex-grow-0">
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
              ))}
              {lessons.length === 0 && (
                <Card className='py-4'>
                  <p className='text-sm text-primary-50'>No lessons found. <span onClick={() => { startEditing(); addLesson() }} className='text-accent cursor-pointer'>Add a new lesson.</span></p>
                </Card>
              )}
            </Accordion>
          ) : (
            <Accordion type='single' value={activeLesson} onValueChange={setActiveLesson} collapsible className='space-y-4'>
              {lessons.map((lesson: ICourseLesson | IAdminCourseLessonForm, index) => (
                <CourseLessonForm
                  key={index}
                  lesson={lesson}
                  position={index + 1}
                  removeLesson={removeLesson}
                  duplicateLesson={duplicateLesson}
                  lessonCount={lessons.length}
                />
              ))}
            </Accordion>
          )}
        </Fragment>
      )}
    </div>
  )
}
