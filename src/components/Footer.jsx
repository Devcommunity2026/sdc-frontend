import React from 'react'
c
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="text-center">
        
        {/* Title */}
        <h2 className="text-lg font-semibold">DevCommunity</h2>

        {/* Description */}
        <p className="text-sm text-gray-400 mt-2">
           Learn. Build. Grow together 🚀
        </p>

        {/* Links */}
        <div className="mt-3 flex justify-center gap-4 text-sm">
          <a href="#" className="hover:text-blue-400">Home</a>
          <a href="#" className="hover:text-blue-400">About</a>
          <a href="#" className="hover:text-blue-400">Contact</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 mt-4">
          © 2026 DevCommunity. All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer