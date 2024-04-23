import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import logo from "../assets/Logo.png"

export const Route = createFileRoute("/login")({
  component: Login,
})

function Login() {
  return (
    <Box>
      <Navbar />
      <LoginCard />
    </Box>
  )
}

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const bgColor = useColorModeValue("gray.50", "gray.800")
  const font_color = useColorModeValue("black", "white")
  const fontHoverColor = useColorModeValue("blue.600", "blue.200")
  return (
    <Flex
      bg={bgColor}
      color={font_color}
      minH={"60px"}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={bgColor}
      align={"center"}
    >
      <Flex
        flex={{ base: 1, md: "auto" }}
        justify={"start"}
        align="center"
        width="100%"
      >
        <Link
          href="/"
          _hover={{
            textDecoration: "none",
            color: fontHoverColor,
          }}
          fontSize={"md"}
          fontWeight={600}
        >
          <Flex align="center">
            <Image
              boxSize="30"
              src={logo}
              alt="Logo"
              alignSelf={useBreakpointValue({ base: "center", md: "left" })}
            />
            <Flex ml={2}>
              <Text whiteSpace="nowrap">Jiahao's Management Tool Demo</Text>
            </Flex>
          </Flex>
        </Link>
      </Flex>

      <Flex flex={{ base: 1, md: "auto" }} justify={"flex-end"}>
        <Button
          onClick={toggleColorMode}
          bg={bgColor}
          _hover={{
            bg: useColorModeValue("gray.400", "gray.500"),
          }}
        >
          {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Flex>
    </Flex>
  )
}

const LoginCard = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800")
  const linkColor = useColorModeValue("blue.400", "blue.300")
  return (
    <Flex
      minH={"calc(100vh - 60px)"}
      align={"center"}
      justify={"center"}
      bg={bgColor}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text
            fontSize={"lg"}
            color={useColorModeValue("gray.600", "gray.500")}
          >
            to enjoy all of our cool <Link color={linkColor}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={linkColor}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign In
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                New User? <Link color={linkColor}>Create Account</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
