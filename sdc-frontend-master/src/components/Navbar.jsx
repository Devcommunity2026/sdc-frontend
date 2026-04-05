import React from 'react'
import navData from '../data/navData'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import darkLogo from '../assets/logo-white.png'
import logo from '../assets/logo.png'
import { themeContext } from '../contexts/ThemeProvider'
import { useContext } from 'react'
import Button from './ui/Button'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, setTheme } = useContext(themeContext)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handelLogin = () => {
    navigate('/login')
  }

  return (
    <nav className="w-full fixed left-0 top-0 h-20 shadow-md flex items-center justify-between px-15 
     dark:bg-dark-nav transition-all ease-in duration-100 text-foreground dark:text-dark-foreground ">

      {/* Logo */}
      <img src={theme !== "dark" ? logo : darkLogo} alt="logo" className="h-10" />

      {/* Nav Links */}
      <div className="flex gap-2">
        {
          navData.map((element) => (
            <Link
              key={element.name}
              to={element.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium 
                 ${location.pathname == element.path ? 'bg-blue-200' : 'hover:bg-black/10'} 
              transition-all ease-in duration-100`}
            >
              {element.name}
            </Link>
          ))
        }
      </div>

      {/* Login and theme button */}
      <div className='flex items-center justify-center gap-5'>
        <button className=' rounded-md bg-background dark:bg-dark-background px-3 py-3' onClick={toggleTheme}>
          {(theme === 'dark') ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Button variant="default" size="default" className="w-full" onClick={() => handelLogin()} >
          Login
        </Button>
      </div>
    </nav>
  )
}

export default Navbar