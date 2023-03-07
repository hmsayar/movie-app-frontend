import { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Routes } from "react-router-dom"
import MainPage from './components/MainPage'
import FilmPage from './components/FilmPage'

function App() {


  //   useEffect(() => {
  //     let source = axios.CancelToken.source()
  //     let endpoint = 'https://api.themoviedb.org/3/movie/76341'
  //     const makeRequest = async () => {
  //         const cancelToken = source.token
  //         const config = {
  //             method: 'POST',
  //             url: "http://localhost:4000/",
  //             data: { endpoint },
  //             withCredentials: true,
  //             cancelToken
  //         }
  //         try {
  //             var result = await axios(config)
  //             setData(result.data)
  //         } catch (error) {
  //             if (axios.isCancel(error)) return
  //             return error
  //         }

  //     }
  //     makeRequest()

  // }, [])



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
