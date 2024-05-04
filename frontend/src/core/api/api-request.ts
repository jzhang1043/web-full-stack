import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios"
import type { TAPIConfig, TAPIRequest } from "../utils/types"
import { catchAxiosErrors } from "./api-error"

import BluebirdPromise from "bluebird"
BluebirdPromise.config({ cancellation: true })

export const Request = <T>(
  APIConfig: TAPIConfig,
  APIRequest: TAPIRequest,
  axiosClient: AxiosInstance = axios,
): BluebirdPromise<T> => {
  const abortController = new AbortController()

  return new BluebirdPromise((resolve, reject, onCancel) => {
    sendRequest(APIConfig, APIRequest, axiosClient, abortController)
      .then((response: AxiosResponse<any>) => {
        catchAxiosErrors(APIRequest, {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          url: APIRequest.url,
        })
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })

    if (onCancel) {
      onCancel(() => {
        abortController.abort()
      })
    }
  })
}

export const sendRequest = async <T>(
  APIConfig: TAPIConfig,
  APIRequest: TAPIRequest,
  axiosClient: AxiosInstance,
  abortController: AbortController,
): Promise<AxiosResponse<T>> => {
  const header = await getHeader(APIConfig, APIRequest)
  const AxiosConfig: AxiosRequestConfig = {
    url: APIRequest.url,
    method: APIRequest.method,
    baseURL: `${APIConfig.baseURL}/${APIConfig.VERSION}`,
    data: APIRequest.body ?? getFormData(APIRequest),
    headers: header,
    signal: abortController.signal,
  }

  return new BluebirdPromise((resolve, reject) => {
    axiosClient(AxiosConfig)
      .then((response) => {
        resolve(response)
      })
      .catch((error: AxiosError<T>) => {
        if (error.response) {
          // Even if Axios reject with an Error, we resolve this error.response,
          // where CatchAxiosError in Request() will then handle the typical errors uniformly.
          resolve(error.response)
        } else {
          // for other unexpected errors such as network error and cancelling requests, we reject the errors as default
          reject(error)
        }
      })
  })
}

const getFormData = (APIRequest: TAPIRequest): FormData | undefined => {
  if (APIRequest.formData) {
    const formData = new FormData()

    const process = (key: string, value: unknown) => {
      if (typeof value === "string" || value instanceof Blob) {
        formData.append(key, value)
      } else {
        formData.append(key, JSON.stringify(value))
      }
    }

    for (const [key, value] of Object.entries(APIRequest.formData)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          for (const v of value) {
            process(key, v)
          }
        } else {
          process(key, value)
        }
      }
    }

    return formData
  }
}

const getHeader = async (
  APIConfig: TAPIConfig,
  APIRequest: TAPIRequest,
): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    Accept: "application/json",
  }

  const token = await APIConfig.TOKEN()
  if (token !== "") {
    headers.Authorization = `Bearer ${token}`
  }

  if (APIRequest.headers) {
    Object.assign(headers, APIRequest.headers)
  }

  if (APIRequest.body !== undefined) {
    if (APIRequest.mediaType) {
      headers["Content-Type"] = APIRequest.mediaType
    } else if (APIRequest.body instanceof Blob) {
      headers["Content-Type"] =
        APIRequest.body.type || "application/octet-stream"
    } else if (typeof APIRequest.body === "string") {
      headers["Content-Type"] = "text/plain"
    } else if (APIRequest.body instanceof FormData) {
      headers["Content-Type"] = "application/json"
    }
  } else if (APIRequest.formData !== undefined) {
    if (APIRequest.mediaType) {
      headers["Content-Type"] = APIRequest.mediaType
    }
  }

  return headers
}
