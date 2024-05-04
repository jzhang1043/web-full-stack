import { Box, Flex, Heading } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import Navbar from "../components/common/navbar"

// the route path depends on the file's name and directory.
// Since index.tsx is under _layout, this route path becomes /_layout/ when running the server.
export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <Box>
      <Navbar />
      <HomeContent />
    </Box>
  )
}

const HomeContent = () => {
  return (
    <Flex minH={"calc(100vh - 60px)"} align={"center"} justify={"center"}>
      <Heading whiteSpace="nowrap" fontSize={"4xl"}>
        Welcome to my web application!
      </Heading>
    </Flex>
  )
}
