import React, { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ICourseDetail, ICourseLesson } from '@/app/(student)/_module/_interfaces/course.interface';
import useAdminCourseMutations from '../../_apis/admin-course.mutations';
import LoadingIcons from 'react-loading-icons';
import { useFetchAdminCourseLessons } from '../../_apis/useFetchAdminCourseLessons';
import { Accordion } from '@/components/ui/accordion';
import CourseLessonForm from './_forms/CourseLessonForm';
import { IAdminCourseLessonForm } from '@/interfaces/course';
import Card from '@/components/Card';
import notificationUtil from '@/utils/notification.util';
import CourseLessonCard from './CourseLessonCard';
import { DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { queryClient } from '@/providers/tanstack-query.provder';

interface ICourseLessonsSectionProps {
  course: ICourseDetail;
}

export default function CourseLessonsSection({ course }: ICourseLessonsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [activeLesson, setActiveLesson] = useState<string>('1');

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setIsEditing(false)
  };

  const toggleSorting = () => {
    setIsSorting(!isSorting);
    setActiveLesson('');
  };

  const { data, isPending } = useFetchAdminCourseLessons(course?.id);
  const { createCourseLessonMutation, reorderCourseLessonMutation, deleteCourseLessonMutation } = useAdminCourseMutations();

  const lessons = data || [];

  const addLesson = () => {
    const position = lessons[lessons.length - 1].position + 1;
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

  const handleSort = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const activeIndex = lessons.findIndex((lesson) => lesson.id === active.id);
    const overIndex = lessons.findIndex((lesson) => lesson.id === over.id);
    const newLessons = arrayMove(lessons, activeIndex, overIndex);
    queryClient.setQueryData(['course', course.id, 'lessons'], newLessons);
    reorderCourseLessonMutation.mutate({ courseId: course.id, lessonIds: newLessons.map((lesson) => lesson.id) });
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
            <Button size="sm" variant="secondary" onClick={toggleSorting}>
              {isSorting ? 'Finish Reordering' : 'Reorder'}
            </Button>
            <Button loading={createCourseLessonMutation.isPending} size="sm" onClick={addLesson}>
              Add Lesson
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" onClick={startEditing}>
              Edit
            </Button>
            <Button size="sm" variant="secondary" onClick={toggleSorting}>
              {isSorting ? 'Finish Reordering' : 'Reorder'}
            </Button>
          </div>
        )}
      </div>
      {isPending ? (
        <div className="flex flex-col items-center gap-3 py-6">
          <LoadingIcons.TailSpin className='text-lg' />
          <p className="text-sm font-medium text-primary-50">Loading Content...</p>
        </div>
      ) : (
        <Fragment>
          <DndContext onDragEnd={handleSort}>
            <SortableContext items={lessons.map((lesson) => lesson.id)} strategy={verticalListSortingStrategy}>
              <Accordion type='single' value={activeLesson} onValueChange={setActiveLesson} collapsible className='space-y-4'>
                {!isEditing ? (
                  <Fragment>
                    {lessons.map((lesson: ICourseLesson) => (
                      <CourseLessonCard key={lesson.id} lesson={lesson} isSorting={isSorting} />
                    ))}
                    {lessons.length === 0 && (
                      <Card className='py-4'>
                        <p className='text-sm text-primary-50'>No lessons found. <span onClick={() => { startEditing(); addLesson() }} className='text-accent cursor-pointer'>Add a new lesson.</span></p>
                      </Card>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    {lessons.map((lesson: ICourseLesson | IAdminCourseLessonForm, index) => (
                      <CourseLessonForm
                        key={(lesson as ICourseLesson).id}
                        lesson={lesson}
                        position={index + 1}
                        isSorting={isSorting}
                        removeLesson={removeLesson}
                        duplicateLesson={duplicateLesson}
                        lessonCount={lessons.length}
                      />
                    ))}
                  </Fragment>
                )}
              </Accordion>
            </SortableContext>
          </DndContext>
        </Fragment>
      )}
    </div>
  )
}
