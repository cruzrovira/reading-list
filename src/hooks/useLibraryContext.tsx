import { useContext } from "react"
import { LibraryContext } from "../contexts/libraryContext"

export const useLibraryContext = () => {
  const context = useContext(LibraryContext)
  if (context === undefined) {
    throw new Error(
      "useLibraryContext must be used within a LibraryContextProvider",
    )
  }
  return context
}
