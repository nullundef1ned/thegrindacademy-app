const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

const validateEmail = (email: string): boolean => {
  return emailRegex.test(email)
}

const validatePassword = (password: string): boolean => {
  return passwordRegex.test(password)
}

const validatorUtil = { validateEmail, validatePassword }

export default validatorUtil