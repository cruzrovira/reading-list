import {
  Button,
  Grid,
  GridItem,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react"
import React from "react"
import { useParams } from "react-router-dom"
import { useLibraryContext } from "../hooks/useLibraryContext"
import Layout from "../layout/layout"
import { Book } from "../types/data"
type props = {}
const BookPage: React.FC<props> = ({}) => {
  const { isbn } = useParams()
  const { getBookByIsbn, changeReadingStatus } = useLibraryContext()
  const toast = useToast()
  let book: Book | undefined

  if (isbn) {
    book = getBookByIsbn(isbn)
  }

  return (
    <Layout>
      <Grid
        gridTemplateColumns={{ base: "1fr ", md: "300px minmax( 600px,1fr)" }}
      >
        <GridItem bg={"white"} p={4} boxShadow={"sm"}>
          <Image
            src={book?.cover}
            alt="book cover"
            aspectRatio={"2/3"}
            display={"block"}
            w={"100%"}
          />
        </GridItem>
        <GridItem pl={{ base: 0, md: 8 }}>
          <Text fontSize={20} fontWeight={"bold"}>
            {book?.title}
          </Text>
          <Text>Author: {book?.author.name}</Text>
          <Text>Genre: {book?.genre}</Text>
          <Text>synopsis: {book?.synopsis}</Text>
          <Text>Pages: {book?.pages}</Text>
          <Text>Year: {book?.year}</Text>
          <Text>ISBN: {book?.ISBN}</Text>
          <Text>Other Author books</Text>
          <UnorderedList pl={10}>
            {book?.author.otherBooks.map((name, index) => (
              <ListItem key={index}>
                <Text>{name}</Text>
              </ListItem>
            ))}
          </UnorderedList>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={{ base: 0, md: 2 }}
          >
            <Button
              mt={4}
              colorScheme="teal"
              isDisabled={book?.reading}
              onClick={() => {
                toast({
                  title: "Book added",
                  description: `book ${book?.title} added to reading list`,
                  status: "success",
                  colorScheme: "teal",
                  duration: 1000,
                  isClosable: true,
                })
                book?.ISBN && changeReadingStatus(book?.ISBN, true)
              }}
            >
              read
            </Button>
            <Button
              mt={4}
              colorScheme="red"
              isDisabled={!book?.reading}
              onClick={() => {
                toast({
                  title: "Book remove",
                  description: `book ${book?.title} remove to reading list`,
                  status: "warning",
                  colorScheme: "red",
                  duration: 1000,
                  isClosable: true,
                })
                book?.ISBN && changeReadingStatus(book?.ISBN, false)
              }}
            >
              cancel read
            </Button>
          </Stack>
        </GridItem>
      </Grid>
    </Layout>
  )
}

export default BookPage
