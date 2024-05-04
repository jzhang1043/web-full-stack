import type { TAPIRequest, TAPIResult } from "../utils/types"

export class APIError extends Error {
  public readonly request: TAPIRequest
  public readonly data: unknown
  public readonly status: number
  public readonly statusText: string
  public readonly url: string

  constructor(APIRequest: TAPIRequest, APIResult: TAPIResult) {
    super(`${APIResult.status}-${APIResult.statusText}`)

    this.name = "APIError"
    this.request = APIRequest
    this.data = APIResult.data
    this.status = APIResult.status
    this.statusText = APIResult.statusText
    this.url = APIResult.url
  }
}

export const catchAxiosErrors = (
  APIRequest: TAPIRequest,
  APIResult: TAPIResult,
): void => {
  const errors: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "Im a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Content",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
    ...APIRequest.errors,
  }

  const error = errors[APIResult.status]

  if (error || !(APIResult.status >= 200 && APIResult.status < 300)) {
    throw new APIError(APIRequest, APIResult)
  }
}
