export type TAPIConfig = {
  baseURL: string
  VERSION: string
  TOKEN: () => Promise<string>
}

export type TAPIRequest = {
  readonly url: string
  readonly method: "GET" | "PUT" | "POST" | "DELETE"
  readonly body?: any
  readonly formData?: Record<string, unknown>
  readonly headers?: Record<string, unknown>
  readonly mediaType?: string
  readonly responseHeader?: string
  readonly errors?: Record<number, string>
}

export type TAPIResult<TData = any> = {
  readonly data: TData
  readonly status: number
  readonly statusText: string
  readonly url: string
}
