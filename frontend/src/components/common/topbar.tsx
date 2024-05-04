import {
  Avatar,
  Button,
  Center,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"

import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import logo from "../../assets/Logo.png"
import { isLoggedIn } from "../../core/hooks/useAuth"
import useAuth from "../../core/hooks/useAuth"

export default function TopBar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue("gray.50", "gray.800")
  const font_color = useColorModeValue("black", "white")
  const fontHoverColor = useColorModeValue("blue.600", "blue.200")

  const { logout, user } = useAuth()

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
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex alignItems={"center"}>
        <Link
          href="/"
          fontSize={"md"}
          fontWeight={600}
          _hover={{
            textDecoration: "none",
            color: fontHoverColor,
          }}
        >
          <Flex align="center">
            <Image
              boxSize="30"
              src={logo}
              alt="Logo"
              alignSelf={useBreakpointValue({ base: "center", md: "left" })}
            />
            <Flex ml={4}>
              <Text whiteSpace="nowrap">Jiahao's Management Tool Demo</Text>
            </Flex>
          </Flex>
        </Link>
      </Flex>

      <Flex alignItems={"center"}>
        <Stack direction={"row"} spacing={7}>
          <Button
            onClick={toggleColorMode}
            bg={bgColor}
            _hover={{
              bg: useColorModeValue("gray.400", "gray.500"),
            }}
          >
            {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          </Button>

          {isLoggedIn() && (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </Center>
                <br />
                <Center>
                  <p>{user?.profile_name || user?.email}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem onClick={() => setTimeout(logout, 200)}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Stack>
      </Flex>
    </Flex>
  )
}
