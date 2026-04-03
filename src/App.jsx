import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'

function App() {

  return (
    <div>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  )
}

export default App
