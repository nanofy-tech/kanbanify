import axios from '@/libs/axios'
import type {
  IResponse,
  SignUpDataParams,
  GetSendEmailParams,
  ValidateCodeParams,
  ValidateCodeResponse,
} from './types'

export const auth = {
  async signIn(data: Record<'email' | 'password', string> | undefined) {
    const response = await axios.post('/user/sign-in', data)

    return response.data
  },
  async signUp(data: SignUpDataParams) {
    const response = await axios.post('/user/sign-up', data)

    return response.data
  },
  async sendEmail(params: GetSendEmailParams) {
    const { status } = await axios.post<IResponse>(
      '/user/send-email-code',
      params,
    )

    return status
  },
  async validateCode(data: ValidateCodeParams) {
    const { data: email } = await axios.post<ValidateCodeResponse>(
      '/user/validate-code',
      data,
    )

    return email
  },
  async validateUserExists(data: { email: string | null | undefined }) {
    const response = await axios.post('/user/validate-user-exists', data)

    return response.data
  },
}
