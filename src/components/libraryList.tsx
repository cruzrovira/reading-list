import { Grid } from "@chakra-ui/react"
import React from "react"
import { Library } from "../types/data"
import CartBook from "./cartBook"

type props = { library: Library[] }

const LibraryList: React.FC<props> = ({ library }) => {
  return (
    <Grid gridTemplateColumns={"repeat(auto-fit, minmax(200px, 1fr))"} gap={4}>
      {library.map(({ book }) => (
        <CartBook key={book.ISBN} book={book} />
      ))}
    </Grid>
  )
}

export default LibraryList
