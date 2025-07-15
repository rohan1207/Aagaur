import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const storyContent = {
  hero: {
    title: "OUR STORY",
    subtitle: "Where Design Meets Sustainability",
    description: "At Aagaur Studio, we are passionate about sustainable architecture, interior design, and crafting exquisite products that not only elevate spaces but also contribute to a better world. Our commitment to sustainability is at the core of everything we do, guiding our design ethos and business practices."
  },
  sections: [
    {
      title: "OUR VISION",
      year: "FOUNDATION",
      content: [
        "Founded with a vision to redefine the relationship between architecture, design, and sustainability, Aagaur Studio seamlessly integrates eco-conscious principles into every project. From innovative architectural solutions that minimize environmental impact to thoughtfully curated interior designs that harmonize functionality with aesthetics, we strive to create spaces that inspire and endure.",
        "Our approach is rooted in the belief that sustainable design doesn't mean compromising on beauty or functionality. Instead, it's about creating spaces that are both environmentally responsible and aesthetically compelling, ensuring they serve communities for generations to come."
      ],
      image: "https://images.unsplash.com/photo-1518335935020-cda456d81171?w=600&h=400&fit=crop",
      position: "left"
    },
    {
      title: "AAGAUR CRAFTS",
      year: "HERITAGE",
      content: [
        "In addition to our architectural and interior design expertise, Aagaur Studio is also home to Aagaur Crafts, our product design section. Collaborating with skilled artisans from across Madhya Pradesh and India, we celebrate traditional craftsmanship while infusing contemporary sensibilities into our creations.",
        "Each piece from Aagaur Crafts tells a story of heritage, craftsmanship, and sustainability. By working directly with artisans, we not only preserve traditional techniques but also ensure fair compensation and sustainable livelihoods for our craftspeople, creating a positive impact that extends far beyond design."
      ],
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop",
      position: "right"
    },
    {
      title: "OUR TEAM",
      year: "CULTURE",
      content: [
        "What truly sets us apart is our vibrant and dynamic working environment, fueled by a team of passionate creatives who thrive on pushing boundaries and exploring new frontiers in design. We believe in the power of collaboration and creativity to drive meaningful change, and we are constantly seeking innovative ways to make a positive impact through our work.",
        "Join us on our journey as we continue to shape spaces, inspire communities, and champion sustainability one design at a time. Welcome to Aagaur Studio - where design meets sustainability, and creativity knows no bounds."
      ],
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&h=400&fit=crop",
      position: "left"
    }
  ],
  values: [
    {
      title: "SUSTAINABILITY",
      description: "Eco-conscious principles integrated into every project and design decision"
    },
    {
      title: "CRAFTSMANSHIP",
      description: "Celebrating traditional techniques while embracing contemporary sensibilities"
    },
    {
      title: "COLLABORATION",
      description: "Working with skilled artisans across Madhya Pradesh and India"
    },
    {
      title: "INNOVATION",
      description: "Pushing boundaries and exploring new frontiers in sustainable design"
    }
  ]
};

export default function OurStory() {
  const [hoveredValue, setHoveredValue] = useState(null);

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(0,0,0,0.05),transparent)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.05),transparent)] animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center px-8 md:px-16 py-32 min-h-screen">
        {/* Floating dots */}
        <div className="absolute top-20 right-20 w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-1000"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center max-w-4xl"
        >
          <span className="inline-block px-4 py-2 text-xs font-medium bg-gray-100 border border-gray-300 rounded-sm text-gray-600 mb-8 tracking-wide">
            STUDIO AAGAUR
          </span>
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
        const isLeft = section.position === 'left';
        const ref = useRef(null);
        const isInView = useInView(ref);

        return (
          <div
            key={index}
            ref={ref}
            className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-24 min-h-screen gap-12"
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
                      <p key={i} className="group-hover:text-black transition-colors duration-500">
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
                      <p key={i} className="group-hover:text-black transition-colors duration-500">
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
                <div className={`absolute inset-0 bg-gray-200/50 rounded-none blur-xl transform transition-all duration-700 ${
                  hoveredValue === index ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
                }`}></div>
                
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

      {/* Footer section */}
      <div className="relative px-8 md:px-16 py-16">
        <div className="text-center">
          <div className="w-full h-px bg-gray-300 mb-8"></div>
          <p className="text-sm text-gray-500 tracking-[0.2em]">STUDIO AAGAUR</p>
          <p className="text-xs text-gray-400 mt-2">Sustainable Design · Traditional Craftsmanship · Creative Innovation</p>
        </div>
      </div>
    </div>
  );
}
