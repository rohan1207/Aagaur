import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";







const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(0);
    const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [textVisible, setTextVisible] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const overlayRef = useRef(null);
  const heroRef = useRef(null);
  const valuesRef = useRef(null);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const response = await fetch(`${API_BASE}/projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const response = await fetch(`${API_BASE}/events`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle initial load with sequential animations
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsInitialLoad(false);
    }, 500);

    const timer2 = setTimeout(() => {
      setTextVisible(true);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition > windowHeight * 0.1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (scrollPosition > windowHeight * 1.5) {
        setShowValues(true);
      } else {
        setShowValues(false);
      }
    };

    // Add smooth scroll behavior for mouse wheel
    const handleWheel = (e) => {
      if (!scrolled && e.deltaY > 0) {
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
        setScrolled(true);
      } else if (
        scrolled &&
        e.deltaY > 0 &&
        window.scrollY >= window.innerHeight * 0.5 &&
        window.scrollY < window.innerHeight * 1.5
      ) {
        // From projects/events section to values section
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight * 2,
          behavior: "smooth",
        });
      } else if (
        scrolled &&
        e.deltaY < 0 &&
        window.scrollY >= window.innerHeight * 1.5
      ) {
        // From values section back to projects/events section
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      } else if (
        scrolled &&
        e.deltaY < 0 &&
        window.scrollY < window.innerHeight * 0.5
      ) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setScrolled(false);
      }
    };

    // Handle touch start
    const handleTouchStart = (e) => {
      setTouchStart(e.touches[0].clientY);
    };

    // Handle touch move
    const handleTouchMove = (e) => {
      if (!touchStart) return;

      const touchEnd = e.touches[0].clientY;
      const deltaY = touchStart - touchEnd;

      // Threshold for touch scroll (adjust if needed)
      if (Math.abs(deltaY) < 50) return;

      if (!scrolled && deltaY > 0) {
        // Scrolling down
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
        setScrolled(true);
      } else if (
        scrolled &&
        deltaY > 0 &&
        window.scrollY >= window.innerHeight * 0.5 &&
        window.scrollY < window.innerHeight * 1.5
      ) {
        // Touch swipe down from projects/events to values section
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight * 2,
          behavior: "smooth",
        });
      } else if (
        scrolled &&
        deltaY < 0 &&
        window.scrollY >= window.innerHeight * 1.5
      ) {
        // Touch swipe up from values to projects/events section
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      } else if (
        scrolled &&
        deltaY < 0 &&
        window.scrollY < window.innerHeight * 0.5
      ) {
        // Scrolling up to hero section
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setScrolled(false);
      }

      setTouchStart(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [scrolled, touchStart]);

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (projects.length > 0) {
        setCurrentProject((prev) => (prev + 1) % projects.length);
      }

      if (events.length > 0) {
        setCurrentEvent((prev) => (prev + 1) % events.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [projects, events]);

  const handleProjectNavigation = (direction) => {
    setCurrentProject((prev) => {
      if (direction === "next") {
        return (prev + 1) % projects.length;
      } else {
        return prev === 0 ? projects.length - 1 : prev - 1;
      }
    });
  };

  const handleEventNavigation = (direction) => {
    setCurrentEvent((prev) => {
      if (direction === "next") {
        return (prev + 1) % events.length;
      } else {
        return prev === 0 ? events.length - 1 : prev - 1;
      }
    });
  };

  return (
    <div className="relative h-[300vh] overflow-x-hidden">
      {/* Hero Video img */}
      <div
        className={`fixed inset-0 z-10 overflow-hidden transition-opacity duration-300
        ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <img
          src="/hero.png"
          className="absolute w-full h-full object-cover"
          style={{
            opacity: 0.7,
          }}
        />
      </div>

      {/* Dark Overlay for better text readability */}
      <div
        className={`fixed inset-0 z-20 bg-black transition-opacity duration-300
          ${scrolled ? "opacity-0 pointer-events-none" : "opacity-40"}`}
      />

      {/* Initial Overlay Text */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-30 flex items-center justify-center
          ${!isInitialLoad ? "opacity-100" : "opacity-0"}`}
        style={{
          transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: scrolled ? "translateY(-100%)" : "translateY(0)",
          pointerEvents: scrolled ? "none" : "auto",
        }}
      >
        <div className="relative w-full max-w-7xl mx-auto px-4">
          {/* Main Headline */}
          <div className="overflow-hidden mb-6">
            <div
              className={`transform transition-all duration-300
                ${
                  !isInitialLoad
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }`}
            >
              <h1 className="text-white font-cormorant text-6xl md:text-8xl leading-[1.2] tracking-wider text-center">
                Designing Spaces
                <br />
                That Inspire & Endure
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden">
            <div
              className={`transform transition-all duration-1000 delay-400
                ${
                  textVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }`}
            >
              <p className="text-gray-200 font-light tracking-widest text-lg md:text-xl text-center mb-6">
                At Aagaur Studio, creativity meets sustainability — beautifully
              </p>
            </div>
          </div>

          {/* Scroll Prompt */}
          <div
            className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-600 z-50
              ${
                textVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
          >
            <p className="text-gray-300 font-light text-sm tracking-[0.3em] uppercase text-center">
              Scroll to explore
            </p>
            <div className="mt-4 animate-bounce">
              <svg
                className="w-6 h-6 mx-auto text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Split Screen Hero Section */}
      <div
        ref={heroRef}
        className={`fixed inset-0 z-20 flex flex-col md:flex-row transition-all duration-1000 md:gap-[2px] pt-24 px-2 pb-2
          ${
            scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        style={{
          transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Projects Side */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          {/* Navigation Arrows for Projects */}
          <button
            onClick={() => handleProjectNavigation("prev")}
            className="absolute left-5 top-1/2 z-30 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-all duration-300 group border border-white/10"
            aria-label="Previous project"
          >
            <svg
              className="w-5 h-5 text-white/90 transform transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => handleProjectNavigation("next")}
            className="absolute right-5 top-1/2 z-30 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-all duration-300 group border border-white/10"
            aria-label="Next project"
          >
            <svg
              className="w-5 h-5 text-white/90 transform transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {projects.length > 0 && (
            <Link to={`/project/${projects[currentProject]._id}`}>
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-1000"
              style={{
                backgroundImage: `url(${projects[currentProject].mainImage})`,
                transform: scrolled ? "scale(1.1)" : "scale(1)",
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95">
                {/* Top Heading */}
                <h2 className="text-white font-cormorant text-xl md:text-2xl tracking-wide p-10 md:p-10">
                  Featured Projects
                </h2>

                {/* Bottom Content */}
                <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col justify-end">
                  <h3 className="text-white font-light text-xl md:text-2xl tracking-wider mb-3">
                    {projects[currentProject].title}
                  </h3>
                  <p className="text-gray-200 font-light tracking-wide text-sm md:text-base max-w-2xl">
                    {projects[currentProject].subtitle}
                  </p>
                </div>
              </div>
            </div>
            </Link>
          )}
        </div>

        {/* Events Side */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
          {events.length > 0 && (
            <>
              {/* Navigation Arrows for Events */}
              <button
                onClick={() => handleEventNavigation("prev")}
                className="absolute left-5 top-1/2 z-30 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-all duration-300 group border border-white/10"
                aria-label="Previous event"
              >
                <svg
                  className="w-5 h-5 text-white/90 transform transition-transform duration-300 group-hover:-translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleEventNavigation("next")}
                className="absolute right-5 top-1/2 z-30 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-all duration-300 group border border-white/10"
                aria-label="Next event"
              >
                <svg
                  className="w-5 h-5 text-white/90 transform transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <Link to={`/event/${events[currentEvent]._id}`}>
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-1000"
                style={{
                  backgroundImage: `url(${events[currentEvent].mainImage})`,
                  transform: scrolled ? "scale(1.1)" : "scale(1)",
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95">
                  {/* Top Heading */}
                  <h2 className="text-white font-cormorant text-xl md:text-2xl tracking-wide p-10 md:p-10 ">
                  Featured Events
                  </h2>

                  {/* Bottom Content */}
                  <div className="absolute inset-x-0 bottom-0 p-10  flex flex-col justify-end">
                    <h3 className="text-white font-light text-xl md:text-2xl tracking-wider mb-3 ">
                      {events[currentEvent].title}
                    </h3>
                    <p className="text-gray-200 font-light tracking-wide text-sm md:text-base max-w-2xl">
                      {events[currentEvent].tagline}
                    </p>
                  </div>
                </div>
              </div>
              </Link>
            </>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Home;
