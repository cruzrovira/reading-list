import { GridItem, Image, Text } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Book } from "../types/data"
type props = {
  book: Book
}
const CartBook: React.FC<props> = ({ book }) => {
  const { title, cover, author, ISBN } = book
  const navigate = useNavigate()
  return (
    <GridItem
      bg={"white"}
      p={4}
      cursor={"pointer"}
      boxShadow={"sm"}
      _hover={{
        filter: "brightness(0.9)",
      }}
      onClick={() => {
        navigate(`/book/isbn/${ISBN}`)
      }}
    >
      <Image
        alt={title}
        src={cover}
        aspectRatio={"2/3"}
        display={"block"}
        w={"100%"}
        mb={1}
      />
      <Text>
        <Text fontWeight={"bold"} as={"strong"} mr={1}>
          Autor:
        </Text>
        {author.name}
      </Text>
    </GridItem>
  )
}

export default CartBook
