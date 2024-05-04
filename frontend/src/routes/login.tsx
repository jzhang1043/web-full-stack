import { Box } from "@chakra-ui/react"
import { createFileRoute, redirect } from "@tanstack/react-router"
import TopBar from "../components/common/topbar"
import LoginCard from "../components/loginNsignup/logincard"
import { isLoggedIn } from "../core/hooks/useAuth"

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/summary",
      })
    }
  },
})

function Login() {
  return (
    <Box>
      <TopBar />
      <LoginCard />
    </Box>
  )
}
