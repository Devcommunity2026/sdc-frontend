import { useState } from "react";
import DomainCard from "./components/ui/DomainCard";
import Footer from "./components/Footer";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import ThemeProvider from "./contexts/ThemeProvider";

import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Domains from "./pages/Domains";
import Careers from "./pages/Careers";
import Projects from "./pages/Projects";
import Events from "./pages/Events";

function App() {
  const [isDark, setIsDark] = useState(false); // ✅ FIXED

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>

          {/* Header */}
          

       
             

          {/* ROUTES */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/events" element={<Events />} />
          </Routes>

          {/* Footer */}

        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;