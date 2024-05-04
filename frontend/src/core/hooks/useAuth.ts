import { useToast } from "@chakra-ui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import axios from "axios"
import { useState } from "react"
import type { APIError } from "../api/api-error"
import {
  getCurrentUser,
  loginForAccessToken,
} from "../api/api-services/auth-service"
import { createUser } from "../api/api-services/user-service"
import type {
  OAuth2PasswordRequestForm,
  TUserCreateForm,
  TUserPublic,
} from "../models/users"

export const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null
}

const useAuth = () => {
  const [error, setError] = useState<string | null>(null) //handle auth errors

  const navigate = useNavigate() // redirect users between pages

  const toast = useToast()

  // renaming data to user
  const { data: user, isLoading } = useQuery<TUserPublic | null, Error>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: isLoggedIn(), //the query to fetch user data will only run if isLoggedIn() returns true
  })

  const login = async (data: OAuth2PasswordRequestForm) => {
    const response = await loginForAccessToken({ formData: data })
    localStorage.setItem("access_token", response.access_token)
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: "/summary" })
    },
    onError: (err: APIError) => {
      // detail: the error detail from the backend HTTPException raised by FastAPI
      let errorDetail = (err.data as any)?.detail

      // err is not a APIError but a AxiosError, indicating other errors such as network error or cancelling request
      if (axios.isAxiosError(err)) {
        errorDetail = err.message
      }

      // some APIs return errors not just as simple messages, but as arrays of errors.
      if (Array.isArray(errorDetail)) {
        errorDetail = "Something went wrong"
      }
      setError(errorDetail)
    },
  })

  const singup = async (data: TUserCreateForm) => {
    await createUser({ formData: data })
  }

  const signupMutation = useMutation({
    mutationFn: singup,
    onSuccess: () => {
      navigate({ to: "/login" })
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    },
    onError: (err: APIError) => {
      // detail: the error detail from the backend HTTPException raised by FastAPI
      let errorDetail = (err.data as any)?.detail

      // err is not a APIError but a AxiosError, indicating other errors such as network error or cancelling request
      if (axios.isAxiosError(err)) {
        errorDetail = err.message
      }

      // some APIs return errors not just as simple messages, but as arrays of errors.
      if (Array.isArray(errorDetail)) {
        errorDetail = "Something went wrong"
      }
      setError(errorDetail)
    },
  })

  const logout = () => {
    localStorage.removeItem("access_token")
    navigate({ to: "/" })
  }

  return {
    error,
    resetError: () => setError(null),
    loginMutation,
    signupMutation,
    logout,
    user,
    isLoading,
  }
}

export default useAuth
