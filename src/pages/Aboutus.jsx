import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const firstSectionContent = {
  sections: [
    {
      heading: "TAPAS",
      paragraphs: [
        "Tapas is an esteemed Architect, Musician and the founder director of Studio Aagaur. With a strong focus on social architecture, he has been actively engaged in various projects that celebrate historical buildings and settlements. His work goes beyond mere design, as he is deeply committed to documenting and showcasing the rich cultural heritage embedded within these structures. His expertise lies in capturing the essence of historical architecture and integrating it with contemporary design principles. Through Aagaur, he continues to contribute to the preservation of our traditional design legacy while creating meaningful spaces and objects that inspire and engage communities.",
      ],
      image: "/EM.jpg",
      role: "Founder & Architect",
      specialty: "Social Architecture & Heritage",
    },
    {
      heading: "POOJA",
      paragraphs: [
        "Pooja, the Co-Founder of Studio Aagaur, is a talented architect. She finds joy in working with waste materials, transforming them into remarkable designs. Pooja's commitment to inclusivity is evident in her dedication to designing for individuals who cannot afford fees. Beyond architecture, she is a fun-loving person adding creativity and grace to life of the studio.",
      ],
      image: "/EM.jpg",
      role: "Co-Founder & Architect",
      specialty: "Sustainable Design & Inclusivity",
    },
    {
      heading: "VIBHUTI",
      paragraphs: [
        "Vibhuti works on the artistic side of Aagaur, takes care of Projects and the team flow",
      ],
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
      role: "Project Manager",
      specialty: "Artistic Direction & Team Management",
    },
    {
      heading: "DEV",
      paragraphs: [
        "Dev is an enthusiastic human that loves to learn new things, whether it's about site or drawings. He's still learning to be an engineer.",
      ],
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face",
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

export default function AboutUs() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Subtle dark texture overlay */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(40,40,40,0.1),transparent)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(40,40,40,0.1),transparent)] animate-pulse delay-1000"></div>
      </div>
      {/* First two sections: enhanced left/right layout */}
      {firstSectionContent.sections.slice(0, 2).map((section, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={index}
            className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-24 min-h-screen gap-12"
          >
            {/* Minimal floating dots */}
            <div className="absolute top-16 right-16 w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-16 left-16 w-1 h-1 bg-gray-600 rounded-full animate-pulse delay-1000"></div>

            {isEven ? (
              <>
                {/* TEXT BLOCK LEFT */}
                <motion.div
                  initial={{ marginLeft: 0 }}
                  animate={{ marginLeft: 120 }}
                  transition={{ duration: 3 }}
                  className="w-full md:w-1/2 z-10 group"
                >
                  <div className="mb-8">
                    <span className="inline-block px-4 py-2 text-xs font-medium bg-gray-900/50 border border-gray-700 rounded-sm text-gray-400 mb-4 tracking-wide">
                      {section.role}
                    </span>
                    <h1 className="text-6xl font-thin mb-6 tracking-[0.3em] text-white">
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
                        className="group-hover:text-white transition-colors duration-500"
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
                  initial={{ marginRight: 0 }}
                  animate={{ marginRight: 200 }}
                  transition={{ duration: 3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gray-900/20 rounded-none blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="relative border-2 border-gray-700 p-1 w-96 h-[32rem] bg-black shadow-2xl">
                    <img
                      src={section.image}
                      alt="Portrait"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 filter brightness-90 contrast-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
                  </div>
                  {/* Floating frame effect */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              </>
            ) : (
              <>
                {/* IMAGE BLOCK LEFT */}
                <motion.div
                  initial={{ marginLeft: 0 }}
                  animate={{ marginLeft: 100 }}
                  transition={{ duration: 5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gray-900/20 rounded-none blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="relative border-2 border-gray-700 p-1 w-96 h-[32rem] bg-black shadow-2xl">
                    <img
                      src={section.image}
                      alt="Portrait"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 filter brightness-90 contrast-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
                  </div>
                  {/* Floating frame effect */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                    <h1 className="text-6xl font-thin mb-6 tracking-[0.3em] text-white">
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
                        className="group-hover:text-white transition-colors duration-500"
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
      {/* Remaining sections: enhanced three-column grid */}
      <div className="relative px-8 md:px-16 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-thin tracking-[0.3em] mb-6 text-white">
            TEAM
          </h2>
          <div className="w-32 h-px bg-gray-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {firstSectionContent.sections.slice(2).map((section, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref);

            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, marginTop: 50 }}
                animate={isInView ? { opacity: 1, marginTop: 0 } : {}}
                transition={{ duration: 5 }}
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Subtle hover glow */}
                <div
                  className={`absolute inset-0 bg-gray-900/30 rounded-none blur-xl transform transition-all duration-700 ${
                    hoveredCard === index
                      ? "scale-110 opacity-100"
                      : "scale-100 opacity-0"
                  }`}
                ></div>

                <div className="relative bg-black border-2 border-gray-800 p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:border-gray-600">
                  {/* Profile image */}
                  <div className="relative w-36 h-36 mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
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
                  <h2 className="text-2xl font-thin mb-3 tracking-[0.2em] text-center text-white">
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
                        className="group-hover:text-white transition-colors duration-500"
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
            );
          })}
        </div>
      </div>
      {/* Footer section */}
      <div className="relative px-8 md:px-16 py-16">
        <div className="text-center">
          <div className="w-full h-px bg-gray-800 mb-8"></div>
          <p className="text-sm text-gray-500 tracking-[0.2em]">
            STUDIO AAGAUR
          </p>
        </div>
      </div>
         
    </div>
  );
}
