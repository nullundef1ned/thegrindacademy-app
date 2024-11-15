import useAxios from "@/hooks/useAxios"
import { useMutation } from "@tanstack/react-query"
import { ForgotPasswordForm, LoginForm, PasswordForm } from "./auth.interface"

export default function useAuthMutations() {

  const axiosHandler = useAxios()

  const loginMutation = useMutation({
    mutationFn: (values: LoginForm) => {
      return axiosHandler.post('/auth/login', values)
    }
  })

  const setupAccountMutation = useMutation({
    mutationFn: (values: PasswordForm) => {
      return axiosHandler.post('/auth/setup-account', values)
    }
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (values: PasswordForm) => {
      return axiosHandler.post('/auth/reset-password', values)
    }
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (values: ForgotPasswordForm) => {
      return axiosHandler.post('/auth/forgot-password', values)
    }
  })


  return {
    loginMutation,
    setupAccountMutation,
    resetPasswordMutation,
    forgotPasswordMutation
  }
}
