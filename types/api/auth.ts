export type LoginResponse = {
  success: true,
  user: {
    id: string,
    email: string
  },
  token: string
}

export type LoginData = {
  email: string,
  password: string
}