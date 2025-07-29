import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const Footer = () => {
  const links = [
    { name: "Projects", path: "/projects/architecture" },
    { name: "Films", path: "/films" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
    { name: "Events", path: "/projects/events" },
  ];

  const staggerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
             {/* Logo and Text */}
                     <Link to="/" className="flex items-center space-x-4 group">
                       <img
                         src="/black.png"
                         alt="Aagaur Logo"
                         className="h-[65px] w-[65px] transition-all duration-700 transform hover:scale-105"
                       />
                       <span className="font-cormorant text-[26px] tracking-[0.2em] font-light text-black">
                         AAGAUR
                       </span>
                     </Link>
            <p className="text-neutral-600 font-light text-sm leading-relaxed">
              Crafting spaces that inspire, designing experiences that endure.
              We transform visions into architectural masterpieces.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={staggerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-sm font-light tracking-[0.2em] uppercase text-neutral-400">
              Navigation
            </h3>
            <motion.div className="grid grid-cols-2 gap-4">
              {links.map((link) => (
                <motion.div key={link.name} variants={itemAnimation}>
                  <Link
                    to={link.path}
                    className="text-neutral-600 hover:text-black transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={staggerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-sm font-light tracking-[0.2em] uppercase text-neutral-400">
              Contact
            </h3>
            <div className="space-y-4">
              <motion.div variants={itemAnimation} className="space-y-2">
                <p className="text-neutral-600 font-light">Call</p>
                <a
                  href="tel:+917554505399"
                  className="block text-neutral-800 hover:text-black transition-colors duration-300"
                >
                  +917554505399
                </a>
               
              </motion.div>
              <motion.div variants={itemAnimation} className="space-y-2">
                <p className="text-neutral-600 font-light">Email</p>
                <a
                  href="mailto:aagaur.studio@gmail.com"
                  className="text-neutral-800 hover:text-black transition-colors duration-300"
                >
                  aagaur.studio@gmail.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500"
        >
          <p className="font-light">
            © {new Date().getFullYear()} AAGAUR Studio. All rights reserved.
          </p>
          <p className="font-light text-neutral-500">
            Designed & Developed By Markitects
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="hover:text-black transition-colors duration-300 font-light"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-black transition-colors duration-300 font-light"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
