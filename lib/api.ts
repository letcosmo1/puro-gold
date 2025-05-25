import { ApiResponse } from "@/types/api/api-response";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions<TBody> = {
  method: Method;
  body?: TBody;
  token?: string;
}

export const request = async <TResponse, TBody>(
  endpoint: string,
  { method, body, token }: RequestOptions<TBody>
): Promise<ApiResponse<TResponse>> => {

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url: string = `${baseUrl}/${endpoint}`;

  const res = await fetch(url, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  });

  const data: TResponse = res.status === 204 ? ({} as TResponse) : await res.json();

  const response: ApiResponse<TResponse> = {
    ok: res.ok,
    status: res.status,
    data: data
  }

  return response;
};