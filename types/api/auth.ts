export type LoginResponse = {
  errorMessage?: string,
  user?: {
    id: string,
    email: string
  },
  token: string
}

export type LoginBody = {
  email: string,
  password: string
}