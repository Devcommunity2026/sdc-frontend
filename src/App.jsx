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
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/admin/UserDashboard";
import ApplicationDashboard from "./pages/admin/ApplicationDashboard";
import ContentDashboard from "./pages/admin/ContentDashboard";
import SettingDashboard from "./pages/admin/SettingDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <>

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
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/user" element={<UserDashboard />} />
              <Route path="/admin/content" element={<ContentDashboard />} />
              <Route path="/admin/application" element={<ApplicationDashboard />} />
              <Route path="/admin/settings" element={<SettingDashboard />} />

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

          </>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;