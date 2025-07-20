import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { title: "Home", path: "/home" },
    { title: "Portfolio", hasDropdown: true },
    { title: "About", path: "/about" },
    { title: "Films", path: "/films" },
    { title: "Contact", path: "/contact" },
    { title: "Careers", path: "/careers" },
  ];

  const projectsSubmenu = [
    { title: "Architecture", path: "/projects/architecture" },
    { title: "Interior", path: "/projects/interior" },
    { title: "Events", path: "/projects/events" },
  ];

  const socialLinks = [
    {
      icon: <FaInstagram className="w-[22px] h-[22px]" />,
      url: "https://www.instagram.com/aagaur.studio/",
      label: "Instagram",
    },
    {
      icon: <FaYoutube className="w-[22px] h-[22px]" />,
      url: "https://www.youtube.com/@Aagaurdesignstudio",
      label: "YouTube",
    },
    {
      icon: <FaFacebookF className="w-[22px] h-[22px]" />,
      url: "https://www.facebook.com/profile.php/?id=100069558210140",
      label: "Facebook",
    },
  ];

  return (
    <nav className="fixed w-full z-[100] bg-white shadow-lg shadow-black/5">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo and Text */}
          <a href="/" className="flex items-center space-x-4 group">
            <img
              src="/black.png"
              alt="Aagaur Logo"
              className=" h-[65px] sm:h-[80px] w-[65px] sm:w-[80px] transition-all duration-1000 ease-[cubic-bezier(.43,.13,.23,.96)] transform hover:scale-102"
            />
            <span className="font-cormorant sm:text-[26px] text-[20px] tracking-[0.2em] font-light text-black transition-all duration-700 group-hover:tracking-[0.22em]">
              AAGAUR
            </span><span 
  className="sm:text-[26px] text-[20px] font-light text-black/70 transition-all duration-700 group-hover:tracking-[0.22em]"
  style={{ 
    fontFamily: "'Tiro Devanagari Hindi', serif",
    letterSpacing: '0' // Override tracking for Devanagari
  }}
>
  | आगौर
</span>

          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                {link.hasDropdown ? (
                  <div
                    className="flex items-center space-x-1 cursor-pointer"
                    onMouseEnter={() => setIsProjectsOpen(true)}
                    onMouseLeave={() => setIsProjectsOpen(false)}
                  >
                    <a
                      href={link.path}
                      className="text-[15px] tracking-[0.15em] font-light relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(.43,.13,.23,.96)] text-black/90 hover:text-black hover:tracking-[0.18em] group"
                    >
                      {link.title}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black/60 transition-all duration-700 group-hover:w-full"></span>
                    </a>
                    <FaChevronDown
                      className={`w-3 h-3 text-black/70 transition-all duration-500 ease-[cubic-bezier(.43,.13,.23,.96)] ${
                        isProjectsOpen ? "rotate-180" : ""
                      }`}
                    />
                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 mt-4 w-48 bg-white shadow-xl shadow-black/10 transition-all duration-500 ease-[cubic-bezier(.43,.13,.23,.96)] transform origin-top ${
                        isProjectsOpen
                          ? "opacity-100 visible scale-100"
                          : "opacity-0 invisible scale-98"
                      }`}
                    >
                      <div className="py-4">
                        {projectsSubmenu.map((item) => (
                          <a
                            key={item.path}
                            href={item.path}
                            className="block px-6 py-3 text-[14px] tracking-[0.1em] font-light text-black/80 hover:text-black hover:bg-black/5 hover:tracking-[0.12em] transition-all duration-500 ease-[cubic-bezier(.43,.13,.23,.96)]"
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    href={link.path}
                    className="text-[15px] tracking-[0.15em] font-light relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(.43,.13,.23,.96)] text-black/90 hover:text-black hover:tracking-[0.18em] group"
                  >
                    {link.title}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black/60 transition-all duration-700 group-hover:w-full"></span>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Social Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-all duration-700 ease-[cubic-bezier(.43,.13,.23,.96)] hover:scale-105 text-black/80 hover:text-black hover:-translate-y-0.5 hover:rotate-1"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-full text-black  transition-all duration-700 ease-[cubic-bezier(.43,.13,.23,.96)]"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute w-full h-[1.5px] bg-black transform transition-all duration-700 ease-[cubic-bezier(.43,.13,.23,.96)] ${
                  isMobileMenuOpen ? "rotate-45 top-2" : "top-0"
                }`}
              />
              <span
                className={`absolute w-full h-[1.5px] bg-black transform transition-all duration-700 ease-[cubic-bezier(.43,.13,.23,.96)] ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                } top-2`}
              />
              <span
                className={`absolute w-full h-[1.5px] bg-black transform transition-all duration-700 ease-[cubic-bezier(.43,.13,.23,.96)] ${
                  isMobileMenuOpen ? "-rotate-45 top-2" : "top-4"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu - Full Screen */}
        <div
          className={`md:hidden fixed inset-0 bg-white z-40 transition-all duration-700 ease-out 
            ${
              isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          style={{ top: "96px" }} // Height of the navbar
        >
          <div className="h-full flex flex-col justify-between py-8 px-6">
            {/* Navigation Links */}
            <div className="space-y-8 pt-4">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.hasDropdown ? (
                    <div>
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                      >
                        <a
                          href={link.path}
                          className="text-[18px] tracking-[0.15em] font-light transition-all duration-700 ease-[cubic-bezier(.43,.13,.23,.96)] text-black/80 hover:text-black hover:tracking-[0.18em]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.title}
                        </a>
                        <FaChevronDown
                          className={`w-3 h-3 text-black/70 transition-all duration-500 ease-[cubic-bezier(.43,.13,.23,.96)] ${
                            isProjectsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {/* Mobile Submenu */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(.43,.13,.23,.96)] ${
                          isProjectsOpen
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pl-6 pt-4 space-y-4">
                          {projectsSubmenu.map((item) => (
                            <a
                              key={item.path}
                              href={item.path}
                              className="block text-[16px] tracking-[0.1em] font-light text-black/70 hover:text-black hover:tracking-[0.12em] transition-all duration-500 ease-[cubic-bezier(.43,.13,.23,.96)]"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={link.path}
                      className="block text-[18px] tracking-[0.15em] font-light transition-all duration-700 ease-[cubic-bezier(.43,.13,.23,.96)] text-black/80 hover:text-black hover:tracking-[0.18em]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.title}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="border-t border-black/10 pt-8">
              <p className="text-[14px] tracking-[0.1em] text-black/60 mb-6">
                Follow Us
              </p>
              <div className="flex items-center space-x-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform transition-all duration-500 text-black/80 hover:text-black hover:scale-110 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
