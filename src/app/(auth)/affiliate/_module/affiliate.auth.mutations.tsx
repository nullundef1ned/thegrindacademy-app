import useAxios, { CustomError } from "@/hooks/useAxios"
import { useMutation } from "@tanstack/react-query"
import { ForgotPasswordForm, LoginForm, PasswordForm, RegisterForm, SetupAccountRequest } from "../../_module/auth.interface"
import { useRouter } from "next/navigation";
import notificationUtil from "@/utils/notification.util";
import { IAuthResponse } from "@/app/_module/app.interface";
import useURL from "@/hooks/useURL";
import { URLKeyEnum } from "@/app/_module/app.enum";
import storageUtil, { StorageKey } from "@/utils/storage.util";
import { queryClient } from "@/providers/tanstack-query.provder";
import { affiliateRoutes } from "@/app/affiliate/_module/affiliate.routes";

export default function useAffiliateAuthMutations() {
  const router = useRouter()
  const axiosHandler = useAxios();
  const { searchParams } = useURL();

  const redirect = searchParams.get(URLKeyEnum.REDIRECT);

  const loginMutation = useMutation({
    mutationFn: async (values: LoginForm) => {
      const response = await axiosHandler.post('/affiliate/auth/login', values)
      return response.data
    },
    onSuccess: (data: IAuthResponse) => {
      storageUtil.saveItem(StorageKey.user, data.user)
      storageUtil.saveItem(StorageKey.token, data.accessToken)
      queryClient.setQueryData(['user'], data.user)

      router.push(redirect ?? affiliateRoutes.dashboard)
    },
    onError: (error: CustomError) => {
      notificationUtil.error(error.message)
    }
  })

  const registerMutation = useMutation({
    mutationFn: async (values: RegisterForm) => {
      const response = await axiosHandler.post('/affiliate/auth/register', values)
      return response.data
    },
    onSuccess: (data: IAuthResponse) => {
      storageUtil.saveItem(StorageKey.user, data.user)
      storageUtil.saveItem(StorageKey.token, data.accessToken)
      queryClient.setQueryData(['user'], data.user)

      router.push(redirect ?? affiliateRoutes.dashboard)
    },
    onError: (error: CustomError) => {
      notificationUtil.error(error.message)
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: (values: PasswordForm) => {
      return axiosHandler.patch('/affiliate/auth/password/change', values)
    },
    onSuccess: () => {
      notificationUtil.success("Success! Your password has been changed.")
    },
    onError: (error: CustomError) => {
      notificationUtil.error(error.message)
    }
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (values: SetupAccountRequest) => {
      const payload = {
        password: values.password,
        confirmPassword: values.confirmPassword
      }
      return axiosHandler.patch(`/affiliate/auth/password/reset?token=${values.token}`, payload)
    },
    onSuccess: () => {
      notificationUtil.success("Success! Your password has been reset.")
      router.push(redirect ?? '/login');
    },
    onError: (error: CustomError) => {
      notificationUtil.error(error.message)
    }
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (values: ForgotPasswordForm) => {
      return axiosHandler.post('/affiliate/auth/password/forgot', values)
    },
    onError: (error: CustomError) => {
      notificationUtil.error(error.message)
    }
  })

  return {
    loginMutation,
    registerMutation,
    changePasswordMutation,
    resetPasswordMutation,
    forgotPasswordMutation
  }
}
