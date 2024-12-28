import useAxios, { CustomError } from "@/hooks/useAxios"
import { useMutation } from "@tanstack/react-query"
import { ForgotPasswordForm, LoginForm, PasswordForm, SetupAccountRequest } from "../../_module/auth.interface"
import { useRouter } from "next/navigation";
import notificationUtil from "@/utils/notification.util";
import { useAppStore } from "@/app/_module/app.store";
import { IAuthResponse } from "@/app/_module/app.interface";
import useStudentHooks from "@/app/(student)/_module/student.hooks";
import useURL from "@/hooks/useURL";
import { URLKeyEnum } from "@/app/_module/app.enum";
import { StorageKey } from "@/utils/storage.util";
import storageUtil from "@/utils/storage.util";

export default function useStudentAuthMutations() {
  const router = useRouter()
  const axiosHandler = useAxios();
  const { searchParams } = useURL();
  const initialize = useAppStore(state => state.initialize);

  const { fetchReferral, fetchBankDetails } = useStudentHooks();

  const redirect = searchParams.get(URLKeyEnum.REDIRECT);

  const setupStudentAccount = (payload: IAuthResponse) => {
    initialize(payload);
    fetchReferral();
    fetchBankDetails();
  }

  const loginMutation = useMutation({
    mutationFn: async (values: LoginForm) => {
      const response = await axiosHandler.post('/student/auth/login', values)
      return response.data
    },
    onSuccess: (data: IAuthResponse) => {
      setupStudentAccount(data);
      storageUtil.saveItem(StorageKey.user, data.user);
      router.push(redirect ?? '/')
    },
    onError: (error: CustomError) => {
      notificationUtil.error(error.message)
    }
  })

  const setupAccountMutation = useMutation({
    mutationFn: async (values: SetupAccountRequest) => {
      const payload = {
        password: values.password,
        confirmPassword: values.confirmPassword
      }
      const response = await axiosHandler.post(`/student/account-setup?token=${values.token}`, payload)
      return response.data
    },
    onSuccess: (data: IAuthResponse) => {
      setupStudentAccount(data)
      notificationUtil.success("Success! Your account has been setup.")
      router.push(redirect ?? '/')
    },
    onError: (error: CustomError) => {
      notificationUtil.error(error.message)
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: (values: PasswordForm) => {
      return axiosHandler.patch('/student/auth/password/change', values)
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
      return axiosHandler.patch(`/student/auth/password/reset?token=${values.token}`, payload)
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
      return axiosHandler.post('/student/auth/password/forgot', values)
    },
    onError: (error: CustomError) => {
      notificationUtil.error(error.message)
    }
  })

  return {
    loginMutation,
    setupAccountMutation,
    changePasswordMutation,
    resetPasswordMutation,
    forgotPasswordMutation
  }
}
