import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SustainableVision from "./SustainableVision";

const dummyProjects = [
  {
    id: 1,
    title: "Ethereal Residence",
    location: "Beverly Hills",
    year: "2025",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80",
    description: "A harmonious blend of light and shadow",
  },
  {
    id: 2,
    title: "Azure Heights",
    location: "Manhattan",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80",
    description: "Vertical elegance reaching for the sky",
  },
  {
    id: 3,
    title: "The Luminary",
    location: "Dubai",
    year: "2025",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80",
    description: "Where luxury meets innovation",
  },
];

const dummyEvents = [
  {
    id: 1,
    title: "Design Excellence",
    date: "August 15, 2025",
    image: "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80",
    description: "A celebration of architectural brilliance",
  },
  {
    id: 2,
    title: "Future Living Expo",
    date: "September 20, 2025",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80",
    description: "Exploring tomorrow's living spaces",
  },
  {
    id: 3,
    title: "Sustainable Luxury",
    date: "October 10, 2025",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80",
    description: "Where eco-conscious meets opulence",
  },
];

const Hero = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [hoveredSection, setHoveredSection] = useState(null);
  const projectsInterval = useRef(null);
  const eventsInterval = useRef(null);

  const projectsControls = useAnimation();
  const eventsControls = useAnimation();

  // Function to handle auto-sliding
  const startAutoSlide = (type) => {
    if (type === "projects") {
      projectsInterval.current = setInterval(() => {
        if (hoveredSection !== "events") {
          setCurrentProject((prev) => (prev + 1) % dummyProjects.length);
        }
      }, 5000);
    } else {
      eventsInterval.current = setInterval(() => {
        if (hoveredSection !== "projects") {
          setCurrentEvent((prev) => (prev + 1) % dummyEvents.length);
        }
      }, 5000);
    }
  };

  // Start auto-sliding on mount
  useEffect(() => {
    startAutoSlide("projects");
    startAutoSlide("events");
    return () => {
      clearInterval(projectsInterval.current);
      clearInterval(eventsInterval.current);
    };
  }, [hoveredSection]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Split Screen Container */}
      <div className="flex flex-col md:flex-row h-screen">
        {/* Projects Section */}
        <motion.div
          className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden"
          onHoverStart={() => setHoveredSection("projects")}
          onHoverEnd={() => setHoveredSection(null)}
          animate={projectsControls}
        >
          {/* Background Image */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center transform"
            style={{
              backgroundImage: `url(${dummyProjects[currentProject].image})`,
            }}
            initial={{ scale: 1 }}
            animate={{
              scale: hoveredSection === "projects" ? 1.05 : 1,
              filter:
                hoveredSection === "events"
                  ? "grayscale(0.5) blur(5px)"
                  : "grayscale(0) blur(0px)",
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Content */}
          <motion.div
            className="absolute bottom-0 left-0 p-8 md:p-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-light mb-2">
              {dummyProjects[currentProject].title}
            </h2>
            <div className="flex items-center space-x-4 text-sm md:text-base text-white/80 mb-4">
              <span>{dummyProjects[currentProject].location}</span>
              <span className="w-1 h-1 bg-white/80 rounded-full" />
              <span>{dummyProjects[currentProject].year}</span>
            </div>
            <p className="text-white/60 text-sm md:text-base max-w-md">
              {dummyProjects[currentProject].description}
            </p>
          </motion.div>

          {/* Progress Dots */}
          <div className="absolute bottom-8 right-8 flex space-x-2">
            {dummyProjects.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentProject ? "bg-white" : "bg-white/30"
                }`}
                whileHover={{ scale: 1.5 }}
                onClick={() => setCurrentProject(index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Events Section */}
        <motion.div
          className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden"
          onHoverStart={() => setHoveredSection("events")}
          onHoverEnd={() => setHoveredSection(null)}
          animate={eventsControls}
        >
          {/* Background Image */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center transform"
            style={{
              backgroundImage: `url(${dummyEvents[currentEvent].image})`,
            }}
            initial={{ scale: 1 }}
            animate={{
              scale: hoveredSection === "events" ? 1.05 : 1,
              filter:
                hoveredSection === "projects"
                  ? "grayscale(0.5) blur(5px)"
                  : "grayscale(0) blur(0px)",
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Overlay */}

          {/* Content */}
          <motion.div
            className="absolute bottom-0 left-0 p-8 md:p-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-light mb-2">
              {dummyEvents[currentEvent].title}
            </h2>
            <div className="text-sm md:text-base text-white/80 mb-4">
              {dummyEvents[currentEvent].date}
            </div>
            <p className="text-white/60 text-sm md:text-base max-w-md">
              {dummyEvents[currentEvent].description}
            </p>
          </motion.div>

          {/* Progress Dots */}
          <div className="absolute bottom-8 right-8 flex space-x-2">
            {dummyEvents.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentEvent ? "bg-white" : "bg-white/30"
                }`}
                whileHover={{ scale: 1.5 }}
                onClick={() => setCurrentEvent(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Central Divider Line */}
      <motion.div
        className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1px] h-[30vh] bg-white/20"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <SustainableVision />
    </div>
  );
};

export default Hero;
