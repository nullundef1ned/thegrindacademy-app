import React, { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button';
import Card from '@/components/Card';
import { ICourseDetail } from '@/app/(student)/_module/_interfaces/course.interface';
import useAdminCourseMutations from '../../_apis/admin-course.mutations';
import FileUploader from '@/components/FileUploader';
import IconifyIcon from '@/components/IconifyIcon';
import LoadingIcons from 'react-loading-icons';
import { useFetchAdminCourseMaterials } from '../../_apis/useFetchAdminCourseMaterials';
import helperUtil from '@/utils/helper.util';
import CourseMaterialForm from './_forms/CourseMaterialForm';

interface ICourseMaterialsSectionProps {
  course: ICourseDetail;
}

export default function CourseMaterialsSection({ course }: ICourseMaterialsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => setIsEditing(false);

  const { createCourseMaterialMutation } = useAdminCourseMutations();

  const { data, isPending } = useFetchAdminCourseMaterials(course?.id);

  const materials = data?.result || [];

  const addMaterial = (url: string) => {
    const extension = url.split('.').pop();
    const name = `Course Material ${materials.length + 1}.${extension}`;
    createCourseMaterialMutation.mutate({ courseId: course.id, title: name, content: url });
  }

  return (
    <div className='space-y-4'>
      <div className="flex items-center gap-4 justify-between">
        <p className="font-medium text-accent">Course Materials</p>
        {isEditing ? (
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" onClick={cancelEditing}>
              Cancel
            </Button>
            <Button size="sm" onClick={cancelEditing}>
              Finish Editing
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={startEditing}>
            Edit
          </Button>
        )}
      </div>
      <Card className="divide-y !py-0">
        {isPending ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <LoadingIcons.TailSpin className='text-lg' />
            <p className="text-sm font-medium text-primary-50">Loading Media...</p>
          </div>
        ) : (
          <Fragment>
            {!isEditing ? (
              <Fragment>
                {materials.map((material) => (
                  <div key={material.id} className='py-4 flex items-center justify-between'>
                    <div className="flex items-center gap-2">
                      <IconifyIcon icon="ri:file-3-line" className='text-primary-50 text-lg' />
                      <p className='text-sm'>{material.title}</p>
                    </div>
                    <div className='flex items-center cursor-pointer' onClick={() => helperUtil.downloadFile(material.content, material.title)}>
                      <IconifyIcon icon="ri:download-fill" className='text-primary-50' />
                    </div>
                  </div>
                ))}
                {materials.length === 0 && (
                  <div className='py-4'>
                    <p className='text-sm text-primary-50'>No materials found. <span onClick={startEditing} className='text-accent cursor-pointer'>Add new material.</span></p>
                  </div>
                )}
              </Fragment>
            ) : (
              <div className="flex flex-col gap-4 py-4">
                <FileUploader provider='do-spaces' type='course' fileType='any' onChange={(url) => addMaterial(url)} />
                <p className='text-xs text-primary-50'>Click the names to edit</p>
                {materials.map((material, index) => (
                  <CourseMaterialForm key={index} material={material} />
                ))}
              </div>
            )}
          </Fragment>
        )}
      </Card>
    </div>
  )
}
