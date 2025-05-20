export type ApiResponse<T> = {
  ok: boolean,
  status: number,
  data: T;
};

export type DefaultApiData = {
  errorMessage?: string
}