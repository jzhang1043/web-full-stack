import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  config: {
    initialColorMode: localStorage.getItem("chakra-ui-color-mode") || "dark",
  },
  styles: {
    global: {
      // Applies styles globally across all color modes
      body: {
        bg: "gray.50", // Light mode background
        color: "black", // Text color for light mode
      },
      // Specific styles for the dark mode
      'html[data-theme="dark"] body': {
        bg: "gray.800", // Dark mode background
        color: "white", // Text color for dark mode
      },
    },
  },
})

export default theme
