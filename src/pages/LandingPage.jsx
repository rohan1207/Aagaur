import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import landingLogo from "/landing_logo.png";

const LandingPage = () => {
  const [showBlackLogo, setShowBlackLogo] = useState(false);
  const [showWhiteBackground, setShowWhiteBackground] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasTriggeredMidpoint, setHasTriggeredMidpoint] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleVideoTimeUpdate = () => {
    if (videoRef.current && !hasTriggeredMidpoint) {
      const video = videoRef.current;
      const currentTime = video.currentTime;
      const duration = video.duration;

      // Check if we're at the midpoint (with a small buffer for precision)
      if (currentTime >= duration / 2 && !hasTriggeredMidpoint) {
        setShowBlackLogo(true);
        setHasTriggeredMidpoint(true);
      }
    }
  };

  const handleVideoEnd = () => {
    // First fade in the black logo smoothly
    setShowBlackLogo(true);
    // Wait 2 seconds, then start navigation transition
    setTimeout(() => {
      setIsNavigating(true);
      setTimeout(() => {
        navigate("/home");
      }, 800); // Give enough time for fade out
    }, 2000);
  };

  return (
    <motion.div
      className="relative w-screen h-screen overflow-hidden"
      animate={{
        opacity: isNavigating ? 0 : 1,
      }}
      transition={{
        duration: 0.8,
        ease: "cubic-bezier(0.65, 0, 0.35, 1)",
      }}
    >
      {/* Video Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          opacity: showWhiteBackground ? 0 : 1,
        }}
        transition={{ duration: 1 }}
      >
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          style={{ filter: "contrast(1.1) brightness(1.1)" }}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleVideoTimeUpdate}
          onEnded={handleVideoEnd}
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* White Background that appears after video */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{
          opacity: showWhiteBackground ? 1 : 0,
        }}
        transition={{ duration: 1 }}
      />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Logo Container */}
        <motion.div
          className="relative w-64 h-64 flex items-center justify-center"
          style={{ zIndex: 10 }}
        >
          {/* White Logo (visible during video) */}
          <motion.img
            src={landingLogo}
            alt="Aagaur Studio"
            className="absolute inset-0 w-full h-full object-contain"
            initial={{ opacity: 1 }}
            animate={{ opacity: showBlackLogo ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Black Logo (visible after video) */}
          <motion.img
            src={landingLogo.replace(".png", "-black.png")}
            alt="Aagaur Studio"
            className="absolute inset-0 w-full h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: showBlackLogo ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
