import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const demoProject = {
  title: "Horizon Villa",
  subtitle: "A seamless blend of nature and design",
  location: "Lonavala, Maharashtra",
  projectType: "Farmhouse",
  status: "Completed",
  year: 2023,
  area: {
    value: 4500,
    unit: "sq.ft.",
  },
  client: "Mr. & Mrs. Mehta",
  description: `Nestled in the lush hills of Lonavala, Horizon Villa is a weekend retreat designed to harmonize with its natural surroundings. This contemporary farmhouse features an open-plan layout, floor-to-ceiling glass walls, and sustainable materials that provide both luxury and environmental consciousness. The project highlights our expertise in creating immersive, nature-integrated spaces.`,
  keyFeatures: [
    "Infinity pool overlooking the valley",
    "Double-height living space",
    "Rainwater harvesting system",
    "Skylight integrated bathrooms",
  ],
  materialsUsed: [
    "Exposed concrete",
    "Local basalt stone",
    "Reclaimed teak wood",
    "Solar glass panels",
  ],
  images: [
    "/proj3.jpg",
    "/proj1.jpg",
    "/proj2.jpg",

    "/proj4.jpg",
    "/proj5.jpg",
    "/proj6.jpg",
  ],
  video: {
    url: "",
    publicId: "",
    thumbnailUrl: "",
  },
  quote: {
    text: "Architecture should speak of its time and place, but yearn for timelessness.",
    author: "Tapas Upadhyay",
  },
  tags: ["farmhouse", "sustainable", "luxury", "nature"],
  slug: "horizon-villa",
};

const Project = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let rafId;
    let lastScrollY = 0;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        // Apply easing to the scroll value with faster response
        const easedScrollY = lastScrollY + (currentScrollY - lastScrollY) * 0.3;
        // Constrain the scroll value to prevent overshooting at the top
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
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentImage((prev) => {
      const nextIndex =
        direction === "next"
          ? (prev + 1) % demoProject.images.length
          : prev === 0
          ? demoProject.images.length - 1
          : prev - 1;
      return nextIndex;
    });

    setTimeout(() => setIsTransitioning(false), 500);
  };

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
            backgroundImage: `url(${demoProject.images[currentImage]})`,
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
          <span>{demoProject.images.length}</span>
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
              {demoProject.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light tracking-wide mb-6">
              {demoProject.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {demoProject.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-light tracking-wider rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
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
            <p className="text-black/70 font-light leading-relaxed mb-12">
              {demoProject.description}
            </p>

            {/* Quote */}
            <div className="border-l-2 border-black/10 pl-6 my-12">
              <p className="text-xl font-light italic text-black/80 mb-4">
                "{demoProject.quote.text}"
              </p>
              <p className="text-sm text-black/60">
                — {demoProject.quote.author}
              </p>
            </div>
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
                {demoProject.location}
              </p>
            </div>
            <div className="border-l border-black/10 pl-4">
              <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-1">
                Project Type
              </h3>
              <p className="font-light text-sm sm:text-base">
                {demoProject.projectType}
              </p>
            </div>
            <div className="border-l border-black/10 pl-4">
              <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-1">
                Status
              </h3>
              <p className="font-light text-sm sm:text-base">
                {demoProject.status}
              </p>
            </div>
            <div className="border-l border-black/10 pl-4">
              <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-1">
                Year
              </h3>
              <p className="font-light text-sm sm:text-base">
                {demoProject.year}
              </p>
            </div>
            <div className="border-l border-black/10 pl-4">
              <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-1">
                Area
              </h3>
              <p className="font-light text-sm sm:text-base">
                {demoProject.area.value} {demoProject.area.unit}
              </p>
            </div>
            <div className="border-l border-black/10 pl-4">
              <h3 className="text-xs text-black/40 uppercase tracking-[0.2em] mb-1">
                Client
              </h3>
              <p className="font-light text-sm sm:text-base">
                {demoProject.client}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features & Materials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-24 mt-24 bg-gray-50/50 p-8 sm:p-12 md:p-16 rounded-xl">
          {/* Key Features */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="font-cormorant text-2xl md:text-3xl mb-8 inline-block">
              <span className="relative z-10">Key Features</span>
              <span className="absolute bottom-0 left-0 w-full h-[6px] bg-black/5 -z-10"></span>
            </h2>
            <ul className="space-y-4">
              {demoProject.keyFeatures.map((feature, index) => (
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
            <h2 className="font-cormorant text-2xl md:text-3xl mb-8 inline-block">
              <span className="relative z-10">Materials</span>
              <span className="absolute bottom-0 left-0 w-full h-[6px] bg-black/5 -z-10"></span>
            </h2>
            <ul className="space-y-4">
              {demoProject.materialsUsed.map((material, index) => (
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
          viewport={{ once: true }}
        >
          <h2 className="font-cormorant text-3xl mb-12">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoProject.images.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-w-4 aspect-h-3 overflow-hidden group cursor-pointer"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image}
                  alt={`${demoProject.title} - Image ${index + 1}`}
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

export default Project;
