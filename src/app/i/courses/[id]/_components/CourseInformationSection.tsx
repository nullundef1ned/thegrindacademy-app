import React, { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button';
import Card from '@/components/Card';
import { ICourseDetail } from '@/app/(student)/_module/_interfaces/course.interface';
import Status from '@/components/table/Status';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useFormik } from 'formik';
import { IAdminCourseUpdateForm } from '@/interfaces/course';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useAdminCourseMutations from '../../_apis/admin-course.mutations';
import notificationUtil from '@/utils/notification.util';

interface ICourseInformationSectionProps {
  course: ICourseDetail;
}

export default function CourseInformationSection({ course }: ICourseInformationSectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setIsEditing(false)
    resetForm();
  };
  const { updateCourseMutation } = useAdminCourseMutations();

  const { handleSubmit, handleChange, setFieldValue, values, resetForm } = useFormik<IAdminCourseUpdateForm>({
    initialValues: {
      id: course?.id,
      name: course?.name,
      shortDescription: course?.shortDescription,
      description: course?.description,
      telegramChannelId: course?.telegramChannelId,
      status: course?.status,
      isFeatured: course?.isFeatured,
    },
    onSubmit: (values) => {
      const telegramURLParts = values.telegramChannelId.split('/');
      const version = telegramURLParts[3].toLowerCase();
      const id = telegramURLParts[4];

      const telegramChannelId = version?.toLowerCase() === 'a'
        ? id.split('#')[1]
        : version?.toLowerCase() === 'k'
          ? `-100${id.split('#-')[1]}`
          : values.telegramChannelId;

      updateCourseMutation.mutate({ ...values, telegramChannelId }, {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (error) => {
          notificationUtil.error(error.message);
        }
      });
    },
  });

  const enrollment = 100;

  return (
    <div className='space-y-4'>
      <div className="flex items-center gap-4 justify-between">
        <p className="font-medium text-accent">Course Information</p>
        {isEditing ? (
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" onClick={cancelEditing}>
              Cancel
            </Button>
            <Button loading={updateCourseMutation.isPending} size="sm" onClick={() => handleSubmit()}>
              Save Changes
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={startEditing}>
            Edit
          </Button>
        )}
      </div>
      <Card className="divide-y !py-0">
        {!isEditing ? (
          <Fragment>
            <div className="flex flex-col gap-3 py-4">
              <p className="text-sm font-semibold text-primary-50">Course Overview</p>
              <p className="text-base">{course?.shortDescription}</p>
            </div>
            <div className="flex flex-col gap-3 py-4">
              <p className="text-sm font-semibold text-primary-50">Course Description</p>
              <p className="text-base">{course?.description}</p>
            </div>
            <div className="flex items-start gap-6 py-4">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-primary-50">Enrollment</p>
                <p className="text-base">{enrollment}</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-primary-50">Status</p>
                <Status status={course?.status} />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-primary-50">Featured</p>
                <p className="text-base">{course?.isFeatured ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </Fragment>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
            <Input placeholder="Course Name" name="name" required onChange={handleChange} value={values.name} />
            <Input placeholder="Course Short Description" name="shortDescription" required onChange={handleChange} value={values.shortDescription} />
            <Textarea placeholder="Course Description" name="description" required onChange={handleChange} value={values.description} />
            <Input
              icon="ri:telegram-2-fill"
              placeholder="Telegram Group URL"
              type='url'
              name="telegramChannelId"
              required onChange={handleChange}
              value={values.telegramChannelId} />
            <div className="flex items-start gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-primary-50">Status</p>
                <Select value={values.status} onValueChange={(value) => setFieldValue('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-primary-50">Featured</p>
                <Switch checked={values.isFeatured} onCheckedChange={(value) => setFieldValue('isFeatured', value)} />
              </div>
            </div>
          </form>
        )}
      </Card>
    </div>
  )
}
