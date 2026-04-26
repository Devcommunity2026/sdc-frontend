import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {

    return (
        <div className='min-h-screen pt-22 w-full overflow-x-hidden bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground'>
            <Navbar />

            {children}
            <Footer />
        </div>
    )
}

export default Layout