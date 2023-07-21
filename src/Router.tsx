import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { LibraryContextProvider } from "./contexts/libraryContext"
import BookPage from "./pages/book.page"
import HomePage from "./pages/home.page"
interface props {}

const Router: React.FC<props> = () => {
  return (
    <BrowserRouter>
      <LibraryContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/isbn/:isbn" element={<BookPage />} />
        </Routes>
      </LibraryContextProvider>
    </BrowserRouter>
  )
}

export default Router
