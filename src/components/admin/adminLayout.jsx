// src/layouts/AdminLayout.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Users,
  FileText,
  ClipboardList,
  Settings,
} from "lucide-react";

const adminNav = [
  {
    name: "Users",
    path: "/admin/user",
    icon: Users,
  },
  {
    name: "Content",
    path: "/admin/content",
    icon: FileText,
  },
  {
    name: "Applications",
    path: "/admin/application",
    icon: ClipboardList,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
      
      {/* ================= NAVBAR ================= */}
      <nav
        className="
          fixed top-0 left-0 w-full h-20
          border-b border-border dark:border-dark-border
          bg-card/80 dark:bg-dark-card/80
          backdrop-blur-lg
          px-4 md:px-10
          flex items-center justify-between
          z-50
        "
      >
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold gradient">
          SDC Admin
        </h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {adminNav.map((item, index) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`
                  flex items-center gap-2
                  px-5 py-3 rounded-2xl
                  transition-all duration-200
                  border text-sm font-medium
                  
                  ${
                    isActive
                      ? `
                        bg-primary
                        dark:bg-dark-primary
                        text-primary-foreground
                        dark:text-dark-primary-foreground
                        border-primary
                        dark:border-dark-primary
                      `
                      : `
                        bg-card
                        dark:bg-dark-card
                        border-border
                        dark:border-dark-border
                        hover:bg-secondary
                        dark:hover:bg-dark-secondary
                      `
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="
            md:hidden
            p-2 rounded-xl
            border border-border dark:border-dark-border
            bg-card dark:bg-dark-card
          "
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div
          className="
            fixed top-20 left-0 w-full
            bg-card dark:bg-dark-card
            border-b border-border dark:border-dark-border
            z-40
            md:hidden
          "
        >
          <div className="flex flex-col p-4 gap-3">
            {adminNav.map((item, index) => {
              const Icon = item.icon;

              const isActive =
                location.pathname === item.path;

              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-3
                    px-4 py-3 rounded-2xl
                    transition-all duration-200
                    border text-sm font-medium
                    
                    ${
                      isActive
                        ? `
                          bg-primary
                          dark:bg-dark-primary
                          text-primary-foreground
                          dark:text-dark-primary-foreground
                          border-primary
                          dark:border-dark-primary
                        `
                        : `
                          bg-card
                          dark:bg-dark-card
                          border-border
                          dark:border-dark-border
                          hover:bg-secondary
                          dark:hover:bg-dark-secondary
                        `
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="pt-24  md:px-10">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;