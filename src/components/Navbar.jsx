import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import landingLogo from "/landing_logo.png";

const Navbar = ({ isVisible, heroTextRef }) => {
  const { scrollY } = useScroll();
  const navRef = useRef();

  const textOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const textX = useTransform(scrollY, [0, 100], [100, 0]);

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 py-4 px-8"
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
      animate={{
        backgroundColor: isVisible
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(255, 255, 255, 0)",
        backdropFilter: isVisible ? "blur(10px)" : "blur(0px)",
      }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={landingLogo} alt="Aagaur Studio" className="h-12 w-auto" />
          <motion.span
            style={{ opacity: textOpacity, x: textX }}
            className="text-2xl font-cormorant text-gray-800"
          >
            Aagaur
          </motion.span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
