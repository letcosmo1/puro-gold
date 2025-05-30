export type ApiResponse<T> = {
  ok: boolean,
  status: number,
  data: T;
};

export type ApiErrorResponse = {
  success: false,
  errorMessage: string
}