import React, { useContext, useState } from "react";
import navData from "../data/navData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu } from "lucide-react";
import darkLogo from "../assets/logo-white.png";
import logo from "../assets/logo.png";
import { themeContext } from "../contexts/ThemeProvider";
import Button from "./ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(themeContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogin = () => {
    setIsOpen(false)
    navigate("/login");
  };

  return (
    <nav className="w-full fixed left-0 top-0 h-20 shadow-md shadow-secondary dark:shadow-dark-secondary flex items-center justify-between px-15 max-[1150px]:px-8 backdrop-blur-3xl z-50">

      {/* Logo */}
      <img
        src={theme !== "dark" ? logo : darkLogo}
        alt="logo"
        className="h-10"
      />

      {/* Desktop Nav Links */}
      <div className="flex gap-2 max-[950px]:hidden">
        {navData.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`px-4 py-2 max-[1050px]:px-2 rounded-lg text-sm min-[1050px]:font-medium 
              ${location.pathname === item.path
                ? "bg-muted dark:bg-dark-muted"
                : "hover:bg-black/10"
              } transition-all`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Desktop Actions */}
      <div className="flex items-center gap-5 max-[950px]:hidden">
        <button
          className="rounded-md bg-secondary dark:bg-dark-secondary px-3 py-3"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Button onClick={handleLogin}>Login</Button>
      </div>

      {/* Mobile Menu Button */}
      <div
        className="min-[950px]:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 w-full glass overflow-hidden bg-background dark:bg-dark-background"
          >
            <div className="px-4 py-4 space-y-2">

              {navData.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${location.pathname === item.path
                      ? "bg-primary/15 text-primary"
                      : "hover:bg-muted"
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Actions */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={toggleTheme}
                  className="flex-1 p-3 rounded-lg bg-secondary dark:bg-dark-secondary  text-sm flex items-center justify-center gap-2"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  {theme === "dark" ? "Light" : "Dark"}
                </button>

                <button
                  onClick={handleLogin}
                  className="flex-1 px-4 py-3 rounded-lg bg-primary text-white text-sm font-bold"
                >
                  Login
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;