import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import ThemeProvider from "./contexts/ThemeProvider";
import AuthProvider from "./contexts/AuthProvider";

import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Domains from "./pages/Domains";
import Careers from "./pages/Careers";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Verify from "./pages/Verify";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Layout>

            <Routes>

              {/* Public Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/domains" element={<Domains />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/events" element={<Events />} />

              {/* Public Auth Pages */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

              <Route
                path="/verify"
                element={
                  <PublicRoute>
                    <Verify />
                  </PublicRoute>
                }
              />

              {/* Example Protected Route */}
              {/* 
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              */}

            </Routes>

          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;