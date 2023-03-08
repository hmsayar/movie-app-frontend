import React from "react"
import { Route, Routes } from "react-router-dom"
import MainPage from './components/MainPage'
import FilmPage from './components/FilmPage'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/film/:filmId" element={<FilmPage />} />
      </Routes>
    </div>
  )
}

export default App
