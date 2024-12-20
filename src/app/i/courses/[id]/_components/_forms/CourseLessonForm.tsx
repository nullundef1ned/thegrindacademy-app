import { ICourseLesson } from "@/app/(student)/_module/_interfaces/course.interface";
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAdminCourseMutations from "../../../_apis/admin-course.mutations";
import { IAdminCourseLessonForm, IAdminCourseLessonUpdateForm } from "@/interfaces/course";
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

interface ICourseLessonFormProps {
  lesson: ICourseLesson | IAdminCourseLessonForm;
  position: number;
  removeLesson: (position: number) => void;
}

export default function CourseLessonForm({ lesson, position, removeLesson }: ICourseLessonFormProps) {
  const { deleteVideoFileMutation } = useAppMutations();
  const { createCourseLessonMutation, updateCourseLessonMutation, deleteCourseLessonMutation } = useAdminCourseMutations();

  const { handleSubmit, handleChange, setFieldValue, values } = useFormik<IAdminCourseLessonUpdateForm>({
    enableReinitialize: true,
    initialValues: {
      lessonId: (lesson as ICourseLesson).id,
      courseId: lesson.courseId,
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
        updateCourseLessonMutation.mutate(values);
      } else {
        createCourseLessonMutation.mutate(values);
      }
    },
  });

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

  const isLoading = updateCourseLessonMutation.isPending || createCourseLessonMutation.isPending;

  return (
    <AccordionItem value={position.toString()}>
      <AccordionTrigger className="gap-4">
        <p className="text-sm">Lesson {position}: <span className="font-medium">{values.title}</span></p>
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
          <div className="grid grid-cols-3 gap-4">
            {(lesson as ICourseLesson).id ? (
              <Button
                size="sm"
                type="button"
                variant="destructive"
                className="col-span-1"
                loading={deleteCourseLessonMutation.isPending}
                onClick={() => deleteCourseLessonMutation.mutate({ courseId: lesson.courseId, lessonId: (lesson as ICourseLesson).id })}>
                Delete
              </Button>
            ) :
              <Button
                size="sm"
                type="button"
                variant="destructive"
                className="col-span-1"
                onClick={removeLessonHandler}>
                Remove
              </Button>
            }
            <Button size="sm" className="col-span-2" type="submit" loading={isLoading}>
              Save
            </Button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  )
}