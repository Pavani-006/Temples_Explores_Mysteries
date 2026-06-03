import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import Temples from "./pages/Temples.jsx";
import TempleDetail from "./pages/TempleDetail.jsx";
import Mysteries from "./pages/Mysteries.jsx";
import Architecture from "./pages/Architecture.jsx";
import Gallery from "./pages/Gallery.jsx";
import Legends from "./pages/Legends.jsx";
import About from "./pages/About.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/temples" element={<Temples />} />
        <Route path="/temple/:slug" element={<TempleDetail />} />
        {/* Back-compat with the previous /temples/:slug URL */}
        <Route path="/temples/:slug" element={<TempleDetail />} />
        <Route path="/mysteries" element={<Mysteries />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/legends" element={<Legends />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
