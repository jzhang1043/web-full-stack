import type { TUserCreate } from "../../models/users"
import { APIConfig } from "../api-config"
import { Request } from "../api-request"

/**
 * Creates a new user.
 * @returns A promise resolving to UserPublic.
 */
export const createUser = (data: TUserCreate): Promise<any> => {
  return Request(APIConfig, {
    method: "POST",
    url: "users",
    formData: data.formData,
    mediaType: "application/json",
  })
}

/**
 * Retrieves a list of users.
 * @returns A promise resolving to a list of users.
 */
export const getUsers = (): Promise<any> => {
  return Request(APIConfig, {
    method: "GET",
    url: "users",
  })
}
