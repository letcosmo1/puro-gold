export type ApiResponse<T> = {
  ok: boolean,
  status: number,
  data: T;
};

export type DefaultApiResponse = {
  errorMessage?: string
}