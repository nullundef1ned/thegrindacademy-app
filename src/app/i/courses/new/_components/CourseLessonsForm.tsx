import { IAdminBulkCourseLessonForm, IAdminCourseLessonForm } from '@/interfaces/course';
import { Button } from '@/components/ui/button';
import { newLesson, useCourseForm } from '../page';
import { useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import CourseLessonForm from '../../[id]/_components/_forms/CourseLessonForm';
import useAdminCourseMutations from '../../_apis/admin-course.mutations';

export default function CourseLessonsForm() {

  const { course: { id: courseId, lessons }, goToNextStep, goToPreviousStep, setCourseLessons } = useCourseForm();
  const { bulkCreateCourseLessonMutation } = useAdminCourseMutations();

  const [activeLesson, setActiveLesson] = useState<string>('1');

  const addLesson = () => {
    const position = lessons.length + 1;
    setCourseLessons([...lessons, { ...newLesson, position }]);
    setActiveLesson(position.toString());
  }

  const setLesson = (lesson: IAdminCourseLessonForm) => {
    const { content, videoUrl, ...rest } = lesson;
    const _lesson = videoUrl ? { ...rest, videoUrl } : content ? { ...rest, content } : rest;
    console.log(_lesson)
    const newLessons = lessons.map((l, index) => index === lesson.position - 1 ? _lesson : l);
    setCourseLessons(newLessons);
  }

  const removeLesson = (position: number) => {
    const newLessons = lessons.filter((_, index) => index !== position - 1);
    setCourseLessons(newLessons);
    setActiveLesson(newLessons[newLessons.length - 1].position.toString());
  }

  const handleSubmit = async () => {
    await bulkCreateCourseLessonMutation.mutateAsync({ lessons, courseId });
    goToNextStep();
  }

  const isValid =
    lessons.every((lesson) => lesson.title && lesson.content && lesson.studyTimeInMinutes && lesson.description && (lesson.videoUrl || lesson.content !== '<p><br></p>'));

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-2'>
        <p className='text-xl font-semibold text-primary-200'>Course Content</p>
        <p className='text-sm text-accent'>Add lessons to structure your course and upload optional media for each lesson.</p>
      </div>

      <Accordion type='single' value={activeLesson} onValueChange={setActiveLesson} collapsible className='space-y-4'>
        {lessons.map((lesson: IAdminBulkCourseLessonForm, index) => (
          <CourseLessonForm
            key={index}
            isNewLesson={true}
            lesson={lesson}
            position={index + 1}
            removeLesson={removeLesson}
            lessonCount={lessons.length}
            setLesson={setLesson}
          />
        ))}
      </Accordion>

      <Button onClick={addLesson} className='w-full md:w-max'>Add Lesson</Button>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Button onClick={goToPreviousStep} variant='outline' className='col-span-1'>Back to Course Media</Button>
        <Button onClick={handleSubmit} loading={bulkCreateCourseLessonMutation.isPending} disabled={!isValid} className='col-span-1 md:col-span-2'>Proceed to Course Extras</Button>
      </div>
    </div>
  )
}
