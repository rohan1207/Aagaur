import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

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

const storyContent = {
  hero: {
    title: "OUR STORY",
    subtitle: "Where Design Meets Sustainability",
    description:
      "At Aagaur Studio, we are passionate about sustainable architecture, interior design, and crafting exquisite products that not only elevate spaces but also contribute to a better world. Our commitment to sustainability is at the core of everything we do, guiding our design ethos and business practices.",
  },
  sections: [
    {
      title: "OUR VISION",
      year: "FOUNDATION",
      content: [
        "Founded with a vision to redefine the relationship between architecture, design, and sustainability, Aagaur Studio seamlessly integrates eco-conscious principles into every project. From innovative architectural solutions that minimize environmental impact to thoughtfully curated interior designs that harmonize functionality with aesthetics, we strive to create spaces that inspire and endure.",
        "Our approach is rooted in the belief that sustainable design doesn't mean compromising on beauty or functionality. Instead, it's about creating spaces that are both environmentally responsible and aesthetically compelling, ensuring they serve communities for generations to come.",
      ],
      position: "left",
      textOnly: true,
    },
   
  ],
  values: [
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
  ],
};

const firstSectionContent = {
  sections: [
    {
      heading: "TAPAS UPADHYAY & POOJA SHARMA",
      paragraphs: [
        "Tapas is an esteemed Architect, Musician and the founder director of Studio Aagaur. With a strong focus on social architecture, he has been actively engaged in various projects that celebrate historical buildings and settlements. His work goes beyond mere design, as he is deeply committed to documenting and showcasing the rich cultural heritage embedded within these structures. His expertise lies in capturing the essence of historical architecture and integrating it with contemporary design principles. Through Aagaur, he continues to contribute to the preservation of our traditional design legacy while creating meaningful spaces and objects that inspire and engage communities.",
        "Pooja, the Co- Founder of Studio Aagaur, is a talented architect. She finds joy in working with waste materials, transforming them into remarkable designs. Pooja's commitment to inclusivity is evident in her dedication to designing for individuals who cannot afford fees. Beyond architecture, she is a fun-loving person adding creativity and grace to life of the studio."
      ],      
      image:"/founder1.jpg",
      role: "Founder and Director",
      specialty: "",
    },

    {
      heading: "VIBHUTI DEV",
      paragraphs: [
        "Vibhuti works on the artistic side of Aagaur, takes care of Projects and the team flow",
      ],
      image: "/vibhuti1.jpg",
      role: "Project Manager",
      specialty: "Sr. Architectural and interior designer, communications.",
    },
    {
      heading: "Aaditya Pardesi",
      paragraphs: [
        "Aaditya Pardesi is a talented architect. He finds joy in working with waste materials, transforming them into remarkable designs.",
      ],
      image: "/dev1.jpg",
      role: "Jr. Architect",
      specialty: "Jr. Architect and Interior designer",
    },
   

  ],
};

const interns = [
  {
    heading: "Sneha Soni",
    paragraphs: ["Sneha Soni is an Architectural Intern for Session 2025 Feb- july"],
    image: "/sneha.jpg",
    role: "Architectural Intern",
    specialty: "",
  },
  {
    heading: "Bhumika Rajput",
    paragraphs: ["Bhumika Rajput is an Architectural Intern for Session 2025 Feb- july"],
    image: "/bhumika.jpg",
    role: "Architectural Intern",
    specialty: "",
  },

];

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
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentInternIndex, setCurrentInternIndex] = useState(0);
  const [isInternAutoPlaying, setIsInternAutoPlaying] = useState(true);

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

  // Define teamMembers
  const teamMembers = firstSectionContent.sections.slice(1);

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

  // Parallax transforms
  const yBg = useTransform(scrollY, [0, 1000], [0, -100]);
  const yText = useTransform(scrollY, [0, 1000], [0, 50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-white text-black min-h-screen overflow-x-hidden">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Playfair+Display:wght@400;500;600&display=swap");

        .luxury-font {
          font-family: "Playfair Display", serif;
        }

        .body-font {
          font-family: "Cormorant Garamond", serif;
        }
      `}</style>
      <ScrollProgress />
      {/* Enhanced background with parallax */}
      <motion.div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{ y: yBg }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-transparent to-gray-200"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-300 rounded-full blur-3xl opacity-20"></div>
      </motion.div>
      {/* Hero Section - Luxurious & Animated */}
      <div className="relative h-screen overflow-hidden flex items-center justify-center bg-gray-50">
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
          style={{ y: yText }}
        >
          <motion.h1 
            className="text-3xl md:text-8xl font-thin text-black tracking-[0.3em] uppercase luxury-font"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
            }}
          >
            {storyContent.hero.title.split("").map((char, index) => (
              <motion.div
                key={index}
                className="w-full flex-shrink-0 flex justify-center"
                style={{ width: `${100 / teamMembers.length}%` }}
              >
                <motion.span 
                  className="inline-block"
                  variants={{
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] } }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </motion.div>
            ))}
          </motion.h1>

          <motion.div 
            className="mt-8 max-w-3xl"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.2, delayChildren: 1.2 } }
            }}
          >
            <motion.p
              className="text-base md:text-lg text-gray-500 text-center max-w-3xl mx-auto mb-16 body-font"
              variants={fadeInUp}
            >
              {storyContent.hero.subtitle}
            </motion.p>
            <motion.p
              className="text-base md:text-lg text-gray-500 mt-4 body-font"
              variants={fadeInUp}
            >
              {storyContent.hero.description}
            </motion.p>
          </motion.div>
          
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
            style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
          >
            <div className="flex flex-col items-center text-gray-400">
                <span className="text-xs tracking-[0.2em] luxury-font">SCROLL TO EXPLORE</span>
                <motion.div 
                    className="mt-2"
                    animate={{ y: [0, 5, 0]}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut"}}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M12 5v14m-4-4l4 4 4-4" />
                    </svg>
                </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Story Sections with scroll target and improved animations */}
      <div className="story-sections">
        {storyContent.sections.map((section, index) => {
          const isLeft = section.position === "left";
          const ref = useRef(null);
          const isInView = useInView(ref, { 
            threshold: 0.2, 
            margin: "-100px",
            once: false // Allow re-triggering animations
          });

          // Check if this is a text-only section
          if (section.textOnly) {
            return (
              <motion.div
                key={index}
                ref={ref}
                className="relative flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-20 max-w-4xl mx-auto"
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                variants={staggerContainer}
              >
                {/* Animated background elements with scroll-based movement */}
                <motion.div
                  className="absolute top-16 right-16 w-2 h-2  rounded-full"
                  animate={{
                    opacity: isInView ? [0.3, 0.8, 0.3] : 0.1,
                    scale: isInView ? [1, 1.8, 1] : 0.8,
                    x: isInView ? [0, 10, 0] : 0,
                  }}
                  transition={{
                    duration: isInView ? 4 : 1,
                    repeat: isInView ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />

             

                <motion.div
                  className="absolute bottom-16 right-32 w-1 h-1 bg-gray-300 rounded-full"
                  animate={{
                    y: isInView ? [0, 15, 0] : 0,
                    x: isInView ? [0, -10, 0] : 0,
                    opacity: isInView ? [0.2, 0.5, 0.2] : 0,
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: isInView ? Infinity : 0,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />

                {/* Enhanced TEXT BLOCK with staggered animations */}
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
                      }
                    }
                  }}
                  className="w-full text-center z-10 group"
                >
                  <motion.div 
                    className="mb-8"
                    variants={{
                      initial: { opacity: 0, scale: 0.9 },
                      animate: { 
                        opacity: 1, 
                        scale: 1,
                        transition: { duration: 0.8 }
                      }
                    }}
                  >
                    <motion.span
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.6 }
                        }
                      }}
                      className="inline-block px-4 py-2 text-xs font-medium bg-gray-100 border border-gray-300 rounded-sm text-gray-600 mb-4 tracking-wide luxury-font"
                    >
                      {section.year}
                    </motion.span>
                    <motion.h2
                      variants={{
                        initial: { opacity: 0, y: 30 },
                        animate: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.8, delay: 0.2 }
                        }
                      }}
                      className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6 tracking-[0.2em] sm:tracking-[0.3em] text-black luxury-font"
                    >
                      {section.title}
                    </motion.h2>
                    <motion.div
                      variants={{
                        initial: { scaleX: 0 },
                        animate: { 
                          scaleX: 1,
                          transition: { duration: 0.8, delay: 0.4 }
                        }
                      }}
                      className="h-px w-32 bg-gray-400 mb-6"
                    />
                  </motion.div>
                  <motion.div
                    variants={{
                      initial: {},
                      animate: {
                        transition: { staggerChildren: 0.1, delayChildren: 0.6 }
                      }
                    }}
                    className="space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto"
                  >
                    {section.content.map((p, i) => (
                      <motion.p
                        key={i}
                        variants={{
                          initial: { opacity: 0, y: 20 },
                          animate: { 
                            opacity: 1, 
                            y: 0,
                            transition: { duration: 0.6 }
                          }
                        }}
                        className="group-hover:text-black transition-colors duration-500 body-font"
                      >
                        {p}
                      </motion.p>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={index}
              ref={ref}
              className="relative flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 py-20 gap-8 lg:gap-16"
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              variants={staggerContainer}
            >
             

              {isLeft ? (
                <>
                  {/* Enhanced TEXT BLOCK LEFT */}
                  <motion.div
                    variants={slideInLeft}
                    className="w-full lg:w-1/2 z-10 group"
                  >
                    <motion.div className="mb-8">
                      <motion.span
                        variants={fadeInUp}
                        className="inline-block px-4 py-2 text-xs font-medium bg-gray-100 border border-gray-300 rounded-sm text-gray-600 mb-4 tracking-wide luxury-font"
                      >
                        {section.year}
                      </motion.span>
                      <motion.h2
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6 tracking-[0.2em] sm:tracking-[0.3em] text-black luxury-font"
                      >
                        {section.title}
                      </motion.h2>
                      <motion.div
                        variants={fadeInUp}
                        className="h-px w-32 bg-gray-400 mb-6"
                      />
                    </motion.div>
                    <motion.div
                      variants={staggerContainer}
                      className="space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed"
                    >
                      {section.content.map((p, i) => (
                        <motion.p
                          key={i}
                          variants={fadeInUp}
                          className="group-hover:text-black transition-colors duration-500 body-font"
                        >
                          {p}
                        </motion.p>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Enhanced IMAGE BLOCK RIGHT */}
                  <motion.div
                    variants={slideInRight}
                    className="relative group w-full lg:w-auto"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gray-300/30 rounded-none blur-2xl"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <motion.div
                      className="relative border-2 border-gray-300 p-1 w-full max-w-md mx-auto lg:w-96 h-64 bg-white shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover transition-all duration-700"
                        whileHover={{ scale: 1.1 }}
                      />
                    </motion.div>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Enhanced IMAGE BLOCK LEFT */}
                  <motion.div
                    variants={slideInLeft}
                    className="relative group w-full lg:w-auto order-2 lg:order-1"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gray-300/30 rounded-none blur-2xl"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <motion.div
                      className="relative border-2 border-gray-300 p-1 w-full max-w-md mx-auto lg:w-96 h-64 bg-white shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover transition-all duration-700"
                        whileHover={{ scale: 1.1 }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Enhanced TEXT BLOCK RIGHT */}
                  <motion.div
                    variants={slideInRight}
                    className="w-full lg:w-1/2 z-10 group order-1 lg:order-2"
                  >
                    <motion.div className="mb-8">
                      <motion.span
                        variants={fadeInUp}
                        className="inline-block px-4 py-2 text-xs font-medium bg-gray-100 border border-gray-300 rounded-sm text-gray-600 mb-4 tracking-wide luxury-font"
                      >
                        {section.year}
                      </motion.span>
                      <motion.h2
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl lg:text-5xl font-thin mb-6 tracking-[0.2em] sm:tracking-[0.3em] text-black luxury-font"
                      >
                        {section.title}
                      </motion.h2>
                      <motion.div
                        variants={fadeInUp}
                        className="h-px w-32 bg-gray-400 mb-6"
                      />
                    </motion.div>
                    <motion.div
                      variants={staggerContainer}
                      className="space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed"
                    >
                      {section.content.map((p, i) => (
                        <motion.p
                          key={i}
                          variants={fadeInUp}
                          className="group-hover:text-black transition-colors duration-500 body-font"
                        >
                          {p}
                        </motion.p>
                      ))}
                    </motion.div>
                  </motion.div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced Leadership Section with improved scroll animations */}
      {firstSectionContent.sections.slice(0,1).map((section, index) => {
        const isEven = index % 2 === 0;
        const ref = useRef(null);
        const isInView = useInView(ref, { 
          threshold: 0.15, 
          margin: "-80px",
          once: false // Allow re-triggering
        });

        return (
          <motion.div
            key={index}
            ref={ref}
            className="relative flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 py-16 lg:py-24 min-h-screen gap-8 lg:gap-16"
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 0.1,
                }
              }
            }}
          >
           

            <motion.div
              className="absolute bottom-32 left-16 w-1 h-1 bg-gray-400 rounded-full"
              animate={{
                x: isInView ? [0, 20, 0] : 0,
                opacity: isInView ? [0.2, 0.6, 0.2] : 0,
              }}
              transition={{
                duration: 4,
                repeat: isInView ? Infinity : 0,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {isEven ? (
              <>
                {/* Enhanced TEXT BLOCK LEFT with staggered animations */}
                <motion.div
                  variants={{
                    initial: { opacity: 0, x: -80 },
                    animate: { 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        duration: 1.2,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      }
                    }
                  }}
                  className="w-full lg:w-1/2 z-10 group"
                >
                  <motion.div 
                    className="mb-8"
                    variants={{
                      initial: { opacity: 0, y: 30 },
                      animate: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.8, delay: 0.2 }
                      }
                    }}
                  >
                    <motion.span
                      variants={{
                        initial: { opacity: 0, scale: 0.9 },
                        animate: { 
                          opacity: 1, 
                          scale: 1,
                          transition: { duration: 0.6, delay: 0.1 }
                        }
                      }}
                      className="inline-block px-4 py-2 text-xs font-medium bg-gray-100 border border-gray-300 rounded-sm text-gray-600 mb-4 tracking-wide luxury-font"
                    >
                      {section.role}
                    </motion.span>
                    <motion.h1
                      variants={{
                        initial: { opacity: 0, y: 40 },
                        animate: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 1, delay: 0.3 }
                        }
                      }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-thin mb-6 tracking-[0.2em] sm:tracking-[0.3em] text-black luxury-font"
                    >
                      {section.heading}
                    </motion.h1>
                    <motion.div
                      variants={{
                        initial: { scaleX: 0 },
                        animate: { 
                          scaleX: 1,
                          transition: { duration: 0.8, delay: 0.5 }
                        }
                      }}
                      className="h-px w-32 bg-gray-600 mb-6"
                    />
                    <motion.p
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.6, delay: 0.6 }
                        }
                      }}
                      className="text-sm text-gray-500 mb-8 tracking-wide body-font"
                    >
                      {section.specialty}
                    </motion.p>
                  </motion.div>
                  <motion.div
                    variants={{
                      initial: {},
                      animate: {
                        transition: { staggerChildren: 0.1, delayChildren: 0.8 }
                      }
                    }}
                    className="space-y-5 text-sm sm:text-base text-gray-700 leading-relaxed"
                  >
                    {section.paragraphs.map((p, i) => (
                      <motion.p
                        key={i}
                        variants={{
                          initial: { opacity: 0, y: 20 },
                          animate: { 
                            opacity: 1, 
                            y: 0,
                            transition: { duration: 0.6 }
                          }
                        }}
                        className="group-hover:text-black transition-colors duration-500 body-font"
                      >
                        {p}
                      </motion.p>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Enhanced IMAGE BLOCK RIGHT with 3D-like animations */}
                <motion.div
                  variants={{
                    initial: { opacity: 0, x: 80, rotateY: 15 },
                    animate: { 
                      opacity: 1, 
                      x: 0, 
                      rotateY: 0,
                      transition: {
                        duration: 1.4,
                        ease: [0.43, 0.13, 0.23, 0.96],
                        delay: 0.3,
                      }
                    }
                  }}
                  className="relative group w-full lg:w-auto"
                >
                  <motion.div
                    className="absolute inset-0 lg:bg-gray-300/30 rounded-none blur-2xl"
                    animate={{
                      scale: isInView ? [1, 1.1, 1] : 1,
                      opacity: isInView ? [0.3, 0.6, 0.3] : 0.2,
                    }}
                    transition={{
                      duration: 4,
                      repeat: isInView ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="relative border-2 border-gray-300 p-1 w-full max-w-sm mx-auto lg:w-96 h-80 lg:h-96 bg-white shadow-2xl"
                    whileHover={{ 
                      scale: 1.03, 
                      rotateY: -2,
                      transition: { duration: 0.4 }
                    }}
                    animate={{
                      y: isInView ? [0, -5, 0] : 0,
                    }}
                    transition={{
                      duration: 3,
                      repeat: isInView ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.img
                      src={section.image}
                      alt="Portrait"
                      className="w-full h-full object-cover transition-all duration-900"
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        scale: isInView ? [1, 1.01, 1] : 0.98,
                      }}
                      transition={{
                        duration: 4,
                        repeat: isInView ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </>
            ) : (
              <>
                {/* Enhanced IMAGE BLOCK LEFT with 3D-like animations */}
                <motion.div
                  variants={{
                    initial: { opacity: 0, x: -80, rotateY: -15 },
                    animate: { 
                      opacity: 1, 
                      x: 0, 
                      rotateY: 0,
                      transition: {
                        duration: 1.4,
                        ease: [0.43, 0.13, 0.23, 0.96],
                        delay: 0.3,
                      }
                    }
                  }}
                  className="relative group w-full lg:w-auto order-2 lg:order-1"
                >
                  <motion.div
                    className="absolute inset-0 lg:bg-gray-300/30 rounded-none blur-2xl"
                    animate={{
                      scale: isInView ? [1, 1.1, 1] : 1,
                      opacity: isInView ? [0.3, 0.6, 0.3] : 0.2,
                    }}
                    transition={{
                      duration: 4,
                      repeat: isInView ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="relative border-2 border-gray-300 p-1 w-full max-w-sm mx-auto lg:w-96 h-80 lg:h-96 bg-white shadow-2xl"
                    whileHover={{ 
                      scale: 1.03, 
                      rotateY: 2,
                      transition: { duration: 0.4 }
                    }}
                    animate={{
                      y: isInView ? [0, -5, 0] : 0,
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: isInView ? Infinity : 0,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <motion.img
                      src={section.image}
                      alt="Portrait"
                      className="w-full h-full object-cover transition-all duration-900"
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        scale: isInView ? [1, 1.01, 1] : 0.98,
                      }}
                      transition={{
                        duration: 4.2,
                        repeat: isInView ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Enhanced TEXT BLOCK RIGHT with staggered animations */}
                <motion.div
                  variants={{
                    initial: { opacity: 0, x: 80 },
                    animate: { 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        duration: 1.2,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      }
                    }
                  }}
                  className="w-full lg:w-1/2 z-10 group order-1 lg:order-2"
                >
                  <motion.div 
                    className="mb-8"
                    variants={{
                      initial: { opacity: 0, y: 30 },
                      animate: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.8, delay: 0.2 }
                      }
                    }}
                  >
                    <motion.span
                      variants={{
                        initial: { opacity: 0, scale: 0.9 },
                        animate: { 
                          opacity: 1, 
                          scale: 1,
                          transition: { duration: 0.6, delay: 0.1 }
                        }
                      }}
                      className="inline-block px-4 py-2 text-xs font-medium bg-gray-100 border border-gray-300 rounded-sm text-gray-600 mb-4 tracking-wide luxury-font"
                    >
                      {section.role}
                    </motion.span>
                    <motion.h1
                      variants={{
                        initial: { opacity: 0, y: 40 },
                        animate: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 1, delay: 0.3 }
                        }
                      }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-thin mb-6 tracking-[0.2em] sm:tracking-[0.3em] text-black luxury-font"
                    >
                      {section.heading}
                    </motion.h1>
                    <motion.div
                      variants={{
                        initial: { scaleX: 0 },
                        animate: { 
                          scaleX: 1,
                          transition: { duration: 0.8, delay: 0.5 }
                        }
                      }}
                      className="h-px w-32 bg-gray-600 mb-6"
                    />
                    <motion.p
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.6, delay: 0.6 }
                        }
                      }}
                      className="text-sm text-gray-500 mb-8 tracking-wide body-font"
                    >
                      {section.specialty}
                    </motion.p>
                  </motion.div>
                  <motion.div
                    variants={{
                      initial: {},
                      animate: {
                        transition: { staggerChildren: 0.1, delayChildren: 0.8 }
                      }
                    }}
                    className="space-y-5 text-sm sm:text-base text-gray-700 leading-relaxed"
                  >
                    {section.paragraphs.map((p, i) => (
                      <motion.p
                        key={i}
                        variants={{
                          initial: { opacity: 0, y: 20 },
                          animate: { 
                            opacity: 1, 
                            y: 0,
                            transition: { duration: 0.6 }
                          }
                        }}
                        className="group-hover:text-black transition-colors duration-500 body-font"
                      >
                        {p}
                      </motion.p>
                    ))}
                  </motion.div>
                </motion.div>
              </>
            )}
          </motion.div>
        );
      })}
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
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          >
            {firstSectionContent.sections.slice(1).map((section, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group relative h-full"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-gray-900/20 rounded-lg blur-xl"
                  animate={{
                    scale: hoveredCard === index ? 1.1 : 1,
                    opacity: hoveredCard === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.7 }}
                />

                <motion.div
                  className="relative bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-[32rem] flex flex-col overflow-hidden"
                  whileHover={{ scale: 1.02, borderColor: "#9ca3af" }}
                >
                  {/* Image Section */}
                  <div className="relative h-72 flex-shrink-0 overflow-hidden">
                    <motion.img
                      src={section.image}
                      alt={section.heading}
                      className="w-full h-full object-cover transition-all duration-700"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 transition-all duration-500" />

                    {/* Role Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full luxury-font">
                        {section.role}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col overflow-y-auto minimal-scrollbar">
                    <motion.h3
                      className="text-xl font-semibold mb-2 text-gray-900 luxury-font"
                      variants={fadeInUp}
                    >
                      {section.heading}
                    </motion.h3>

                    <motion.p
                      className="text-xs text-gray-500 mb-4 tracking-wide uppercase body-font"
                      variants={fadeInUp}
                    >
                      {section.specialty}
                    </motion.p>

                    <div className="w-12 h-px bg-gray-300 mb-4" />

                    <motion.div
                      className="text-sm text-gray-600 leading-relaxed flex-1 body-font"
                      variants={fadeInUp}
                    >
                      {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
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
            ))}
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
              {teamMembers.map((_, idx) => (
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
                    <img
                      src={teamMembers[currentIndex].image}
                      alt={teamMembers[currentIndex].heading}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 lg:bg-gradient-to-t lg:from-black/30 lg:to-transparent" />

                    {/* Role Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full luxury-font">
                        {teamMembers[currentIndex].role}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col overflow-y-auto minimal-scrollbar">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 luxury-font">
                      {teamMembers[currentIndex].heading}
                    </h3>

                    <p className="text-xs text-gray-500 mb-4 tracking-wide uppercase body-font">
                      {teamMembers[currentIndex].specialty}
                    </p>

                    <div className="w-12 h-px bg-gray-300 mb-4" />

                    <div className="text-sm text-gray-600 leading-relaxed flex-1 body-font">
                      {teamMembers[currentIndex].paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    </div>

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
        <div className="hidden lg:flex justify-center">
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          >
            {interns.map((intern, index) => (
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
                      alt={intern.heading}
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
                      {intern.heading}
                    </motion.h3>
                    <motion.p
                      className="text-xs text-gray-500 mb-4 tracking-wide uppercase body-font"
                      variants={fadeInUp}
                    >
                      {intern.specialty}
                    </motion.p>
                    <div className="w-12 h-px bg-gray-300 mb-4" />
                    <motion.div
                      className="text-sm text-gray-600 leading-relaxed flex-1 body-font"
                      variants={fadeInUp}
                    >
                      {intern.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

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
                <img
                  src={interns[currentInternIndex].image}
                  alt={interns[currentInternIndex].heading}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full luxury-font">
                    {interns[currentInternIndex].role}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col overflow-y-auto minimal-scrollbar">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 luxury-font">
                  {interns[currentInternIndex].heading}
                </h3>
                <p className="text-xs text-gray-500 mb-4 tracking-wide uppercase body-font">
                  {interns[currentInternIndex].specialty}
                </p>
                <div className="w-12 h-px bg-gray-300 mb-4" />
                <div className="text-sm text-gray-600 leading-relaxed flex-1 body-font">
                  {interns[currentInternIndex].paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center max-w-6xl mx-auto">
          {storyContent.values.map((value, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref);

            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="group relative text-center"
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                {/* Subtle hover glow */}
                <div
                  className={`absolute inset-0 bg-gray-200/50 rounded-none blur-xl transform transition-all duration-700 ${
                    hoveredValue === index
                      ? "scale-110 opacity-100"
                      : "scale-100 opacity-0"
                  }`}
                ></div>

                <div className="relative bg-white border border-gray-200 p-8 shadow-sm transform transition-all duration-500 hover:scale-105 hover:border-gray-300 hover:shadow-md h-full flex flex-col">
                  {/* Title */}
                  <h3 className="text-lg font-thin mb-4 tracking-[0.2em] text-black luxury-font">
                    {value.title}
                  </h3>

                  {/* Separator line */}
                  <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex-grow body-font">
                    {value.description}
                  </p>

                  {/* Decorative element */}
                  <div className="mt-6 flex justify-center">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-px bg-gray-400"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-4 h-px bg-gray-400"></div>
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
