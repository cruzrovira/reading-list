import { Container, Stack } from "@chakra-ui/react"
import React from "react"
import Nav from "../components/nav"
type props = {
  children: React.ReactNode
}
const Layout: React.FC<props> = ({ children }) => {
  return (
    <Stack
      as={"main"}
      bg={"gray.100"}
      minH={"100vh"}
      w={"100%"}
      direction={"column"}
    >
      <Nav />
      <Container
        maxW={"container.xl"}
        minH={"100%"}
        display={"flex"}
        justifyContent={"center"}
        mb={8}
        mt={4}
      >
        {children}
      </Container>
    </Stack>
  )
}

export default Layout
