import React, { createContext, useEffect, useState } from "react"
import { fetchLibrary } from "../services/fetchLibrary"
import { Book, Library } from "../types/data"

export const LibraryContext = createContext<{
  library: Library[] | undefined
  genres: string[]
  maxPages: number
  filter: {
    pages: number
    genres: string
    title: string
  }
  getLibraryReading: () => Library[] | undefined
  getLibraryFilter: () => Library[] | undefined

  changeReadingStatus: (isbn: string, reading: boolean) => void
  setFilter: React.Dispatch<
    React.SetStateAction<{
      pages: number
      genres: string
      title: string
    }>
  >
  getBookByIsbn: (isbn: string) => Book | undefined
}>({
  library: undefined,
  genres: [],
  maxPages: 0,
  filter: { pages: 0, genres: "all", title: "" },
  setFilter: () => {},
  getBookByIsbn: () => undefined,
  getLibraryFilter: () => [],
  getLibraryReading: () => [],
  changeReadingStatus: () => {},
})

export const LibraryContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [library, setLibrary] = useState<Library[] | undefined>()
  const [genres, setGenres] = useState<string[]>([])
  const [maxPages, setMaxPages] = useState<number>(0)

  const [filter, setFilter] = useState<{
    pages: number
    genres: string
    title: string
  }>({
    pages: 0,
    genres: "all",
    title: "",
  })

  useEffect(() => {
    fetchLibrary().then(data => {
      for (let i = 0; i < data.library.length; i++) {
        data.library[i].book.reading = false
      }

      setLibrary(() => data.library)
      let tempGenres = data.library.map(({ book }) => book.genre)
      let pages = data.library.map(({ book }) => book.pages)

      setMaxPages(() => Math.max(...pages))
      setGenres(() =>
        tempGenres.filter((genre, index) => {
          return tempGenres.indexOf(genre) === index
        }),
      )
    })
  }, [])

  const getLibraryFilter = () => {
    return library?.filter(
      ({ book }) =>
        book.reading === false &&
        book.pages >= filter.pages &&
        book.title.toLowerCase().includes(filter.title.toLowerCase()) &&
        (book.genre === filter.genres || filter.genres === "all"),
    )
  }
  const getLibraryReading = () => {
    return library?.filter(({ book }) => book.reading === true)
  }

  const getBookByIsbn = (isbn: string): Book | undefined => {
    const result = library?.find(({ book }) => book.ISBN === isbn)
    return result?.book
  }

  const changeReadingStatus = (isbn: string, reading: boolean): void => {
    const result = library?.map(({ book }) => {
      if (book.ISBN === isbn) {
        book.reading = reading
      }
      return { book }
    })
    setLibrary(result)
  }

  return (
    <LibraryContext.Provider
      value={{
        library: library,
        genres: genres,
        maxPages: maxPages,
        filter: filter,
        getBookByIsbn: getBookByIsbn,
        getLibraryFilter: getLibraryFilter,
        setFilter: setFilter,
        changeReadingStatus: changeReadingStatus,
        getLibraryReading: getLibraryReading,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}
