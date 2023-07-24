import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import React from "react"
import { useLibraryContext } from "../hooks/useLibraryContext"
type props = {
  isOpen: boolean
  onClose: () => void
}
const DrawerReadingBook: React.FC<props> = ({ isOpen, onClose }) => {
  const { getLibraryReading, changeReadingStatus } = useLibraryContext()
  const library = getLibraryReading()
  const toast = useToast()
  const bg = useColorModeValue("white", "gray.900")
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={bg}>
        <DrawerCloseButton />
        <DrawerHeader>Reading List </DrawerHeader>

        <DrawerBody>
          <Stack gap={4}>
            {library?.map(({ book }) => (
              <Stack key={book.ISBN} alignItems={"center"} display={"flex"}>
                <Image
                  src={book.cover}
                  alt={book.title}
                  aspectRatio={"2/3"}
                  w={"200px"}
                />
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
            ))}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerReadingBook
