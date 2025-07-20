import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Holistic design approach",
  "Curated material palettes",
  "Ergonomic space planning",
  "Custom furniture & lighting design",
];

const fadeInUp = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function Interior() {
  const [projects, setProjects] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`/api/projects?category=Interior`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch interior projects:', error);
      }
    };

    fetchProjects();

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const displayedProjects = isMobile && !showAllProjects ? projects.slice(0, 4) : projects;

  return (
    <div className="bg-white min-h-screen text-black overflow-x-hidden">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Playfair+Display:wght@400;500;600&display=swap");

        .hero-bg {
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.15),
              rgba(0, 0, 0, 0.25)
            ),
            url("/interior_hero.png");
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .glass-overlay {
          backdrop-filter: blur(1px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .luxury-font {
          font-family: "Playfair Display", serif;
        }

        .body-font {
          font-family: "Cormorant Garamond", serif;
        }
      `}</style>

      {/* Hero Section */}
      <motion.section
        className="relative w-full min-h-[100vh] sm:min-h-[100vh] flex flex-col items-center justify-center text-center px-2 sm:px-6 md:px-16 hero-bg"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: Math.max(0, 1 - scrollY / 700),
        }}
      >
        {/* Glass Effect Overlay */}
        <div className="absolute inset-0 glass-overlay" />
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
            INTERIOR
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
            Curated Narratives. Soulful Spaces.
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
            At Aagaur Studio, interior design is storytelling. We craft immersive
            environments that reflect identity and inspire emotion, blending
            bespoke details with timeless aesthetics to create spaces that are not
            just lived in, but felt.
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

      {/* Journey Section */}
      <section className="w-full px-4 sm:px-8 md:px-16 py-24 md:py-40 bg-white">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <motion.h2
            className="text-4xl sm:text-6xl md:text-8xl font-normal tracking-[0.12em] mb-12 text-center luxury-font"
            variants={fadeInUp}
          >
            OUR CANVAS
          </motion.h2>
          <motion.div
            className="w-32 h-px bg-black mx-auto mb-20"
            variants={fadeInUp}
          />
          <motion.p
            className="max-w-5xl mx-auto text-xl sm:text-2xl md:text-3xl text-gray-700 font-light mb-24 text-center leading-relaxed body-font"
            variants={fadeInUp}
          >
            Every element, from texture to tone, is chosen with intention. Our
            approach marries natural materials with refined detailing, where
            traditional techniques meet contemporary sensibilities. The result:
            spaces that breathe elegance and inspire well-being.
          </motion.p>
        </motion.div>
      </section>

      {/* Projects Showcase */}
      <section className="w-full px-4 sm:px-8 md:px-16 py-20 bg-gray-50">
        <div className="max-w-8xl mx-auto">
          <motion.h3
            className="text-3xl sm:text-4xl md:text-6xl font-normal tracking-[0.1em] mb-20 text-center luxury-font"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            SELECTED WORKS
          </motion.h3>
          <div
            className={`grid gap-8 md:gap-16 ${
              isMobile
                ? "grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {displayedProjects.map((project, idx) => (
              <motion.div
                key={project._id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: idx * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={!isMobile ? { y: -12 } : {}}
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-6">
                  <motion.img
                    src={project.mainImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-1000"
                    whileHover={!isMobile ? { scale: 1.08 } : {}}
                  />
                  {/* Desktop Hover Overlay */}
                  {!isMobile && (
                    <motion.div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                      <motion.div
                        className="text-white text-center p-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="text-lg font-light mb-6 leading-relaxed body-font">
                          {project.subtitle}
                        </p>
                        <div className="flex items-center justify-center space-x-6 text-sm tracking-[0.1em] luxury-font">
                          <span>{project.year}</span>
                          <span>•</span>
                          <span>{project.location}</span>
                        </div>
                        <Link
                          to={`/project/${project._id}`}
                          className="mt-8 px-8 py-3 rounded-full bg-white/90 text-black luxury-font font-medium tracking-wide shadow transition-all duration-400 hover:bg-white hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/60"
                        >
                          Explore Project
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-2xl font-normal tracking-[0.05em] text-gray-900 luxury-font">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 tracking-[0.08em] body-font">
                    <span>{project.year}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                  </div>
                  {/* Mobile Description */}
                  {isMobile && (
                    <p className="text-gray-600 font-light leading-relaxed mt-4 body-font text-sm">
                      {project.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          {/* View More Button for Mobile */}
          {isMobile && !showAllProjects && projects.length > 4 && (
            <motion.div
              className="flex justify-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setShowAllProjects(true)}
                className="flex items-center space-x-3 px-10 py-4 border border-black text-black font-light tracking-[0.08em] transition-all duration-500 hover:bg-black hover:text-white luxury-font"
              >
                <span>VIEW MORE</span>
                <Plus size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-4 sm:px-8 md:px-16 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            className="text-3xl sm:text-4xl md:text-6xl font-normal tracking-[0.1em] mb-20 text-center luxury-font"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            OUR PHILOSOPHY
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16">
            {features.map((feature, idx) => (
              <motion.div
                key={feature}
                className="text-center py-12 px-8 border border-gray-200 bg-gray-50 transition-all duration-500 hover:bg-white hover:shadow-lg"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: idx * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-xl font-light text-gray-800 leading-relaxed tracking-[0.02em] body-font">
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-8 md:px-16 py-32 md:py-48 flex flex-col items-center text-center bg-black text-white">
        <motion.h3
          className="text-3xl sm:text-5xl md:text-7xl font-normal tracking-[0.1em] mb-12 max-w-6xl leading-tight luxury-font"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          LET'S CRAFT A SPACE THAT TELLS YOUR UNIQUE STORY
        </motion.h3>
        <motion.div
          className="w-24 h-px bg-white mb-16"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true }}
        />
        <motion.a
          href="/contact"
          className="inline-block px-16 py-6 bg-white text-black font-light tracking-[0.15em] transition-all duration-700 text-lg hover:bg-gray-100 luxury-font"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          GET IN TOUCH
        </motion.a>
      </section>
    </div>
  );
}
