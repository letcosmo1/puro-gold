export const successfulLoginApiResponse = {
  ok: true,
  status: 200,
  data: {
    success: true,
    user: { id: "mocked-id", email: "mocked-email" },
    token: "mocked-token"
  }
}

export const invalidCredentialsLoginApiResponse = {
  ok: true,
  status: 404,
  data: {
    success: false,
    errorMessage: "mocked-error-message"
  }
}