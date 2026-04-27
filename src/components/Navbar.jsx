import React, { useContext } from 'react'
import navData from '../data/navData'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import darkLogo from '../assets/logo-white.png'
import logo from '../assets/logo.png'
import { themeContext } from '../contexts/ThemeProvider'
import Button from './ui/Button'

const Navbar = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const { theme, setTheme } = useContext(themeContext)

  // ✅ get login state INSIDE component
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // ✅ logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleLogin = () => {
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
              ${location.pathname === element.path ? 'bg-primary/20 text-primary' : 'hover:bg-black/10'} 
              transition-all ease-in duration-100`}
            >
              {element.name}
            </Link>
          ))
        }
      </div>

      {/* Right side */}
      <div className='flex items-center justify-center gap-5'>

        {/* Theme Toggle */}
        <button 
          className='rounded-md bg-background dark:bg-dark-background px-3 py-3' 
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Login / Logout */}
        {isLoggedIn ? (
          <Button onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button onClick={handleLogin}>
            Login
          </Button>
        )}

      </div>
    </nav>
  )
}

export default Navbar