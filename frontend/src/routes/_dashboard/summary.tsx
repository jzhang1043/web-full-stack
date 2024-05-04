import { Box, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import TopBar from "../../components/common/topbar"
export const Route = createFileRoute("/_dashboard/summary")({
  component: Summary,
})

function Summary() {
  return (
    <Box>
      <TopBar />
    </Box>
  )
}
