import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;