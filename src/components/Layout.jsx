import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
      
      <Navbar />

      <div className="pt-20">
        {children}
      </div>

      <Footer />
      
    </div>
  )
}

export default Layout;