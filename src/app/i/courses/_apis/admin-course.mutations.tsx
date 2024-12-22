import useAxios from '@/hooks/useAxios';
import { IAdminBulkCourseLessonForm, IAdminBulkCourseMaterialForm, IAdminCourseForm, IAdminCourseLessonDeleteForm, IAdminCourseLessonForm, IAdminCourseLessonUpdateForm, IAdminCourseMaterialDeleteForm, IAdminCourseMaterialForm, IAdminCourseMaterialUpdateForm, IAdminCourseMediaForm, IAdminCourseUpdateForm } from '@/interfaces/course';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IAdminCourse } from '@/interfaces/course';
import { ICourseLesson, ICourseMaterial, ICourseMedia } from '@/app/(student)/_module/_interfaces/course.interface';
import notificationUtil from '@/utils/notification.util';

export default function useAdminCourseMutations() {
  const axiosHandler = useAxios();

  const createCourseMutation = useMutation({
    mutationFn: async (payload: IAdminCourseForm): Promise<IAdminCourse> => {
      const response = await axiosHandler.post(`/admin/course`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['courses'] })
    }
  })

  const createCourseMaterialMutation = useMutation({
    mutationFn: async (payload: IAdminCourseMaterialForm): Promise<ICourseMaterial> => {
      const { courseId, ...rest } = payload;
      const response = await axiosHandler.post(`/admin/course/${courseId}/material`, rest)
      return response.data;
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['course', context.courseId, 'materials'] })
    }
  })

  const createCourseLessonMutation = useMutation({
    mutationFn: async (payload: IAdminCourseLessonForm): Promise<ICourseLesson> => {
      const { courseId, ...rest } = payload;
      const response = await axiosHandler.post(`/admin/course/${courseId}/lesson`, rest)
      return response.data;
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['course', context.courseId, 'lessons'] })
    }
  })

  const createOrUpdateCourseMediaMutation = useMutation({
    mutationFn: async (payload: IAdminCourseMediaForm): Promise<ICourseMedia> => {
      const { courseId, ...rest } = payload;
      const response = await axiosHandler.post(`/admin/course/${courseId}/media`, rest)
      return response.data;
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['course', context.courseId, 'media'] })
    }
  })

  const updateCourseMutation = useMutation({
    mutationFn: async (payload: Partial<IAdminCourseUpdateForm>): Promise<IAdminCourse> => {
      const { id, ...rest } = payload;
      const response = await axiosHandler.patch(`/admin/course/${id}`, rest)
      return response.data;
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['courses'] })
      queryClient.refetchQueries({ queryKey: ['course', context.id] })
    }
  })

  const updateCourseMaterialMutation = useMutation({
    mutationFn: async (payload: IAdminCourseMaterialUpdateForm): Promise<ICourseMaterial> => {
      const { courseId, materialId, ...rest } = payload;
      const response = await axiosHandler.patch(`/admin/course/${courseId}/material/${materialId}`, rest)
      return response.data;
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['course', context.courseId, 'materials'] })
    }
  })

  const bulkCreateCourseLessonMutation = useMutation({
    mutationFn: async (payload: { lessons: IAdminBulkCourseLessonForm[], courseId: string }): Promise<string> => {
      const { courseId, lessons } = payload;
      const response = await axiosHandler.post(`/admin/course/${courseId}/lesson/bulk`, lessons)
      return response.data;
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['course', context.courseId, 'lessons'] })
    }
  })


  const bulkCreateCourseMaterialMutation = useMutation({
    mutationFn: async (payload: { materials: IAdminBulkCourseMaterialForm[], courseId: string }): Promise<string> => {
      const { courseId, materials } = payload;
      const response = await axiosHandler.post(`/admin/course/${courseId}/material/bulk`, materials)
      return response.data;
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['course', context.courseId, 'materials'] })
    }
  })

  const updateCourseLessonMutation = useMutation({
    mutationFn: async (payload: IAdminCourseLessonUpdateForm): Promise<ICourseLesson> => {
      const { courseId, lessonId, ...rest } = payload;
      const response = await axiosHandler.patch(`/admin/course/${courseId}/lesson/${lessonId}`, rest)
      return response.data;
    },
    onSuccess: () => {
      notificationUtil.success('Lesson saved successfully')
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['course', context.courseId, 'lessons'] })
    }
  })

  const deleteCourseMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await axiosHandler.delete(`/admin/course/${id}`)
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['courses'] })
    }
  })

  const deleteCourseMaterialMutation = useMutation({
    mutationFn: async (payload: IAdminCourseMaterialDeleteForm): Promise<void> => {
      const { courseId, materialId } = payload;
      await axiosHandler.delete(`/admin/course/${courseId}/material/${materialId}`)
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['course', context.courseId, 'materials'] })
    }
  })

  const deleteCourseLessonMutation = useMutation({
    mutationFn: async (payload: IAdminCourseLessonDeleteForm): Promise<void> => {
      const { courseId, lessonId } = payload;
      await axiosHandler.delete(`/admin/course/${courseId}/lesson/${lessonId}`)
    },
    onSuccess: () => {
      notificationUtil.success('Lesson deleted successfully')
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['course', context.courseId, 'lessons'] })
    }
  })

  return {
    createCourseMutation,
    createCourseMaterialMutation,
    createCourseLessonMutation,
    createOrUpdateCourseMediaMutation,
    bulkCreateCourseLessonMutation,
    bulkCreateCourseMaterialMutation,
    updateCourseMutation,
    updateCourseMaterialMutation,
    updateCourseLessonMutation,
    deleteCourseMutation,
    deleteCourseMaterialMutation,
    deleteCourseLessonMutation
  }
}
