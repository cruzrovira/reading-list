import React, { createContext, useEffect, useState } from "react"
import { fetchLibrary } from "../services/fetchLibrary"
import { Book, Library } from "../types/data"

export const LibraryContext = createContext<{
  library: Library[] | undefined
  genres: string[]
  maxPages: number
  getLibraryReading: () => Library[] | undefined
  changeReadingStatus: (isbn: string, reading: boolean) => void
  getBookByIsbn: (isbn: string) => Book | undefined
}>({
  library: undefined,
  genres: [],
  maxPages: 0,
  getBookByIsbn: () => undefined,
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

  const initialSetting = () => {
    let libraryTem: Library[] = []
    if (localStorage.getItem("library") !== null) {
      libraryTem = JSON.parse(localStorage.getItem("library")!)
      setLibrary(() => libraryTem)
    } else {
      fetchLibrary().then(data => {
        for (let i = 0; i < data.library.length; i++) {
          data.library[i].book.reading = false
        }
        libraryTem = data.library
        setLibrary(() => libraryTem)
        localStorage.setItem("library", JSON.stringify(libraryTem))
      })
    }

    let tempGenres = libraryTem.map(({ book }) => book.genre)
    let pages = libraryTem.map(({ book }) => book.pages)

    setMaxPages(() => Math.max(...pages))

    setGenres(
      () =>
        tempGenres?.filter((genre, index) => {
          return tempGenres?.indexOf(genre) === index
        }),
    )
  }
  useEffect(() => {
    initialSetting()
  }, [])

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
    localStorage.setItem("library", JSON.stringify(result))
  }

  return (
    <LibraryContext.Provider
      value={{
        library: library,
        genres: genres,
        maxPages: maxPages,
        getBookByIsbn: getBookByIsbn,
        changeReadingStatus: changeReadingStatus,
        getLibraryReading: getLibraryReading,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}
