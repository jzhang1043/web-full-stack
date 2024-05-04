import { Box } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import TopBar from "../components/common/topbar"
import SignupCard from "../components/loginNsignup/signupcard"

export const Route = createFileRoute("/register")({
  component: Register,
})

function Register() {
  return (
    <Box>
      <TopBar />
      <SignupCard />
    </Box>
  )
}
