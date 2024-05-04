import type { TAPIConfig } from "../utils/types"

export const APIConfig: TAPIConfig = {
  baseURL: "http://localhost:8000/api",
  VERSION: "v1",
  TOKEN: async () => {
    return localStorage.getItem("access_token") || ""
  },
}
