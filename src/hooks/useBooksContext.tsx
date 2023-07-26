import { useContext } from "react"
import { booksContext } from "../contexts/booksContext"

export const useBooksContext = () => {
  const context = useContext(booksContext)
  if (context === undefined) {
    throw new Error(
      "useLibraryContext must be used within a LibraryContextProvider",
    )
  }
  return context
}
