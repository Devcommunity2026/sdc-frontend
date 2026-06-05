import React from "react";
import NavBar from "./NavBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
      <NavBar />

      <main className="pt-24 md:px-10">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;