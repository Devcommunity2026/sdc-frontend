import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Layout from './components/Layout';
import ThemeProvider from './contexts/ThemeProvider';

import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Domains from './pages/Domains';
import Careers from './pages/Careers';
import Projects from './pages/Projects';
import Events from './pages/Events';
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Verify from "./pages/Verify";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
        <Routes>
            <Route path="/" element={<ProtectedRoute>
      <Home />
    </ProtectedRoute>} />
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="team" element={<Team />} />
            <Route path="login" element={<Login />} />
            <Route path="blog" element={<Blog />} />
            <Route path="domains" element={<Domains />} />
            <Route path="careers" element={<Careers />} />
            <Route path="projects" element={<Projects />} />
            <Route path="events" element={<Events />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
        </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;