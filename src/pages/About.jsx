import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import {
  motion,
  useScroll,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

// Instant left-to-right fade component
const LeftToRightFade = ({ text, className = "" }) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.8,
        ease: "easeOut"
      }}
    >
      {text}
    </motion.span>
  );
};


// Icon imports
const Pause = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const Play = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 6L8 12L14 18" />
  </svg>
);

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 6L16 12L10 18" />
  </svg>
);


 
  const values = [
    {
      title: "SUSTAINABILITY",
      description:
        "Eco-conscious principles integrated into every project and design decision",
    },
    {
      title: "CRAFTSMANSHIP",
      description:
        "Celebrating traditional techniques while embracing contemporary sensibilities",
    },
    {
      title: "COLLABORATION",
      description:
        "Working with skilled artisans across Madhya Pradesh and India",
    },
    {
      title: "INNOVATION",
      description:
        "Pushing boundaries and exploring new frontiers in sustainable design",
    },
  ]






// Enhanced animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
      duration: 2,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: 2.2,
    ease: [0.43, 0.13, 0.23, 0.96],
    opacity: { duration: 2.2, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: 2.2,
    ease: [0.43, 0.13, 0.23, 0.96],
    opacity: { duration: 2.2, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.1, ease: [0.43, 0.13, 0.23, 0.96] },
};

// Enhanced scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 to-gray-600 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentInternIndex, setCurrentInternIndex] = useState(0);
  const [isInternAutoPlaying, setIsInternAutoPlaying] = useState(true);

  const [teamMembers, setTeamMembers] = useState([]);
  const [interns, setInterns] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [internsLoading, setInternsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, internsRes] = await Promise.all([
          axios.get(`${API_URL}/team/members`),
          axios.get(`${API_URL}/team/interns`)
        ]);
        setTeamMembers(membersRes.data);
        setInterns(internsRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error(err);
      } finally {
        setTeamLoading(false);
        setInternsLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  const founderSectionRef = useRef(null);
  const isInView = useInView(founderSectionRef, { once: true, amount: 0.15 });
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const handleNextIntern = () => {
    setIsInternAutoPlaying(false);
    setCurrentInternIndex((prev) => (prev + 1) % interns.length);
  };

  const handlePrevIntern = () => {
    setIsInternAutoPlaying(false);
    setCurrentInternIndex((prev) => (prev - 1 + interns.length) % interns.length);
  };

  const handleInternDotClick = (index) => {
    setIsInternAutoPlaying(false);
    setCurrentInternIndex(index);
  };

  // Update threshold for smoother animations
  const viewportConfig = { threshold: 0.15, margin: "-100px" };



  // Auto-scroll functionality for mobile
  useEffect(() => {
    if (isAutoPlaying && window.innerWidth < 1024) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, teamMembers.length]);

  // Auto-scroll functionality for mobile interns
  useEffect(() => {
    if (isInternAutoPlaying && window.innerWidth < 1024) {
      const interval = setInterval(() => {
        setCurrentInternIndex((prev) => (prev + 1) % interns.length);
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isInternAutoPlaying, interns.length]);



  return (
    <div className="bg-white text-black min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative w-full min-h-[100vh] sm:min-h-[100vh] flex flex-col items-center justify-center text-center px-2 sm:px-6 md:px-16"
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/aagaur3.mp4"
        />
        {/* Glass Effect Overlay */}
        <div className="absolute inset-0 glass-overlay z-10" />
        {/* Minimal dark overlay for luxury and readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.10) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.h1
            className="text-4xl xs:text-4xl sm:text-6xl md:text-8xl font-normal tracking-[0.10em] mb-6 sm:mb-8 text-white luxury-font break-words leading-tight"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            style={{ wordBreak: "break-word" }}
          >
            Our Story
          </motion.h1>
          <motion.div
            className="w-16 sm:w-24 h-px bg-white/80 mx-auto mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          />

          <motion.h2
            className="text-xl xs:text-lg sm:text-2xl md:text-3xl font-light text-white/90 mb-8 sm:mb-12 tracking-[0.06em] luxury-font leading-snug sm:leading-normal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.5,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            Where Design Meets Sustainability
          </motion.h2>

          <motion.p
            className="max-w-xl sm:max-w-2xl mx-auto text-md xs:text-sm sm:text-lg md:text-xl text-white/80 font-light mb-8 sm:mb-16 leading-relaxed body-font"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            Inspired by Anupam Mishra’s book “Aaj Bhi Khare Hain Talab”, Aagaur — the reservoir that gathers and holds scattered drops before they become a pond — symbolizes our approach as an architecture and interior design firm: bringing together beauty, functionality, and sustainability into harmonious spaces.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 1.1,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={30} className="text-white/70" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Our Vision Section */}
      <div className="story-sections">
        <motion.div
          className="relative flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-20 max-w-4xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div
            variants={{
              initial: { opacity: 0, y: 60 },
              animate: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.2,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  staggerChildren: 0.2,
                },
              },
            }}
            className="w-full text-center z-10 group"
          >
            <motion.div
              className="mb-8"
              variants={fadeInUp}
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block px-4 py-2 text-xs font-medium bg-gray-100 border border-gray-300 rounded-sm text-gray-600 mb-4 tracking-wide luxury-font"
              >
                FOUNDATION
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6 tracking-[0.2em] sm:tracking-[0.3em] text-black luxury-font"
              >
                Our Vision
              </motion.h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              className="space-y-6 text-md sm:text-[18px] text-gray-700 leading-relaxed max-w-3xl mx-auto"
            >
              <motion.p
                variants={fadeInUp}
                className="group-hover:text-black transition-colors duration-500 body-font"
              >
                Founded with a vision to redefine the relationship between architecture, design, and sustainability, Aagaur Studio seamlessly integrates eco-conscious principles into every project. From innovative architectural solutions that minimize environmental impact to thoughtfully curated interior designs that harmonize functionality with aesthetics, we strive to create spaces that inspire and endure.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="group-hover:text-black transition-colors duration-500 body-font"
              >
                Our approach is rooted in the belief that sustainable design doesn't mean compromising on beauty or functionality. Instead, it's about creating spaces that are both environmentally responsible and aesthetically compelling, ensuring they serve communities for generations to come.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Founder Section */}
      <motion.div
        ref={founderSectionRef}
        className="relative flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 py-20 gap-8 lg:gap-16"
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        {/* Text Content */}
        <motion.div
          className="w-full lg:w-1/2 z-10 group"
          variants={fadeInUp}
        >
          <motion.span
            className="inline-block px-4 py-2 text-xs font-medium bg-gray-100 border border-gray-300 rounded-sm text-gray-600 mb-4 tracking-wide luxury-font"
            variants={fadeInUp}
          >
            Founder and Director
          </motion.span>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-thin mb-6 tracking-[0.2em] sm:tracking-[0.3em] text-black luxury-font"
            variants={fadeInUp}
          >
            TAPAS UPADHYAY & POOJA SHARMA
          </motion.h1>
          <motion.div
            className="h-px w-32 bg-gray-600 mb-6"
            variants={fadeInUp}
          />
          <motion.div
            className="space-y-5 text-md sm:text-[18px] text-gray-700 leading-relaxed"
            variants={staggerContainer}
          >
            <motion.p className="group-hover:text-black transition-colors duration-500 body-font" variants={fadeInUp}>
              Tapas is an esteemed Architect, Musician and the founder director of Studio Aagaur. With a strong focus on social architecture, he has been actively engaged in various projects that celebrate historical buildings and settlements. His work goes beyond mere design, as he is deeply committed to documenting and showcasing the rich cultural heritage embedded within these structures. His expertise lies in capturing the essence of historical architecture and integrating it with contemporary design principles. Through Aagaur, he continues to contribute to the preservation of our traditional design legacy while creating meaningful spaces and objects that inspire and engage communities.
            </motion.p>
            <motion.p className="group-hover:text-black transition-colors duration-500 body-font" variants={fadeInUp}>
              Pooja, the Co-Founder of Studio Aagaur, is a talented architect. She finds joy in working with waste materials, transforming them into remarkable designs. Pooja's commitment to inclusivity is evident in her dedication to designing for individuals who cannot afford fees. Beyond architecture, she is a fun-loving person adding creativity and grace to life of the studio.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="relative group w-full lg:w-auto lg:h-full"
          variants={fadeInUp}
        >
          <motion.div
            className="relative border-2 border-gray-300 p-1 w-full max-w-sm mx-auto lg:w-96 h-90 lg:h-full bg-white shadow-2xl"
            whileHover={{ scale: 1.03, rotateY: -2, transition: { duration: 0.4 } }}
          >
            <motion.img
              src='/founder1.jpg'
              alt="Portrait of Founders"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Enhanced Team Section with improved scroll animations */}
      <motion.div
        className="relative px-4 sm:px-8 md:px-16 py-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, threshold: 0.2, margin: "-50px" }}
        variants={{
          initial: {},
          animate: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1,
            }
          }
        }}
      >
        <motion.div 
          variants={{
            initial: { opacity: 0, y: 60 },
            animate: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
            }
          }} 
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-thin tracking-[0.2em] sm:tracking-[0.3em] mb-6 text-black luxury-font"
            whileHover={{ scale: 1.05 }}
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 0.2 }
              }
            }}
          >
            OUR TEAM
          </motion.h2>
          <motion.div
            className="w-32 h-px bg-gray-600 mx-auto"
            variants={{
              initial: { scaleX: 0 },
              animate: { 
                scaleX: 1,
                transition: { duration: 0.8, delay: 0.4 }
              }
            }}
          />
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-center">
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
        >
          {teamLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 shadow-lg h-[32rem] animate-pulse">
                <div className="bg-gray-300 h-72 w-full"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            ))
          ) : (
            teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group relative h-full"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-gray-900/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <motion.div
                  className="relative bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-[32rem] flex flex-col overflow-hidden"
                  whileHover={{ scale: 1.02, borderColor: "#9ca3af" }}
                >
                  {/* Image Section */}
                  <div className="relative h-72 flex-shrink-0 overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-700"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0transition-all duration-500" />

                    {/* Role Badge
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full luxury-font">
                        {member.role}
                      </span>
                    </div> */}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col overflow-y-auto minimal-scrollbar">
                    <motion.h3
                      className="text-xl font-semibold mb-2 text-gray-900 luxury-font"
                      variants={fadeInUp}
                    >
                      {member.name}
                    </motion.h3>

                    <motion.p
                      className="text-xs text-gray-500 mb-4 tracking-wide uppercase body-font"
                      variants={fadeInUp}
                    >
                      {member.role}
                    </motion.p>

                    <div className="w-12 h-px bg-gray-300 mb-4" />

                    <motion.div 
                      className="text-md sm:text-[18px] text-gray-600 leading-relaxed flex-1 body-font"
                      variants={fadeInUp}
                    >
                      <p>{member.bio}</p> 
                    </motion.div>

                    {/* Decorative Element */}
                    <div className="mt-6 flex justify-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-px bg-gray-400" />
                        <div className="w-1 h-1 bg-gray-500 rounded-full" />
                        <div className="w-4 h-px bg-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>
        </div>

        {/* Mobile Layout - Carousel with Auto-scroll */}
        <div className="lg:hidden relative">
          <div className="relative max-w-sm mx-auto">
            {/* Elegant Navigation Controls */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => {
                  setCurrentIndex(
                    (prev) =>
                      (prev - 1 + teamMembers.length) % teamMembers.length
                  );
                  setIsAutoPlaying(false);
                }}
                className="group flex items-center gap-2 px-4 py-2"
              >
                <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors duration-300" />
                <span className="text-xs tracking-widest uppercase text-gray-400 group-hover:text-black transition-colors duration-300 luxury-font">
                  Previous
                </span>
              </button>
              <div className="h-px w-12 bg-gray-200"></div>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
                  setIsAutoPlaying(false);
                }}
                className="group flex items-center gap-2 px-4 py-2"
              >
                <span className="text-xs tracking-widest uppercase text-gray-400 group-hover:text-black transition-colors duration-300 luxury-font">
                  Next
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors duration-300" />
              </button>
            </div>

            {/* Progress Dots */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {teamMembers.length > 0 && teamMembers.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-gray-800 scale-125"
                      : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Team Member Cards */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`team-member-${currentIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative"
              >
                <motion.div
                  className="bg-white border border-gray-200 shadow-lg overflow-hidden h-[32rem] flex flex-col"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Image Section */}
                  <div className="relative h-72 flex-shrink-0 overflow-hidden">
                    {teamMembers.length > 0 && (
                    <motion.img
                      key={currentIndex}
                      src={teamMembers[currentIndex].image}
                      alt={teamMembers[currentIndex].name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    />
                    )}
                    <div className="absolute inset-0 lg:bg-gradient-to-t lg:from-black/30 lg:to-transparent" />

                    {/* Role Badge
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full luxury-font">
                        {teamMembers.length > 0 && teamMembers[currentIndex].role}
                      </span>
                    </div> */}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col overflow-y-auto minimal-scrollbar">
                    {teamMembers.length > 0 && (
                      <>
                        <h3 className="text-xl font-semibold mb-2 tracking-tighter text-black mb-4 luxury-font">
                          {teamMembers[currentIndex].name}
                        </h3>
                        <p className="text-md text-gray-700 mb-4 luxury-font">
                          {teamMembers[currentIndex].bio}
                        </p>
                        <div className="text-left mt-6">
                          <p className="font-semibold text-black">{teamMembers[currentIndex].role}</p>
                          <p className="text-gray-600">{teamMembers[currentIndex].specialty}</p>
                        </div>
                      </>
                    )}



                    {/* Decorative Element */}
                    <div className="mt-6 flex justify-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-px bg-gray-400" />
                        <div className="w-1 h-1 bg-gray-500 rounded-full" />
                        <div className="w-6 h-px bg-gray-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Sessional Interns Section */}
      <motion.div
        className="px-8 md:px-16 py-20 bg-gray-50"
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1,
            }
          }
        }}
      >
        <motion.div 
          variants={{
            initial: { opacity: 0, y: 60 },
            animate: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
            }
          }} 
          className="text-center mb-12"
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-thin tracking-[0.2em] sm:tracking-[0.3em] mb-6 text-black luxury-font"
            variants={fadeInUp}
          >
            SESSIONAL INTERNS
          </motion.h2>
          <motion.div
            className="w-32 h-px bg-gray-600 mx-auto mb-6"
            variants={{
              initial: { scaleX: 0 },
              animate: { 
                scaleX: 1,
                transition: { duration: 0.8, delay: 0.4 }
              }
            }}
          />
          <motion.p 
            className="text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto body-font"
            variants={fadeInUp}
          >
            Each year, we hire new interns into our team and help them grow. We take up to 4 interns per session, and they become a part of our little tribe for a while.
          </motion.p>
        </motion.div>

        {/* Desktop Layout for Interns */}
        <motion.div
          variants={staggerContainer}
          className="hidden lg:grid grid-cols-1 md:grid-cols-2  gap-8 max-w-3xl mx-auto"
        >
          {internsLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 shadow-lg h-[32rem] animate-pulse">
                <div className="bg-gray-300 h-72 w-full"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            ))
          ) : (
            interns.map((intern, index) => (
              <motion.div
                key={`intern-${index}`}
                variants={scaleIn}
                className="group relative h-full"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-[32rem] flex flex-col overflow-hidden"
                  whileHover={{ scale: 1.02, borderColor: "#9ca3af" }}
                >
                  <div className="relative h-72 flex-shrink-0 overflow-hidden">
                    <motion.img
                      src={intern.image}
                      alt={intern.name}
                      className="w-full h-full object-cover transition-all duration-700"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full luxury-font">
                        {intern.role}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col overflow-y-auto minimal-scrollbar">
                    <motion.h3
                      className="text-xl font-semibold mb-2 text-gray-900 luxury-font"
                      variants={fadeInUp}
                    >
                      {intern.name}
                    </motion.h3>
                    <motion.p
                      className="text-xs text-gray-500 mb-4 tracking-wide uppercase body-font"
                      variants={fadeInUp}
                    >
                      {intern.role}
                    </motion.p>
                    <div className="w-12 h-px bg-gray-300 mb-4" />
                    <motion.div 
                      className="text-sm text-gray-600 leading-relaxed flex-1 body-font"
                      variants={fadeInUp}
                    >
                      <p>{intern.bio}</p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Mobile Layout for Interns */}
        <motion.div
          className="lg:hidden relative max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentInternIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-white border border-gray-200 shadow-lg overflow-hidden h-[32rem] flex flex-col"
            >
              <div className="relative h-72 flex-shrink-0 overflow-hidden">
                {interns.length > 0 && (
                  <img
                    src={interns[currentInternIndex].image}
                    alt={interns[currentInternIndex].name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full luxury-font">
                    {interns.length > 0 && interns[currentInternIndex].role}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col overflow-y-auto minimal-scrollbar">
                {interns.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 luxury-font">
                      {interns[currentInternIndex].name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 tracking-wide uppercase body-font">
                      {interns[currentInternIndex].role}
                    </p>
                    <div className="w-12 h-px bg-gray-300 mb-4" />
                    <div className="text-sm text-gray-600 leading-relaxed flex-1 body-font">
                      <p>{interns[currentInternIndex].bio}</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
            <button 
              onClick={handlePrevIntern}
              className="bg-white/50 hover:bg-white/80 transition-all duration-300 rounded-full p-2 shadow-md backdrop-blur-sm"
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={handleNextIntern}
              className="bg-white/50 hover:bg-white/80 transition-all duration-300 rounded-full p-2 shadow-md backdrop-blur-sm"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {interns.map((_, index) => (
              <button
                key={index}
                onClick={() => handleInternDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentInternIndex === index ? 'bg-gray-800 scale-125' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Values Section */} {" "}
      <div className="relative px-8 md:px-16 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-thin tracking-[0.3em] mb-6 text-black luxury-font">
            OUR VALUES
          </h2>
          <div className="w-32 h-px bg-gray-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-white border border-gray-200 p-8 shadow-sm text-center hover:shadow-md transition-shadow duration-300"
            >
              {/* Title */}
              <h3 className="text-lg font-thin mb-4 tracking-[0.2em] text-black luxury-font">
                {value.title}
              </h3>
              {/* Separator line */}
              <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed body-font">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
