import useAdminCourseMutations from '../../_apis/admin-course.mutations';
import { IAdminBulkCourseMaterialForm } from '@/interfaces/course';
import { useCourseForm } from '../page';
import FileUploader from '@/components/FileUploader';
import CourseMaterialForm from '../../[id]/_components/_forms/CourseMaterialForm';
import { Button } from '@/components/ui/button';
import { useModal } from '@/providers/modal.provider';
import CourseCreationModal from './_modals/CourseCreationModal';

export default function CourseExtrasForm() {

  const { showModal } = useModal();
  const { bulkCreateCourseMaterialMutation, updateCourseMutation } = useAdminCourseMutations();
  const { course: { id: courseId, materials }, goToPreviousStep, setCourseMaterials } = useCourseForm();

  const addMaterial = (url: string) => {
    const extension = url.split('.').pop();
    const name = `Course Material ${materials.length + 1}.${extension}`;
    setCourseMaterials([...materials, { title: name, content: url }]);
  }

  const updateMaterial = (material: IAdminBulkCourseMaterialForm, index: number) => {
    setCourseMaterials(materials.map((m, i) => i === index ? material : m));
  }

  const removeMaterial = (material: IAdminBulkCourseMaterialForm) => {
    setCourseMaterials(materials.filter((m) => m.title !== material.title));
  }

  const handleSave = async () => {
    await bulkCreateCourseMaterialMutation.mutateAsync({ courseId, materials });
    showModal(<CourseCreationModal isPublished={false} courseId={courseId} />);
  }

  const handlePublish = async () => {
    await bulkCreateCourseMaterialMutation.mutateAsync({ courseId, materials });
    await updateCourseMutation.mutateAsync({ id: courseId, status: 'published' });
    showModal(<CourseCreationModal isPublished={true} courseId={courseId} />);
  }

  const isValid = materials.every((material) => material.title && material.content) && materials.length > 0;
  const isSaving = bulkCreateCourseMaterialMutation.isPending
  const isPublishing = updateCourseMutation.isPending

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-2'>
        <p className='text-xl font-semibold text-primary-200'>Course Extras</p>
        <p className='text-sm text-accent'>Provide key information about the course, including its name and description</p>
      </div>
      <div className='flex flex-col gap-4'>
        <p className='text-sm font-semibold'>Upload course materials</p>
        <FileUploader provider='do-spaces' type='course' fileType='any' onChange={(url) => addMaterial(url)} />
        <div className="flex flex-col gap-2">
          {materials.map((material, index) => (
            <CourseMaterialForm
              key={index}
              material={material}
              isNewMaterial={true}
              updateMaterial={(material) => updateMaterial(material, index)}
              removeMaterial={removeMaterial}
            />
          ))}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
          <Button onClick={goToPreviousStep} variant='outline' className='col-span-1'>Back</Button>
          <Button onClick={handleSave} loading={isSaving} disabled={!isValid} className='col-span-1 md:col-span-2'>Save Course</Button>
          <Button onClick={handlePublish} loading={isPublishing} disabled={!isValid} variant='success' className='col-span-1 md:col-span-3'>Publish Course</Button>
        </div>
      </div>
    </div>
  )
}
