import type { TUserLogin } from "../../models/users"
import { APIConfig } from "../api-config"
import { Request } from "../api-request"

/**
 * Authenticates a user and returns a token.
 * @param data - User login credentials.
 * @returns A promise resolving to the authentication token.
 */
export const loginForAccessToken = (data: TUserLogin): Promise<any> => {
  return Request(APIConfig, {
    method: "POST",
    url: "token",
    formData: data.formData,
    mediaType: "application/x-www-form-urlencoded",
  })
}

/**
 * Retrieves the currently authenticated user's details.
 * @returns A promise resolving to the user's details.
 */
export const getCurrentUser = (): Promise<any> => {
  return Request(APIConfig, {
    method: "GET",
    url: "users/me",
  })
}
