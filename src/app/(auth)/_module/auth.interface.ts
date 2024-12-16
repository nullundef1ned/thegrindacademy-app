export interface LoginForm {
  email: string
  password: string
}

export interface PasswordForm {
  password: string
  confirmPassword: string
}

export interface SetupAccountRequest extends PasswordForm {
  token: string
}

export interface ForgotPasswordForm {
  email: string
}
