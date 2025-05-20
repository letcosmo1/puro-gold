import { ApiResponse } from "@/types/api/api-response";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions = {
  method: Method;
  body?: any;
  token?: string;
}

export const request = async <T>(
  endpoint: string,
  { method, body, token }: RequestOptions,
  options?: { internalRequest: boolean }
): Promise<ApiResponse<T>> => {

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  let url: string = `${baseUrl}/${endpoint}`;

  if(options?.internalRequest) url = endpoint;

  const res = await fetch(url, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  });

  const data: T = res.status === 204 ? ({} as T) : await res.json();

  const response: ApiResponse<T> = {
    ok: res.ok,
    status: res.status,
    data: data
  }

  return response;
};