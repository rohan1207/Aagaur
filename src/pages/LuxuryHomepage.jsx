import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Menu, Heart, Phone } from "lucide-react";

const LuxuryHomepage = () => {
  // Register GSAP plugin
  gsap.registerPlugin(ScrollTrigger);
  const [scrollY, setScrollY] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(0);

  const heroRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const navbarRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Urban Residence",
      subtitle: "Modern Living",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description: "Contemporary architecture meets urban sophistication",
    },
    {
      id: 2,
      title: "Luxury Villa",
      subtitle: "Elegant Design",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description: "Minimalist luxury in perfect harmony with nature",
    },
    {
      id: 3,
      title: "Commercial Complex",
      subtitle: "Business Excellence",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description: "Innovative workspace design for modern businesses",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Architecture Summit 2024",
      date: "Dec 15, 2024",
      image:
        "https://images.unsplash.com/photo-1559223607-b4d0555ae227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description: "Join leading architects and designers",
    },
    {
      id: 2,
      title: "Design Workshop",
      date: "Jan 20, 2025",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description: "Hands-on modern design techniques",
    },
    {
      id: 3,
      title: "Luxury Showcase",
      date: "Feb 10, 2025",
      image:
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description: "Premium architecture exhibition",
    },
  ];

  useEffect(() => {
    // Initial state
    gsap.set(textRef.current, { y: 0, scale: 1, opacity: 1 });
    gsap.set(leftSectionRef.current, { x: "-100%", opacity: 0 });
    gsap.set(rightSectionRef.current, { x: "100%", opacity: 0 });
    gsap.set(navbarRef.current, {
      backgroundColor: "transparent",
      backdropFilter: "none",
    });

    // Scroll-triggered timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300",
        scrub: true,
      },
    });

    tl.to(
      textRef.current,
      {
        y: -window.innerHeight * 0.4,
        scale: 0.3,
        opacity: 0.3,
        ease: "power2.out",
      },
      0
    )
      .to(
        navbarRef.current,
        {
          backgroundColor: "rgba(0,0,0,0.95)",
          backdropFilter: "blur(20px)",
          ease: "power1.out",
        },
        0
      )
      .to(
        leftSectionRef.current,
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
        },
        0
      )
      .to(
        rightSectionRef.current,
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
        },
        0
      );

    return () => {
      tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  // Auto-slide intervals
  useEffect(() => {
    const projectInterval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 4000);

    const eventInterval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 4500);

    return () => {
      clearInterval(projectInterval);
      clearInterval(eventInterval);
    };
  }, [projects.length, events.length]);

  // Calculate scroll progress for parallax effects
  const scrollProgress = 0; // parallax removed in favor of split-screen
  const parallaxOffset = 0;

  return (
    <div
      className="relative min-h-screen bg-black text-white overflow-hidden"
      ref={containerRef}
    >
      <style jsx>{`
        * {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .smooth-transition {
          transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .hero-bg {
          transform: translateY(${parallaxOffset}px);
        }

        .slide-in-left {
          transform: translateX(-100%);
          opacity: 0;
        }

        .slide-in-right {
          transform: translateX(100%);
          opacity: 0;
        }

        .project-card,
        .event-card {
          transition: all 0.6s ease-in-out;
        }

        .fade-slide {
          transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
          }
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Navbar */}
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-50 smooth-transition border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 smooth-transition hover:scale-110">
                <Menu size={20} />
              </button>
              <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 smooth-transition hover:scale-105 text-sm">
                Apartments
              </button>
              <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 smooth-transition hover:scale-105 text-sm">
                3D Tour
              </button>
            </div>

            <div className="h-12 smooth-transition hover:scale-110">
              <img
                src="/landing_logo-black.png"
                alt="Aagaur Studio"
                className="h-full object-contain"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 smooth-transition hover:scale-110">
                <Heart size={20} />
              </button>
              <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 smooth-transition hover:scale-105 text-sm">
                Request a call-back
              </button>
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 smooth-transition hover:scale-110">
                <Phone size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 hero-bg"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

        <div
          ref={textRef}
          className="relative z-10 text-center smooth-transition"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-wider mb-8 floating">
            <span className="block smooth-transition hover:scale-110">
              AAGAUR
            </span>
            <span className="block smooth-transition hover:scale-110 delay-100">
              STUDIO
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed fade-slide">
            The composition of the landscape is built on the contrast of
            architecture and nature, which do not oppose each other, but rather
            coexist harmoniously.
          </p>
        </div>
      </div>

      {/* Split Screen Section */}
      <div className="fixed inset-0 top-0 z-30 pointer-events-none">
        <div className="flex h-full">
          {/* Projects Section */}
          <div
            ref={leftSectionRef}
            className="w-1/2 slide-in-left smooth-transition pointer-events-auto"
          >
            <div className="h-full relative overflow-hidden">
              <div
                className="absolute inset-0 project-card"
                style={{
                  backgroundImage: `url(${projects[currentProject].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-12 fade-slide">
                <div className="smooth-transition hover:transform hover:translate-y-[-10px]">
                  <h2 className="text-4xl font-light mb-2 text-white">
                    {projects[currentProject].title}
                  </h2>
                  <p className="text-xl text-white/80 mb-4">
                    {projects[currentProject].subtitle}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {projects[currentProject].description}
                  </p>
                  <div className="flex space-x-2">
                    {projects.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full smooth-transition ${
                          index === currentProject
                            ? "bg-white pulse-glow"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div
            ref={rightSectionRef}
            className="w-1/2 slide-in-right smooth-transition pointer-events-auto"
          >
            <div className="h-full relative overflow-hidden">
              <div
                className="absolute inset-0 event-card"
                style={{
                  backgroundImage: `url(${events[currentEvent].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-12 fade-slide">
                <div className="smooth-transition hover:transform hover:translate-y-[-10px]">
                  <h2 className="text-4xl font-light mb-2 text-white">
                    {events[currentEvent].title}
                  </h2>
                  <p className="text-xl text-white/80 mb-4">
                    {events[currentEvent].date}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {events[currentEvent].description}
                  </p>
                  <div className="flex space-x-2">
                    {events.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full smooth-transition ${
                          index === currentEvent
                            ? "bg-white pulse-glow"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="w-6 h-12 border-2 border-white/30 rounded-full flex justify-center floating">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 pulse-glow" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-4">
          <div
            className="w-2 h-2 bg-white/30 rounded-full floating"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-2 h-2 bg-white/50 rounded-full floating"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="w-2 h-2 bg-white/30 rounded-full floating"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LuxuryHomepage;
