import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../app.interface";
import { usePathname } from "next/navigation";

export function useFetchUser() {
  const axiosHandler = useAxios();
  const pathname = usePathname();

  const rootPath = pathname.split('/')[1]

  const role = rootPath === 'i' ? 'admin' : 'student';

  const query = useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<IUser> => {
      const response = await axiosHandler.get(`/${role}/auth`)
      return response.data
    }
  })

  return query;
}