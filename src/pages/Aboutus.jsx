import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
      image:
        "https://images.unsplash.com/photo-1518335935020-cda456d81171?w=600&h=400&fit=crop",
      position: "left",
    },
    {
      title: "AAGAUR CRAFTS",
      year: "HERITAGE",
      content: [
        "In addition to our architectural and interior design expertise, Aagaur Studio is also home to Aagaur Crafts, our product design section. Collaborating with skilled artisans from across Madhya Pradesh and India, we celebrate traditional craftsmanship while infusing contemporary sensibilities into our creations.",
        "Each piece from Aagaur Crafts tells a story of heritage, craftsmanship, and sustainability. By working directly with artisans, we not only preserve traditional techniques but also ensure fair compensation and sustainable livelihoods for our craftspeople, creating a positive impact that extends far beyond design.",
      ],
      image: "/crafts.png",
      position: "right",
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
      heading: "TAPAS",
      paragraphs: [
        "Tapas is an esteemed Architect, Musician and the founder director of Studio Aagaur. With a strong focus on social architecture, he has been actively engaged in various projects that celebrate historical buildings and settlements. His work goes beyond mere design, as he is deeply committed to documenting and showcasing the rich cultural heritage embedded within these structures. His expertise lies in capturing the essence of historical architecture and integrating it with contemporary design principles. Through Aagaur, he continues to contribute to the preservation of our traditional design legacy while creating meaningful spaces and objects that inspire and engage communities.",
      ],
      image: "/founder.avif",
      role: "Founder & Architect",
      specialty: "Social Architecture & Heritage",
    },
    {
      heading: "POOJA",
      paragraphs: [
        "Pooja, the Co-Founder of Studio Aagaur, is a talented architect. She finds joy in working with waste materials, transforming them into remarkable designs. Pooja's commitment to inclusivity is evident in her dedication to designing for individuals who cannot afford fees. Beyond architecture, she is a fun-loving person adding creativity and grace to life of the studio.",
      ],
      image: "/founder.avif",
      role: "Co-Founder & Architect",
      specialty: "Sustainable Design & Inclusivity",
    },
    {
      heading: "VIBHUTI",
      paragraphs: [
        "Vibhuti works on the artistic side of Aagaur, takes care of Projects and the team flow",
      ],
      image: "/vibhuti.avif",
      role: "Project Manager",
      specialty: "Artistic Direction & Team Management",
    },
    {
      heading: "DEV",
      paragraphs: [
        "Dev is an enthusiastic human that loves to learn new things, whether it's about site or drawings. He's still learning to be an engineer.",
      ],
      image: "/dev.avif",
      role: "Junior Engineer",
      specialty: "Site Management & Technical Drawing",
    },
    {
      heading: "MOHIT",
      paragraphs: ["Mohit manages the Materials for the sites."],
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=face",
      role: "Materials Manager",
      specialty: "Site Materials & Logistics",
    },
  ],
};

export default function Aboutus() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const teamMembers = firstSectionContent.sections.slice(2);

  useEffect(() => {
    if (hoveredCard === null) {
      const timer = setInterval(() => {
        setCurrentTeamIndex((prev) => (prev + 1) % teamMembers.length);
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [teamMembers.length, hoveredCard]);

  const nextTeamMember = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevTeamMember = () => {
    setCurrentTeamIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );
  };

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(0,0,0,0.05),transparent)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.05),transparent)] animate-pulse delay-1000"></div>
      </div>
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center px-8 md:px-16 py-16 min-h-[90vh]">
        {/* Floating dots */}
        <div className="absolute top-20 right-20 w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-1000"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-7xl font-thin mb-8 tracking-[0.3em] text-black">
            {storyContent.hero.title}
          </h1>
          <div className="w-32 h-px bg-gray-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 mb-8 tracking-wide font-light">
            {storyContent.hero.subtitle}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
            {storyContent.hero.description}
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-16 flex items-center gap-4">
          <div className="w-16 h-px bg-gray-400"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-4 h-px bg-gray-500"></div>
        </div>
      </div>
      {/* Story Sections */}
      {storyContent.sections.map((section, index) => {
        const isLeft = section.position === "left";
        const ref = useRef(null);
        const isInView = useInView(ref);

        return (
          <div
            key={index}
            ref={ref}
            className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 min-h-[85vh] gap-8"
          >
            {/* Minimal floating dots */}
            <div className="absolute top-16 right-16 w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-16 left-16 w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-1000"></div>

            {isLeft ? (
              <>
                {/* TEXT BLOCK LEFT */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.5 }}
                  className="w-full md:w-1/2 z-10 group"
                >
                  <div className="mb-8">
                    <span className="inline-block px-4 py-2 text-xs font-medium bg-gray-100 border border-gray-300 rounded-sm text-gray-600 mb-4 tracking-wide">
                      {section.year}
                    </span>
                    <h2 className="text-5xl font-thin mb-6 tracking-[0.3em] text-black">
                      {section.title}
                    </h2>
                    <div className="h-px w-32 bg-gray-400 mb-6"></div>
                  </div>
                  <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                    {section.content.map((p, i) => (
                      <p
                        key={i}
                        className="group-hover:text-black transition-colors duration-500"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="mt-12 flex items-center gap-4">
                    <div className="w-16 h-px bg-gray-400"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-4 h-px bg-gray-500"></div>
                  </div>
                </motion.div>
                {/* IMAGE BLOCK RIGHT */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gray-300/30 rounded-none blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="relative border-2 border-gray-300 p-1 w-96 h-64 bg-white shadow-lg">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 filter brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
                  </div>
                  {/* Floating frame effect */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              </>
            ) : (
              <>
                {/* IMAGE BLOCK LEFT */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gray-300/30 rounded-none blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="relative border-2 border-gray-300 p-1 w-96 h-64 bg-white shadow-lg">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 filter brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
                  </div>
                  {/* Floating frame effect */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
                {/* TEXT BLOCK RIGHT */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className="w-full md:w-1/2 z-10 group"
                >
                  <div className="mb-8">
                    <span className="inline-block px-4 py-2 text-xs font-medium bg-gray-100 border border-gray-300 rounded-sm text-gray-600 mb-4 tracking-wide">
                      {section.year}
                    </span>
                    <h2 className="text-5xl font-thin mb-6 tracking-[0.3em] text-black">
                      {section.title}
                    </h2>
                    <div className="h-px w-32 bg-gray-400 mb-6"></div>
                  </div>
                  <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                    {section.content.map((p, i) => (
                      <p
                        key={i}
                        className="group-hover:text-black transition-colors duration-500"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="mt-12 flex items-center gap-4">
                    <div className="w-16 h-px bg-gray-400"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-4 h-px bg-gray-500"></div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        );
      })}
      {/* First two sections: enhanced left/right layout */}
      {firstSectionContent.sections.slice(0, 2).map((section, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={index}
            className="relative flex flex-col md:flex-row items-center justify-between px-0 md:px-16 py-12 md:py-24 min-h-[85vh] md:min-h-screen gap-12 md:gap-12"
          >
            {/* Minimal floating dots */}
            <div className="absolute top-8 md:top-16 right-8 md:right-16 w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16 w-1 h-1 bg-gray-600 rounded-full animate-pulse delay-1000"></div>

            {isEven ? (
              <>
                {/* TEXT BLOCK LEFT */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full md:w-1/2 z-10 group px-4 md:px-0"
                >
                  <div className="mb-8">
                    <span className="inline-block px-4 py-2 text-xs font-medium bg-gray-900/50 border border-gray-700 rounded-sm text-gray-400 mb-4 tracking-wide">
                      {section.role}
                    </span>
                    <h1 className="text-6xl font-thin mb-6 tracking-[0.3em] text-black">
                      {section.heading}
                    </h1>
                    <div className="h-px w-32 bg-gray-600 mb-6"></div>
                    <p className="text-sm text-gray-500 mb-8 tracking-wide">
                      {section.specialty}
                    </p>
                  </div>
                  <div className="space-y-5 text-sm text-gray-300 leading-relaxed">
                    {section.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="group-hover:text-black transition-colors duration-500 text-black"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="mt-12 flex items-center gap-4">
                    <div className="w-16 h-px bg-gray-600"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-4 h-px bg-gray-700"></div>
                  </div>
                </motion.div>
                {/* IMAGE BLOCK RIGHT */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="relative group w-full px-4 md:px-0"
                >
                  <div className="absolute inset-0 bg-gray-900/20 rounded-none blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="relative border-2 border-gray-300 p-1 w-full max-w-[280px] md:max-w-[384px] h-[24rem] md:h-[32rem] bg-white shadow-2xl mx-auto">
                    <img
                      src={section.image}
                      alt="Portrait"
                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 filter brightness-90 contrast-110"
                    />
                    <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-700"></div>
                  </div>
                  {/* Floating frame effect */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              </>
            ) : (
              <>
                {/* IMAGE BLOCK LEFT */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="relative group w-full px-4 md:px-0"
                >
                  <div className="absolute inset-0 bg-gray-900/20 rounded-none blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="relative border-2 border-gray-300 p-1 w-full max-w-[280px] md:max-w-[384px] h-[24rem] md:h-[32rem] bg-white shadow-2xl mx-auto">
                    <img
                      src={section.image}
                      alt="Portrait"
                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 filter brightness-90 contrast-110"
                    />
                    <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-700"></div>
                  </div>
                  {/* Floating frame effect */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
                {/* TEXT BLOCK RIGHT */}
                <motion.div
                  initial={{ marginRight: 0 }}
                  animate={{ marginRight: 150 }}
                  transition={{ duration: 5 }}
                  className="w-full md:w-1/2 z-10 group"
                >
                  <div className="mb-8">
                    <span className="inline-block px-4 py-2 text-xs font-medium bg-gray-900/50 border border-gray-700 rounded-sm text-gray-400 mb-4 tracking-wide">
                      {section.role}
                    </span>
                    <h1 className="text-6xl font-thin mb-6 tracking-[0.3em] text-black">
                      {section.heading}
                    </h1>
                    <div className="h-px w-32 bg-gray-600 mb-6"></div>
                    <p className="text-sm text-gray-500 mb-8 tracking-wide">
                      {section.specialty}
                    </p>
                  </div>
                  <div className="space-y-5 text-sm text-gray-300 leading-relaxed">
                    {section.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="group-hover:text-black transition-colors duration-500 text-black"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="mt-12 flex items-center gap-4">
                    <div className="w-16 h-px bg-gray-600"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-4 h-px bg-gray-700"></div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        );
      })}
      {/* Team section with carousel */}
      <div className="relative px-4 md:px-16 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-thin tracking-[0.3em] mb-6 text-black">
            OUR TEAM
          </h2>
          <div className="w-32 h-px bg-gray-600 mx-auto"></div>
        </motion.div>

        <div className="relative max-w-[90vw] md:max-w-md mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevTeamMember}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 flex items-center justify-center bg-white/90 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="Previous team member"
          >
            <span className="text-gray-600 text-lg">←</span>
          </button>
          <button
            onClick={nextTeamMember}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 flex items-center justify-center bg-white/90 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="Next team member"
          >
            <span className="text-gray-600 text-lg">→</span>
          </button>

          {/* Progress dots */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {teamMembers.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentTeamIndex
                    ? "bg-gray-600 scale-125"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Team Member Cards */}
          <AnimatePresence mode="wait">
            {teamMembers.map((section, index) => {
              if (index !== currentTeamIndex) return null;
              const ref = useRef(null);
              const isInView = useInView(ref);

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                  }}
                  className="group relative w-full min-h-[500px] md:min-h-[600px] flex items-center"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <div
                      className={`absolute inset-0 bg-gray-900/30 rounded-none blur-xl transform transition-all duration-700 ${
                        hoveredCard === index
                          ? "scale-110 opacity-100"
                          : "scale-100 opacity-0"
                      }`}
                    ></div>

                    <div className="relative bg-white border-2 border-gray-800 p-6 md:p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:border-gray-600">
                      {/* Profile image */}
                      <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img
                          src={section.image}
                          alt="Portrait"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 filter brightness-90 contrast-110"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500"></div>
                      </div>

                      {/* Role badge */}
                      <div className="text-center mb-6">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-900/50 border border-gray-700 rounded-sm text-gray-400 tracking-wide">
                          {section.role}
                        </span>
                      </div>

                      {/* Name */}
                      <h2 className="text-2xl font-thin mb-3 tracking-[0.2em] text-center text-black">
                        {section.heading}
                      </h2>

                      {/* Specialty */}
                      <p className="text-xs text-gray-500 text-center mb-6 tracking-wide">
                        {section.specialty}
                      </p>

                      {/* Separator line */}
                      <div className="w-16 h-px bg-gray-700 mx-auto mb-6"></div>

                      {/* Description */}
                      <div className="space-y-4 text-sm text-gray-300 leading-relaxed text-center">
                        {section.paragraphs.map((p, i) => (
                          <p
                            key={i}
                            className="group-hover:text-black transition-colors duration-500"
                          >
                            {p}
                          </p>
                        ))}
                      </div>

                      {/* Decorative element */}
                      <div className="mt-8 flex justify-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-px bg-gray-700"></div>
                          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                          <div className="w-6 h-px bg-gray-700"></div>
                        </div>
                      </div>

                      {/* Corner accents */}
                      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      {/* Values Section */}
      <div className="relative px-8 md:px-16 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-thin tracking-[0.3em] mb-6 text-black">
            OUR VALUES
          </h2>
          <div className="w-32 h-px bg-gray-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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

                <div className="relative bg-white border border-gray-200 p-8 shadow-sm transform transition-all duration-500 hover:scale-105 hover:border-gray-300 hover:shadow-md">
                  {/* Title */}
                  <h3 className="text-lg font-thin mb-4 tracking-[0.2em] text-black">
                    {value.title}
                  </h3>

                  {/* Separator line */}
                  <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
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
