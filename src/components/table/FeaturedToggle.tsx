import useAdminCourseMutations from '@/app/i/courses/_apis/admin-course.mutations';
import React from 'react'
import { Switch } from '../ui/switch';

interface FeaturedToggleProps {
  courseId: string;
  isFeatured: boolean;
  published: boolean;
}

export default function FeaturedToggle({ courseId, isFeatured, published }: FeaturedToggleProps) {
  const { updateCourseMutation } = useAdminCourseMutations();

  const toggleFeatured = () => {
    updateCourseMutation.mutate({ id: courseId, isFeatured: !isFeatured });
  }

  return (
    <Switch checked={isFeatured} disabled={!published} onCheckedChange={toggleFeatured} />
  )
}
