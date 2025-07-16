import React from "react";
import LandingPage from "./pages/LandingPage.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition.jsx";
import Navbar from "./components/Navbar.jsx";

import About from "./pages/About.jsx";
import Videos from "./pages/Videos.jsx";
import Project from "./pages/Project.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import ContactUs from "./pages/ContactUs.jsx";
import Contact from "./pages/Contact.jsx";

import Careers from "./pages/Careers.jsx"; // Ensure this import is correct

const AnimatedRoutes = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/"; // Hide navbar on landing page

  return (
    <AnimatePresence initial={false} mode="sync">
       <ScrollToTop />
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
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/films"
          element={
            <PageTransition>
              <Videos />
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition>
              <Project />
            </PageTransition>
          }
        />

        <Route
          path="/careers"
          element={
            <PageTransition>
              <Careers />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
             <ContactUs/>
            </PageTransition>
          }
        />
        <Route
          path="/contact2"
          element={
            <PageTransition>
             <Contact/>
            </PageTransition>
          }
        />
      </Routes>

      {location.pathname !== "/home" && <Footer />}
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <div className="w-screen min-h-screen">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
