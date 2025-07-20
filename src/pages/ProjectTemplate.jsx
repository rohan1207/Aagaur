import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const response = await fetch(`${API_BASE}/projects/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    let rafId;
    let lastScrollY = 0;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const easedScrollY = lastScrollY + (currentScrollY - lastScrollY) * 0.3;
        const constrainedScrollY = Math.max(0, easedScrollY);
        setScrollY(constrainedScrollY);
        lastScrollY = constrainedScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleImageNavigation = (direction) => {
    if (isTransitioning || !project) return;

    setIsTransitioning(true);
    setCurrentImage((prev) => {
      const nextIndex =
        direction === "next"
          ? (prev + 1) % project.galleryImages.length
          : prev === 0
          ? project.galleryImages.length - 1
          : prev - 1;
      return nextIndex;
    });

    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const allImages = [project.mainImage, ...project.galleryImages];

  const keyFeatures = Array.isArray(project?.keyFeatures) ? project.keyFeatures : [];
  const materialsUsed = Array.isArray(project?.materialsUsed) ? project.materialsUsed : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <motion.div
        className="relative h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          key={currentImage}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${allImages[currentImage]})`,
            transform: `translate3d(0, ${Math.min(scrollY * 0.3, 0)}px, 0)`,
            backfaceVisibility: "hidden",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Hero Navigation Arrows */}
        <button
          onClick={() => handleImageNavigation("prev")}
          className="absolute left-5 top-1/2 z-30 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-all duration-300 group border border-white/10"
          disabled={isTransitioning}
          aria-label="Previous image"
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
          onClick={() => handleImageNavigation("next")}
          className="absolute right-5 top-1/2 z-30 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-all duration-300 group border border-white/10"
          disabled={isTransitioning}
          aria-label="Next image"
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

        {/* Image Counter */}
        <div className="absolute bottom-8 right-8 z-30 text-white/80 font-light text-sm tracking-wider">
          <span className="text-white/90">{currentImage + 1}</span>
          <span className="mx-2">/</span>
          <span>{allImages.length}</span>
        </div>

        {/* Project Title Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-24">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-cormorant mb-4">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light tracking-wide mb-6">
              {project.subtitle}
            </p>
         
          </motion.div>
        </div>
      </motion.div>

      {/* Project Details */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          {/* Left Column - Project Info */}
          <motion.div
            className="md:col-span-2"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              staggerChildren: 0.2,
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-cormorant text-3xl mb-8">Project Overview</h2>
            <p className="text-black/70 font-light leading-relaxed mb-12 text-justify">
              {project.description}
            </p>

            {/* Quote */}
            {project.quote && project.quote.text && (
              <div className="border-l-2 border-black/10 pl-6 my-12">
                <p className="text-xl font-light italic text-black/80 mb-4">
                  "{project.quote.text}"
                </p>
                <p className="text-sm text-black/60">
                  — {project.quote.author}
                </p>
              </div>
            )}
          </motion.div>

          {/* Right Column - Project Details */}
          <motion.div
            className="grid grid-cols-2 gap-x-8 gap-y-6 sm:gap-x-12 md:gap-x-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="border-l border-black/10 pl-4">
              <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-1">
                Location
              </h3>
              <p className="font-light text-sm sm:text-base">
                {project.location}
              </p>
            </div>
            <div className="border-l border-black/10 pl-4">
              <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-1">
                Project Type
              </h3>
              <p className="font-light text-sm sm:text-base">
                {project.projectType}
              </p>
            </div>
            <div className="border-l border-black/10 pl-4">
              <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-1">
                Status
              </h3>
              <p className="font-light text-sm sm:text-base">
                {project.status}
              </p>
            </div>
            <div className="border-l border-black/10 pl-4">
              <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-1">
                Year
              </h3>
              <p className="font-light text-sm sm:text-base">
                {project.year}
              </p>
            </div>
            <div className="border-l border-black/10 pl-4">
              <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-1">
                Area
              </h3>
              <p className="font-light text-sm sm:text-base">
                {project.area.value} {project.area.unit}
              </p>
            </div>
            <div className="border-l border-black/10 pl-4">
              <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-1">
                Client
              </h3>
              <p className="font-light text-sm sm:text-base">
                {project.client}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features & Materials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-24">
          {/* Key Features */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h2 className="font-cormorant text-2xl md:text-3xl mb-8">Key Features</h2>
            <ul className="space-y-4">
              {Array.isArray(keyFeatures) && keyFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-4 font-light text-black/70 text-sm sm:text-base group"
                >
                  <span className="text-black/20 font-cormorant text-lg transform group-hover:scale-110 transition-transform">
                    →
                  </span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Materials Used */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="font-cormorant text-2xl md:text-3xl mb-8">Materials</h2>
            <ul className="space-y-4">
              {Array.isArray(materialsUsed) && materialsUsed.map((material, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-4 font-light text-black/70 text-sm sm:text-base group"
                >
                  <span className="text-black/20 font-cormorant text-lg transform group-hover:scale-110 transition-transform">
                    →
                  </span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    {material}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Image Gallery */}
        <motion.div
          className="mt-24"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl mb-12">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-w-4 aspect-h-3 overflow-hidden group cursor-pointer"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-24 pt-12 border-t border-black/10">
          <div className="flex justify-between items-center">
            <Link
              to="/home"
              className="group flex items-center space-x-2 font-light text-sm tracking-wider"
            >
              <span className="transform transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              <span>Back to Projects</span>
            </Link>
            <Link
              to="/contact"
              className="group flex items-center space-x-2 font-light text-sm tracking-wider"
            >
              <span>Start Your Project</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
