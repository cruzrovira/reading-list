import {
  Container,
  Heading,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import React from "react"
import { Link as ReachLink } from "react-router-dom"
import DrawerReadingBook from "./DrawerReadingBook"
type props = {}
const Nav: React.FC<props> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Stack as={"nav"} p={2} bg={"teal"} w="100%">
        <Container
          maxW={"container.xl"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Link
            as={ReachLink}
            to="/"
            textDecoration={"none"}
            _hover={{ textDecoration: "none" }}
          >
            <Heading color={"white"} fontSize={20}>
              Reader Book
            </Heading>
          </Link>

          <Text
            color={"white"}
            fontSize={20}
            fontWeight={"bold"}
            cursor={"pointer"}
            onClick={onOpen}
          >
            reading
          </Text>
        </Container>
      </Stack>
      <DrawerReadingBook isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Nav
