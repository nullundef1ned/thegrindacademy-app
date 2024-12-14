import useAxios from "@/hooks/useAxios"
import { useMutation } from "@tanstack/react-query"
import { ForgotPasswordForm, LoginForm, PasswordForm, SetupAccountRequest } from "../../_module/auth.interface"
import { useRouter } from "next/navigation";
import notificationUtil from "@/utils/notification.util";
import { IAuthResponse } from "@/app/_module/app.interface";
import useURL from "@/hooks/useURL";
import { URLKeyEnum } from "@/app/_module/app.enum";
import { adminRoutes } from "@/app/i/_module/admin.routes";
import storageUtil, { StorageKey } from "@/utils/storage.util";
import { queryClient } from "@/providers/tanstack-query.provder";

export default function useAdminAuthMutations() {
  const router = useRouter()
  const axiosHandler = useAxios();
  const { searchParams } = useURL();

  const redirect = searchParams.get(URLKeyEnum.REDIRECT);

  const loginMutation = useMutation({
    mutationFn: async (values: LoginForm) => {
      const response = await axiosHandler.post('/admin/auth/login', values)
      return response.data
    },
    onSuccess: (data: IAuthResponse) => {
      storageUtil.saveItem(StorageKey.user, data.user)
      storageUtil.saveItem(StorageKey.token, data.accessToken)
      queryClient.setQueryData(['user'], data.user)

      notificationUtil.success("Welcome back Dexter")
      router.push(redirect ?? adminRoutes.dashboard)
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: (values: PasswordForm) => {
      return axiosHandler.patch('/admin/auth/password/change', values)
    },
    onSuccess: () => {
      notificationUtil.success("Success! Your password has been changed.")
    }
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (values: SetupAccountRequest) => {
      const payload = {
        password: values.password,
        confirmPassword: values.confirmPassword
      }
      return axiosHandler.patch(`/ admin / auth / password / reset ? token = ${values.token}`, payload)
    },
    onSuccess: () => {
      notificationUtil.success("Success! Your password has been reset.")
      router.push(redirect ?? '/login');
    }
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (values: ForgotPasswordForm) => {
      return axiosHandler.post('/admin/auth/password/forgot', values)
    }
  })

  return {
    loginMutation,
    changePasswordMutation,
    resetPasswordMutation,
    forgotPasswordMutation
  }
}
