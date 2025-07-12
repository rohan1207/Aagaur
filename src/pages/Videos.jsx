import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Videos = () => {
  // Sample video data - Replace with actual YouTube video IDs
  const videos = [
    {
      id: "1",
      title: "The Urban Farm Residence – Architecture Walkthrough",
      category: "architecture",
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/LgY19Grg1PE?si=fgVsy3nM020Ro7y5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    },
    {
      id: "2",
      title: "Design Event Highlights – Architecture Fest 2023",
      category: "event",
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/UX9mJD6aiB0?si=BdbPAGC_utcTmEgr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    },
    {
      id: "3",
      title: "Annual Architectural Awards Night",
      category: "event",
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/diEZRS9o4Lw?si=14M2chiJIZJZ2IA8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    },
    {
      id: "4",
      title: "Interior Design Showcase – Modern Living",
      category: "interior",
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/2U63XSeE11E?si=z_D50RUUge6vxSf5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    },
  ];

  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Featured video is the first one since we don't have dates
  const featuredVideo = videos[0];
  const categories = ["all", "architecture", "interior", "event", "commercial"];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    setTimeout(() => setLoading(false), 1000);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredVideos = videos.filter(
    (video) => selectedCategory === "all" || video.category === selectedCategory
  );

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
    if (isMobile) {
      const timer = setInterval(nextVideo, 5000);
      return () => clearInterval(timer);
    }
  }, [isMobile, currentIndex]);

  const extractVideoUrl = (iframeString) => {
    const srcMatch = iframeString.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : "";
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-20"
                >
                  <h2 className="text-xl font-light mb-6 tracking-wide">
                    Latest Release
                  </h2>
                  <div className="aspect-video w-full max-w-5xl mx-auto bg-neutral-100 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={extractVideoUrl(featuredVideo.iframe)}
                      title={featuredVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>

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
                        <motion.div
                          key={filteredVideos[currentIndex]?.id}
                          className="aspect-video bg-neutral-100 rounded-lg overflow-hidden shadow-md"
                        >
                          <iframe
                            src={extractVideoUrl(
                              filteredVideos[currentIndex]?.iframe
                            )}
                            title={filteredVideos[currentIndex]?.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </motion.div>
                      ) : (
                        filteredVideos.slice(0, 6).map((video) => (
                          <motion.div
                            key={video.id}
                            className="group relative aspect-video bg-neutral-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                            onHoverStart={() => setHoveredVideo(video.id)}
                            onHoverEnd={() => setHoveredVideo(null)}
                          >
                            <iframe
                              src={extractVideoUrl(video.iframe)}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                            <motion.div
                              initial={false}
                              animate={{
                                opacity: hoveredVideo === video.id ? 1 : 0,
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
