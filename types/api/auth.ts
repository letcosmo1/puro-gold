export type LoginData = {
  errorMessage?: string,
  user?: {
    id: string,
    email: string
  },
  token: string
}