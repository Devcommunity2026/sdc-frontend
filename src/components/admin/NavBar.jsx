import React, { useState, useContext, useEffect } from "react";
import { themeContext } from "../../contexts/ThemeProvider";
import { Link, useLocation } from "react-router-dom";
import { adminNav } from "../../data/navData";
import {
  Menu,
  X,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import axios from "axios";

const NavBar = () => {
  const { theme, setTheme } = useContext(themeContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/registration/status`, { withCredentials: true });
      if (res.data.success) {
        setRegistrationOpen(res.data.registrationOpen);
      }
    } catch (error) {
      console.error("Failed to fetch registration status in NavBar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const enableRegistration = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/registration/enable`, {}, { withCredentials: true });
      if (res.data.success) {
        setRegistrationOpen(true);
        alert(res.data.message || "Registration enabled globally.");
      }
    } catch (error) {
      console.error("Failed to enable registration:", error);
      alert("Failed to enable registration.");
    }
  };

  const disableRegistration = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/registration/disable`, {}, { withCredentials: true });
      if (res.data.success) {
        setRegistrationOpen(false);
        alert(res.data.message || "Registration disabled globally.");
      }
    } catch (error) {
      console.error("Failed to disable registration:", error);
      alert("Failed to disable registration.");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <nav
        className="
          fixed top-0 left-0 w-full h-20
          flex items-center justify-between
          px-6 md:px-10
          backdrop-blur-lg
          z-50
          shadow-md dark:shadow-dark-accent
          bg-background dark:bg-dark-background
          text-foreground dark:text-dark-foreground
        "
      >
        <h1 className="text-xl md:text-2xl font-bold gradient">
          SDC Admin
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2
                  px-4 py-2 rounded-lg
                  text-sm font-medium
                  transition-all
                  ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-black/10 dark:hover:bg-white/10"
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Settings */}
          <div className="relative">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="
                flex items-center gap-2
                px-4 py-2 rounded-lg
                bg-secondary dark:bg-dark-secondary
                transition-all
              "
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>

            {settingsOpen && (
              <div
                className="
                  absolute right-0 top-14
                  w-72 rounded-xl
                  bg-background dark:bg-dark-background
                  shadow-xl
                  border border-black/10 dark:border-white/10
                  p-4
                "
              >
                <h3 className="font-semibold mb-3">
                  Registration Control
                </h3>

                 <div className="space-y-2">
                  <button
                    onClick={() => !registrationOpen && enableRegistration()}
                    disabled={loading}
                    className={`
                      w-full py-3 rounded-lg font-medium transition-all cursor-pointer
                      ${registrationOpen
                        ? "bg-primary hover:opacity-95 text-primary-foreground dark:bg-dark-primary dark:hover:bg-dark-primary/95 shadow-sm cursor-default"
                        : "bg-muted dark:bg-dark-muted text-muted-foreground border border-black/10 dark:border-white/10 hover:bg-primary/15 hover:text-primary hover:border-primary/30 active:scale-95"
                      }
                    `}
                  >
                    Enable Registration
                  </button>

                  <button
                    onClick={() => registrationOpen && disableRegistration()}
                    disabled={loading}
                    className={`
                      w-full py-3 rounded-lg font-medium transition-all cursor-pointer
                      ${!registrationOpen
                        ? "bg-primary hover:opacity-95 text-primary-foreground dark:bg-dark-primary dark:hover:bg-dark-primary/95 shadow-sm cursor-default"
                        : "bg-muted dark:bg-dark-muted text-muted-foreground border border-black/10 dark:border-white/10 hover:bg-primary/15 hover:text-primary hover:border-primary/30 active:scale-95"
                      }
                    `}
                  >
                    Disable Registration
                  </button>
                </div>

                <div className="h-px bg-black/10 dark:bg-white/10 my-4" />

                <h3 className="font-semibold mb-3">
                  Appearance
                </h3>

                <button
                  onClick={toggleTheme}
                  className="
                    w-full p-3 rounded-lg
                    bg-secondary dark:bg-dark-secondary
                    flex items-center justify-center gap-2
                    transition-all
                  "
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={18} />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={18} />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="
            md:hidden
            p-2 rounded-lg
            bg-secondary dark:bg-dark-secondary
          "
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div
          className="
            fixed top-20 left-0 w-full
            bg-background dark:bg-dark-background
            shadow-lg
            z-40 md:hidden
          "
        >
          <div className="flex flex-col p-4 gap-2">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-3
                    px-4 py-3 rounded-lg
                    text-sm font-medium
                    transition-all
                    ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "hover:bg-black/10 dark:hover:bg-white/10"
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <div className="flex gap-2 mt-2">
              <button
                onClick={toggleTheme}
                className="
                  flex-1 p-3 rounded-lg
                  bg-secondary dark:bg-dark-secondary
                  flex items-center justify-center gap-2
                "
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={16} />
                    Light
                  </>
                ) : (
                  <>
                    <Moon size={16} />
                    Dark
                  </>
                )}
              </button>
            </div>

            <div className="grid gap-2 mt-2">
              <button
                onClick={() => !registrationOpen && enableRegistration()}
                disabled={loading}
                className={`
                  py-3 rounded-lg font-medium transition-all cursor-pointer text-center
                  ${registrationOpen
                    ? "bg-primary hover:opacity-95 text-primary-foreground dark:bg-dark-primary dark:hover:bg-dark-primary/95 shadow-sm cursor-default"
                    : "bg-muted dark:bg-dark-muted text-muted-foreground border border-black/10 dark:border-white/10 hover:bg-primary/15 hover:text-primary active:scale-95"
                  }
                `}
              >
                Enable Registration
              </button>

              <button
                onClick={() => registrationOpen && disableRegistration()}
                disabled={loading}
                className={`
                  py-3 rounded-lg font-medium transition-all cursor-pointer text-center
                  ${!registrationOpen
                    ? "bg-primary hover:opacity-95 text-primary-foreground dark:bg-dark-primary dark:hover:bg-dark-primary/95 shadow-sm cursor-default"
                    : "bg-muted dark:bg-dark-muted text-muted-foreground border border-black/10 dark:border-white/10 hover:bg-primary/15 hover:text-primary active:scale-95"
                  }
                `}
              >
                Disable Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;