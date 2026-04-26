import { useState } from "react";
import DomainCard from "./components/ui/DomainCard";
import Footer from "./components/Footer";
import Header from "./components/Header";



function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      {/* MAIN CONTENT */}
      
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: isDark ? "#0f172a" : "#f9fafc",
          color: isDark ? "#ffffff" : "#000000",
          padding: "40px",
          transition: "0.3s",
        }}

        
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Our Domains</h2>

          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              padding: "10px 15px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: isDark ? "#334155" : "#e2e8f0",
              color: isDark ? "#fff" : "#000",
            }}
          >
            {isDark ? "Light Mode 🌞" : "Dark Mode 🌙"}
          </button>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <DomainCard
            title="Web Development"
            description="Build modern and responsive websites."
            icon="web"
            isDark={isDark}
          />

          <DomainCard
            title="AI/ML"
            description="Explore artificial intelligence and machine learning."
            icon="ai"
            isDark={isDark}
          />

          <DomainCard
            title="Cyber Security"
            description="Learn ethical hacking and system security."
            icon="security"
            isDark={isDark}
          />
        </div>
      </div>
      <Header />
      {/*  FOOTER ADDED HERE */}
      <Footer />
      
    </>
  );
}

export default App;