import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import useAuth from "../../core/hooks/useAuth"

export default function LoginCard() {
  const bgColor = useColorModeValue("gray.50", "gray.800")
  const linkColor = useColorModeValue("blue.400", "blue.300")

  const { error, resetError, loginMutation } = useAuth()

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
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                resetError()
                loginMutation.mutateAsync({
                  username: values.email,
                  password: values.password,
                })
                setSubmitting(false)
              }, 400)
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Field
                      as={Input}
                      type="email"
                      name="email"
                      autoComplete="email"
                    />
                    {errors.email && touched.email && (
                      <Text color="red.400">{errors.email}</Text>
                    )}
                  </FormControl>

                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Field
                      as={Input}
                      type="password"
                      name="password"
                      autoComplete="current-password"
                    />

                    {errors.password && touched.password && (
                      <Text color="red.400">{errors.password}</Text>
                    )}
                  </FormControl>

                  <Stack spacing={6}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={linkColor}>Forgot password?</Link>
                    </Stack>
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{ bg: "blue.500" }}
                    >
                      Sign In
                    </Button>
                  </Stack>

                  <Stack>
                    {error && (
                      <Text color="red.400" textAlign="center">
                        {error}
                      </Text>
                    )}
                  </Stack>

                  <Text align={"center"}>
                    New User?{" "}
                    <Link color={linkColor} href="/register">
                      Create Account
                    </Link>
                  </Text>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: Yup.string().required("Required"),
})
