import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { IStudentInterview } from "@/interfaces/student-interview";

export function useFetchStudentInterview(id: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['student-interview', id],
    queryFn: async (): Promise<IStudentInterview | null> => {
      if (id === 'new') return null;
      const response = await axiosHandler.get(`/admin/website-content/student-interview/${id}`)
      return response.data;
    },
  })

  return query;
}