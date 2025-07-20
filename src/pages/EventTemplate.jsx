import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const response = await fetch(`${API_BASE}/events/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvent();
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
    if (isTransitioning || !event) return;

    setIsTransitioning(true);
    const allImages = [event.mainImage, ...event.galleryImages];
    setCurrentImage((prev) => {
      const nextIndex =
        direction === "next"
          ? (prev + 1) % allImages.length
          : prev === 0
          ? allImages.length - 1
          : prev - 1;
      return nextIndex;
    });

    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center bg-white text-black">Loading...</div>;
  }

  const allImages = [event.mainImage, ...event.galleryImages];
  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white text-black">
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
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${allImages[currentImage]})`,
            transform: `translate3d(0, ${Math.min(scrollY * 0.3, 0)}px, 0)`,
            backfaceVisibility: "hidden",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Hero Navigation Arrows */}
        <button
          onClick={() => handleImageNavigation("prev")}
          className="absolute left-5 top-1/2 z-20 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-all duration-300 group border border-white/20"
        >
          <svg className="w-6 h-6 text-white/90 transform transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={() => handleImageNavigation("next")}
          className="absolute right-5 top-1/2 z-20 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-all duration-300 group border border-white/20"
        >
          <svg className="w-6 h-6 text-white/90 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end items-start p-8 md:p-16 text-white">
          <motion.h1 
            className="font-cormorant text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {event.title}
          </motion.h1>
          <motion.p 
            className="max-w-3xl text-lg md:text-xl font-light text-white/80 tracking-wider"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            {event.tagline}
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Left Column: Description */}
          <motion.div 
            className="md:col-span-2"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="font-cormorant text-3xl md:text-4xl mb-8 inline-block">
              <span className="relative z-10">About the Event</span>
              <span className="absolute bottom-0 left-0 w-full h-[8px] bg-black/5 -z-10"></span>
            </h2>
            <div className="prose prose-lg max-w-none font-light text-black/80 leading-relaxed tracking-wide text-justify">
              {event.description}
            </div>
          </motion.div>

          {/* Right Column: Details */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="space-y-10">
              <div>
                <h3 className="font-cormorant text-2xl mb-4">Date</h3>
                <p className="font-light text-black/70 text-lg">{eventDate}</p>
              </div>
             
            </div>
          </motion.div>
        </div>

        {/* Image Gallery */}
        {event.galleryImages.length > 0 && (
          <motion.div
            className="mt-24"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="font-cormorant text-3xl md:text-4xl mb-12 text-center">Event Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={image}
                    alt={`${event.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="mt-24 pt-12 border-t border-black/10">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="group flex items-center space-x-2 font-light text-sm tracking-wider uppercase"
            >
              <span className="transform transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span>Back to Home</span>
            </Link>
            <Link
              to="/contact"
              className="group flex items-center space-x-2 font-light text-sm tracking-wider uppercase"
            >
              <span>Get in Touch</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
