import { api } from './api'
import { saveItem } from './storage'
import { saveAuthToken } from './storage'

interface LoginFormValues {
  email: string
  password: string
}

interface AuthResponse {
  accessToken: string
  user: {
    id: number
    name: string
    email: string
    avatarUrl: string
  }
}

interface ForgotPasswordValues {
  email: string
}

interface VerifyTokenValues {
  token: string
  email: string
}

interface ResetPasswordValues {
  email: string
  token: string
  newPassword: string
}

export const loginCall = async (
  data: LoginFormValues
): Promise<AuthResponse> => {
  const response = await api.post('/auth', data)
  const { accessToken } = response.data
  await saveItem('@Allegre_token', accessToken)
  return response.data
}

export const forgotPasswordCall = async (data: ForgotPasswordValues) => {
  const response = await api.post('/auth/forgot-password', data)
  return response.data
}

export const verifyTokenCall = async (data: VerifyTokenValues) => {
  const response = await api.post('/auth/verify-token', data)
  return response.data
}

export const resetPasswordCall = async (data: ResetPasswordValues) => {
  const response = await api.post('/auth/reset-password', data)
  return response.data
}
