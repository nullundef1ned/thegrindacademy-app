import { ICourseMaterial } from "@/app/(student)/_module/_interfaces/course.interface";
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAdminCourseMutations from "../../../_apis/admin-course.mutations";
import { IAdminCourseMaterialUpdateForm } from "@/interfaces/course";
import IconifyIcon from "@/components/IconifyIcon";
import LoadingIcons from "react-loading-icons";
import clsx from "clsx";

interface ICourseMaterialFormProps {
  material: ICourseMaterial;
}

export default function CourseMaterialForm({ material }: ICourseMaterialFormProps) {
  const { updateCourseMaterialMutation, deleteCourseMaterialMutation } = useAdminCourseMutations();

  const { handleSubmit, handleChange, handleBlur, values, isValid } = useFormik<IAdminCourseMaterialUpdateForm>({
    enableReinitialize: true,
    initialValues: {
      materialId: material.id,
      courseId: material.courseId,
      title: material.title,
      content: material.content
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required')
    }),
    onSubmit: (values) => {
      updateCourseMaterialMutation.mutate(values);
    },
  });

  return (
    <div className="flex items-center gap-4 justify-between">
      <div className="flex items-center gap-2 w-full">
        <IconifyIcon icon="ri:file-3-line" className='text-primary-50 text-lg' />
        <input type="text"
          required value={values.title} name='title'
          onBlur={handleBlur} onChange={handleChange}
          className='bg-transparent underline focus:outline-none w-full' />
      </div>
      <div className="flex items-center gap-3">
        <div
          className={clsx(!isValid && "opacity-50 cursor-not-allowed", "flex items-center cursor-pointer p-1.5 bg-primary rounded group")}
          onClick={() => handleSubmit()}>
          {updateCourseMaterialMutation.isPending ? (
            <LoadingIcons.TailSpin className='text-white' width={16} height={16} />
          ) : (
            <IconifyIcon
              icon="ri:check-fill"
              className="text-primary-50 cursor-pointer transition-colors duration-300 group-hover:text-opacity-70"
            />
          )}
        </div>
        <div
          className="flex items-center cursor-pointer p-1.5 bg-red-800 rounded group"
          onClick={() => deleteCourseMaterialMutation.mutate({ courseId: material.courseId, materialId: material.id })}>
          {deleteCourseMaterialMutation.isPending ? (
            <LoadingIcons.TailSpin className='text-white' width={16} height={16} />
          ) : (
            <IconifyIcon
              icon="ri:delete-bin-7-fill"
              className="text-white cursor-pointer transition-colors duration-300 group-hover:text-opacity-70"
            />
          )}
        </div>
      </div>
    </div>
  )
}