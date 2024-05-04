import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import logo from "../../assets/Logo.png"

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const navbar_bgColor = useColorModeValue("gray.200", "gray.800")
  const font_color = useColorModeValue("black", "white")

  return (
    <Box>
      <Flex
        bg={navbar_bgColor}
        color={font_color}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        alignItems={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={4} h={4} /> : <HamburgerIcon w={6} h={6} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1, md: "auto" }}
          justify={{ base: "center", md: "start" }}
          align="center"
          height="100%"
        >
          <Link href="/">
            <Image
              boxSize="30"
              src={logo}
              alt="Logo"
              alignSelf={useBreakpointValue({ base: "center", md: "left" })}
            />
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={3}
        >
          <Button
            onClick={toggleColorMode}
            bg={navbar_bgColor}
            _hover={{
              bg: useColorModeValue("gray.400", "gray.500"),
            }}
          >
            {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Button
            as={"a"}
            fontSize={"15px"}
            fontWeight={700}
            color={"white"}
            bg={useColorModeValue("blue.300", "blue.400")}
            href={"/login"}
            _hover={{
              bg: useColorModeValue("blue.400", "blue.500"),
            }}
          >
            Sign In
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const popoverContentBgColor = useColorModeValue("gray.50", "gray.700")
  const fontHoverColor = useColorModeValue("blue.600", "blue.200")

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Flex align="center" height="100%">
                <Link
                  p={2}
                  href={navItem.href ?? "#"}
                  fontSize={"md"}
                  fontWeight={600}
                  _hover={{
                    textDecoration: "none",
                    color: fontHoverColor,
                  }}
                >
                  {navItem.label}
                </Link>
              </Flex>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const BgHoverColor = useColorModeValue("blue.100", "gray.800")
  const fontHoverColor = useColorModeValue("blue.600", "blue.200")

  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: BgHoverColor }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: fontHoverColor }}
            fontWeight={600}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={fontHoverColor} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = () => {
  const StackContentBgColor = useColorModeValue("gray.50", "gray.600")
  const font_color = useColorModeValue("black", "white")

  return (
    <Stack
      bg={StackContentBgColor}
      color={font_color}
      p={2}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={0} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600}>{label}</Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={0}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "blue.200")}
          align={"start"}
        >
          {children?.map((child) => (
            <Link key={child.label} py={1} href={child.href}>
              {child.label}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    children: [
      {
        label: "Label 1",
        subLabel: "This is a sub-label",
        href: "#",
      },
      {
        label: "Label 2",
        subLabel: "This is a sub-label",
        href: "#",
      },
    ],
  },
  {
    label: "About",
    children: [
      {
        label: "Label 1",
        subLabel: "This is a sub-label",
        href: "#",
      },
      {
        label: "Label 2",
        subLabel: "This is a sub-label",
        href: "#",
      },
    ],
  },
]
