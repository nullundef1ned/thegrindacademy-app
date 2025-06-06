import { ICourseLesson } from "@/app/(student)/_module/_interfaces/course.interface";
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAdminCourseMutations from "../../../_apis/admin-course.mutations";
import { IAdminBulkCourseLessonForm, IAdminCourseLessonForm, IAdminCourseLessonUpdateForm } from "@/interfaces/course";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/FileUploader";
import Video from "@/components/Video";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import useAppMutations from "@/app/_module/app.mutations";
import notificationUtil from "@/utils/notification.util";
import clsx from "clsx";
import IconifyIcon from "@/components/IconifyIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { queryClient } from "@/providers/tanstack-query.provder";

interface ICourseLessonFormProps {
  lesson: ICourseLesson | IAdminCourseLessonForm | IAdminBulkCourseLessonForm;
  lessonCount: number;
  position: number;
  isNewLesson?: boolean;
  isSorting?: boolean;
  duplicateLesson?: (position: number) => void;
  setLesson?: (lesson: IAdminCourseLessonUpdateForm) => void;
  removeLesson: (position: number) => void;
}

export default function CourseLessonForm({ lesson, position, isNewLesson, isSorting, duplicateLesson, setLesson, removeLesson, lessonCount }: ICourseLessonFormProps) {

  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id: (lesson as ICourseLesson).id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const { deleteVideoFileMutation } = useAppMutations();
  const { createCourseLessonMutation, updateCourseLessonMutation, deleteCourseLessonMutation } = useAdminCourseMutations();

  const { handleSubmit, handleChange: handleChangeFormik, setFieldValue: setFieldValueFormik, values } = useFormik<IAdminCourseLessonUpdateForm>({
    enableReinitialize: true,
    initialValues: {
      lessonId: (lesson as ICourseLesson).id,
      courseId: (lesson as IAdminCourseLessonForm).courseId,
      title: lesson.title,
      content: lesson.content || '',
      description: lesson.description || '',
      position,
      studyTimeInMinutes: lesson.studyTimeInMinutes,
      videoUrl: lesson.videoUrl
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required')
    }),
    onSubmit: (values) => {
      if (!values.videoUrl && !values.content) return notificationUtil.error('Video or text content is required');
      if (!values.videoUrl) delete values.videoUrl;
      if (!values.content) delete values.content;

      if ((lesson as ICourseLesson).id) {
        updateCourseLessonMutation.mutate(values, {
          onSuccess: () => {
            notificationUtil.success('Lesson updated successfully');
            queryClient.refetchQueries({ queryKey: ['course', (lesson as IAdminCourseLessonForm).courseId, 'lessons'] });
          }
        });
      } else {
        createCourseLessonMutation.mutate(values, {
          onSuccess: () => {
            notificationUtil.success('Lesson created successfully');
          }
        });
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChangeFormik(e);
    const lesson = { ...values, [e.target.name]: e.target.value }
    setLesson?.(lesson);
  }

  const setFieldValue = (name: string, value: string) => {
    setFieldValueFormik(name, value);
    const lesson = { ...values, [name]: value }
    setLesson?.(lesson);
  }

  const deleteVideo = () => {
    if (!values.videoUrl) return;
    deleteVideoFileMutation.mutate({ url: values.videoUrl });
  }

  const removeVideo = () => {
    deleteVideo();
    setFieldValue('videoUrl', '');
  }

  const uploadVideo = (url: string) => {
    deleteVideo();
    setFieldValue('videoUrl', url);
  }

  const removeLessonHandler = () => {
    removeLesson(position);
  }

  const duplicateLessonHandler = () => {
    duplicateLesson?.(position);
  }

  const showRemoveButton = lessonCount > 1;
  const isLoading = updateCourseLessonMutation.isPending || createCourseLessonMutation.isPending;

  if (isSorting) {
    return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <div className="gap-4 bg-[#00246B14] border border-[#548DFF24] rounded px-4 flex flex-1 items-center justify-between py-4 font-semibold transition-all">
          <div className="flex items-center gap-2 overflow-hidden">
            <IconifyIcon icon="ri:draggable" />
            <p className="text-sm">Lesson {position}: <span className="font-medium">{values.title}</span></p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AccordionItem value={position.toString()}>
      <AccordionTrigger className="gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <p className="text-sm text-left">Lesson {position}: <span className="font-medium">{values.title}</span></p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className='grid grid-cols-4 gap-4'>
            <div className='col-span-3 flex flex-col gap-2'>
              <p className='text-xs font-medium text-primary-50'>Lesson Title</p>
              <Input type="text" required value={values.title} name='title' onChange={handleChange} />
            </div>
            <div className='col-span-1 flex flex-col gap-2'>
              <p className='text-xs font-medium text-primary-50'>Study Time</p>
              <Input type="number" required value={values.studyTimeInMinutes} name='studyTimeInMinutes' onChange={handleChange} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className='text-xs font-medium text-primary-50'>Description</p>
            <Textarea value={values.description || ''} name='description' onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-4">
              <p className='text-xs font-medium text-primary-50'>Video</p>
              {values.videoUrl && <p className="text-xs text-primary-50 cursor-pointer" onClick={removeVideo}>Remove Video</p>}
            </div>
            <FileUploader provider='bunny' type='course' fileType='video' onChange={uploadVideo} />
            {values.videoUrl && <Video src={values.videoUrl} />}
          </div>
          <div className="flex flex-col gap-2">
            <p className='text-xs font-medium text-primary-50'>Content</p>
            <RichTextEditor value={values.content || ''} onChange={(html) => setFieldValue('content', html)} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {(lesson as ICourseLesson).id ? (
              <Button
                size="sm"
                type="button"
                variant="destructive"
                className="col-span-1"
                loading={deleteCourseLessonMutation.isPending}
                onClick={() => deleteCourseLessonMutation.mutate({ courseId: (lesson as IAdminCourseLessonForm).courseId, lessonId: (lesson as ICourseLesson).id })}>
                <IconifyIcon icon="mdi:delete" />
                Delete
              </Button>
            ) : showRemoveButton && (
              <Button
                size="sm"
                type="button"
                variant="destructive"
                className="col-span-1"
                onClick={removeLessonHandler}>
                <IconifyIcon icon="mdi:delete" />
                Remove
              </Button>
            )}
            <Button
              size="sm"
              type="button"
              className="col-span-1"
              onClick={duplicateLessonHandler}>
              <IconifyIcon icon="mdi:content-duplicate" />
              Duplicate
            </Button>
            {!isNewLesson && (
              <Button size="sm" className={clsx((showRemoveButton || (lesson as ICourseLesson).id) ? "col-span-2 lg:col-span-3" : "col-span-2 lg:col-span-4")} type="submit" loading={isLoading}>
                <IconifyIcon icon="mdi:check" />
                Save
              </Button>
            )}
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  )
}