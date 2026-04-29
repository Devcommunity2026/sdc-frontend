import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 w-full overflow-x-hidden">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
