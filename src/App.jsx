import React from "react";
import LandingPage from "./pages/LandingPage.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition.jsx";
import Navbar from "./components/Navbar.jsx";
import Aboutus from "./pages/Aboutus.jsx";

const AnimatedRoutes = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/"; // Hide navbar on landing page

  return (
    <AnimatePresence initial={false} mode="sync">
      {showNavbar && <Navbar />}
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          }
        />
        <Route
          path="/home"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <Aboutus />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
