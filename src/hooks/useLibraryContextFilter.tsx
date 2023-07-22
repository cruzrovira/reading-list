import { useContext } from "react"
import { filterContext } from "../contexts/filterContext"
import { LibraryContext } from "../contexts/libraryContext"

export const useLibraryContextFilter = () => {
  const { library } = useContext(LibraryContext)
  const contextFilter = useContext(filterContext)

  if (contextFilter === undefined) {
    throw new Error(
      "useLibraryContextFilter must be used within a filterContextProvider",
    )
  }

  const { filter, setFilter } = contextFilter
  const getLibraryFilter = () => {
    return library?.filter(
      ({ book }) =>
        book.reading === false &&
        book.pages >= filter.pages &&
        book.title.toLowerCase().includes(filter.title.toLowerCase()) &&
        (book.genre === filter.genres || filter.genres === "all"),
    )
  }
  return { getLibraryFilter, setFilter, filter }
}
