import useAxios from '@/hooks/useAxios';
import { IAdminCourseForm, IAdminCourseLessonDeleteForm, IAdminCourseLessonForm, IAdminCourseLessonUpdateForm, IAdminCourseMaterialDeleteForm, IAdminCourseMaterialForm, IAdminCourseMaterialUpdateForm, IAdminCourseMediaForm, IAdminCourseUpdateForm } from '@/interfaces/course';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IAdminCourse } from '@/interfaces/course';
import { ICourseLesson, ICourseMaterial, ICourseMedia } from '@/app/(student)/_module/_interfaces/course.interface';

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

  const createOrUpdateCourseMaterialMutation = useMutation({
    mutationFn: async (payload: IAdminCourseMaterialForm): Promise<ICourseMaterial> => {
      const { courseId, ...rest } = payload;
      const response = await axiosHandler.post(`/admin/course/${courseId}/material`, rest)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['courses'] })
    }
  })

  const createCourseLessonMutation = useMutation({
    mutationFn: async (payload: IAdminCourseLessonForm): Promise<ICourseLesson> => {
      const { courseId, ...rest } = payload;
      const response = await axiosHandler.post(`/admin/course/${courseId}/lesson`, rest)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['courses'] })
    }
  })

  const createCourseMediaMutation = useMutation({
    mutationFn: async (payload: IAdminCourseMediaForm): Promise<ICourseMedia> => {
      const { courseId, ...rest } = payload;
      const response = await axiosHandler.post(`/admin/course/${courseId}/media`, rest)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['courses'] })
    }
  })

  const updateCourseMutation = useMutation({
    mutationFn: async (payload: IAdminCourseUpdateForm): Promise<IAdminCourse> => {
      const { id, ...rest } = payload;
      const response = await axiosHandler.patch(`/admin/course/${id}`, rest)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['courses'] })
    }
  })

  const updateCourseMaterialMutation = useMutation({
    mutationFn: async (payload: IAdminCourseMaterialUpdateForm): Promise<ICourseMaterial> => {
      const { courseId, materialId, ...rest } = payload;
      const response = await axiosHandler.patch(`/admin/course/${courseId}/material/${materialId}`, rest)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['courses'] })
    }
  })

  const updateCourseLessonMutation = useMutation({
    mutationFn: async (payload: IAdminCourseLessonUpdateForm): Promise<ICourseLesson> => {
      const { courseId, lessonId, ...rest } = payload;
      const response = await axiosHandler.patch(`/admin/course/${courseId}/lesson/${lessonId}`, rest)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['courses'] })
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
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['courses'] })
    }
  })

  const deleteCourseLessonMutation = useMutation({
    mutationFn: async (payload: IAdminCourseLessonDeleteForm): Promise<void> => {
      const { courseId, lessonId } = payload;
      await axiosHandler.delete(`/admin/course/${courseId}/lesson/${lessonId}`)
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['courses'] })
    }
  })

  return {
    createCourseMutation,
    createOrUpdateCourseMaterialMutation,
    createCourseLessonMutation,
    createCourseMediaMutation,
    updateCourseMutation,
    updateCourseMaterialMutation,
    updateCourseLessonMutation,
    deleteCourseMutation,
    deleteCourseMaterialMutation,
    deleteCourseLessonMutation
  }
}
