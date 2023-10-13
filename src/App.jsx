import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TimelinePage from './pages/Timeline'

function App() {

  return (
    <Routes>
      <Route path="/" element={<TimelinePage />} />
    </Routes>
  )
}

export default App
