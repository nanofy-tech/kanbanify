export type GetSendEmailParams = {
  email: string
}

export type IResponse = {
  status: number
}

export type ValidateCodeParams = {
  code: string
}

export type ValidateCodeResponse = {
  email: string
}

export type SignUpDataParams = {
  email: string
  username: string
  password: string
  confirmPassword: string
}
