import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Videos = () => {
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  const [videos, setVideos] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const featuredRef = useRef(null);

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${API_BASE}/videos`);
        const data = await res.json();
        setVideos(data);
        if (data.length > 0) {
          setFeaturedVideo(data[0]); // Set the latest video as featured by default
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [API_BASE]);


  const categories = React.useMemo(() => {
    const cats = new Set(videos.map(v => v.category?.toLowerCase()));
    return ['all', ...Array.from(cats)];
  }, [videos]);

  const filteredVideos = videos.filter(
    (video) => selectedCategory === 'all' || video.category?.toLowerCase() === selectedCategory
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    // Remove the duplicate setTimeout that was overriding the API loading
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextVideo = () => {
    setCurrentIndex((prev) =>
      prev === filteredVideos.length - 1 ? 0 : prev + 1
    );
  };

  const prevVideo = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredVideos.length - 1 : prev - 1
    );
  };

  // Auto slide for mobile
  useEffect(() => {
    if (isMobile && filteredVideos.length > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, filteredVideos.length]);

  const extractVideoUrl = (iframeString) => {
    if (!iframeString) return "";
    const srcMatch = iframeString.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : "";
  };

  const getVideoThumbnail = (iframeString) => {
    const videoUrl = extractVideoUrl(iframeString);
    if (!videoUrl) return '';
    const videoIdMatch = videoUrl.match(/embed\/([\w-]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://img.youtube.com/vi/${videoIdMatch[1]}/mqdefault.jpg`;
    }
    return ''; // Return a fallback image or empty string
  };

  const handleThumbnailClick = (video) => {
    setFeaturedVideo(video);
    // Scroll so the featured video is visible
    setTimeout(() => {
      if (featuredRef.current) {
        featuredRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-y-auto">
      <div className="absolute inset-0 bg-white">
        <div className="h-full w-full overflow-y-auto">
          <div className="px-4 md:px-8 py-24 pt-32">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wider">
                Visual Stories
              </h1>
              <p className="text-neutral-600 text-sm md:text-base max-w-2xl mx-auto">
                Immerse yourself in our architectural narratives
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-2 border-neutral-200 rounded-full animate-spin border-t-neutral-900"></div>
              </div>
            ) : (
              <div className="space-y-16">
                {/* Featured Video Section */}
                {featuredVideo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-20"
                  >
                    
                    <div ref={featuredRef} className="aspect-video w-full max-w-5xl mx-auto bg-neutral-100 rounded-lg overflow-hidden shadow-lg">
                      <iframe
                        src={`${extractVideoUrl(featuredVideo?.url || '')}?autoplay=1`}
                        title={featuredVideo?.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </motion.div>
                )}

                {/* Category Filter */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-20 py-4 -mx-4 px-4 md:-mx-8 md:px-8">
                  <div className="flex justify-center gap-4 overflow-x-auto pb-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 text-sm tracking-wide transition-all whitespace-nowrap ${
                          selectedCategory === category
                            ? "bg-neutral-900 text-white"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        } rounded-full`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Videos Gallery */}
                <div className="relative max-w-6xl mx-auto pb-16">
                  {/* Videos Grid/Carousel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`grid ${
                        isMobile ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3"
                      } gap-6 md:gap-8`}
                    >
                      {isMobile ? (
                        // Mobile: Single video carousel
                        filteredVideos.length > 0 && (
                          <motion.div
                            key={filteredVideos[currentIndex]?.id || filteredVideos[currentIndex]?._id}
                            className="aspect-video bg-neutral-100 rounded-lg overflow-hidden shadow-md"
                          >
                            <iframe
                              src={extractVideoUrl(
                                filteredVideos[currentIndex]?.url
                              )}
                              title={filteredVideos[currentIndex]?.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          </motion.div>
                        )
                      ) : (
                        // Desktop: Grid of all videos
                        filteredVideos.map((video) => (
                          <motion.div
                            key={video._id || video.id}
                            className="group relative aspect-video bg-neutral-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                            onHoverStart={() => setHoveredVideo(video._id || video.id)}
                            onHoverEnd={() => setHoveredVideo(null)}
                            onClick={() => handleThumbnailClick(video)}
                          >
                            <div className="relative w-full h-full group cursor-pointer bg-black">
                              <img 
                                src={getVideoThumbnail(video.url)} 
                                alt={video.title} 
                                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                            </div>
                            <motion.div
                              initial={false}
                              animate={{
                                opacity: hoveredVideo === (video._id || video.id) ? 1 : 0,
                              }}
                              className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4"
                            >
                              <h3 className="text-white text-lg font-light tracking-wide">
                                {video.title}
                              </h3>
                            </motion.div>
                          </motion.div>
                        ))
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;