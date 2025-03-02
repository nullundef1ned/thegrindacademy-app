import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { FileType, VideoFileType } from './app.type';
import { AxiosProgressEvent } from 'axios';

export default function useAppMutations() {
  const axiosHandler = useAxios();

  const uploadFileMutation = useMutation({
    mutationFn: async (values: { file: File, type: FileType, progressCallback: (progress: AxiosProgressEvent) => void }): Promise<string> => {
      const formData = new FormData();
      formData.append('file', values.file);
      formData.append('type', values.type);

      const response = await axiosHandler.post('/file/do-spaces', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          values.progressCallback(progressEvent)
        }
      })
      return response.data
    },
  })

  const uploadVideoFileMutation = useMutation({
    mutationFn: async (values: { file: File, fileType: VideoFileType, progressCallback: (progress: AxiosProgressEvent) => void }): Promise<string> => {
      const formData = new FormData();
      formData.append('file', values.file);
      formData.append('fileType', values.fileType);


      const response = await axiosHandler.post('/file/bunny', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          values.progressCallback(progressEvent)
        }
      })
      return response.data
    },
  })

  const deleteVideoFileMutation = useMutation({
    mutationFn: async (values: { url: string }) => {
      const response = await axiosHandler.delete(`/file/bunny?url=${values.url}`)
      return response.data
    },
  })

  return { uploadFileMutation, uploadVideoFileMutation, deleteVideoFileMutation }
}
