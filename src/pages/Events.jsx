import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Clock } from 'lucide-react';

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'sustainable-architecture', name: 'Sustainable Architecture' },
    { id: 'workshop', name: 'Workshop' },
    { id: 'construction', name: 'Construction' },
    { id: 'events', name: 'Events' }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      setEventsError('');
      try {
        const res = await fetch(`${API_BASE}/events`);
        if (!res.ok) throw new Error('Failed to load events');
        const data = await res.json();
        
        // Sort: upcoming events first, then by date
        const today = new Date();
        data.sort((a, b) => {
          const aUpcoming = new Date(a.date) > today;
          const bUpcoming = new Date(b.date) > today;
          if (aUpcoming === bUpcoming) {
            return new Date(b.date) - new Date(a.date);
          }
          return aUpcoming ? -1 : 1;
        });
        
        setEvents(data);
      } catch (err) {
        setEventsError(err.message);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.key]);

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => {
        if (!event.categories || !Array.isArray(event.categories)) return false;
        // Check if any category in the event matches the selected category
        return event.categories.some(cat => 
          cat.toLowerCase() === selectedCategory.toLowerCase() ||
          cat.toLowerCase().replace(/\s+/g, '-') === selectedCategory.toLowerCase()
        );
      });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const isUpcoming = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    return eventDate > today;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Playfair+Display:wght@400;500;600&display=swap");

        .hero-bg {
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.15),
              rgba(0, 0, 0, 0.25)
            ),
            url("/eventshero.png");
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
        
        .cormorant { font-family: 'Cormorant Garamond', serif; }
        .playfair { font-family: 'Playfair Display', serif; }
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
            Events
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
            Celebrating Craft, Culture & Conscious Design
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
            At Aagaur Studio, events are more than gatherings — they are platforms for exchange, 
            exploration, and celebration. We curate and participate in meaningful events that spark 
            conversations around sustainability, design innovation, heritage, and community.
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section 
        className="py-20 lg:py-32 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="playfair text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-stone-900">
                A Space for Collective Growth
              </h2>
              <div className="h-px w-16 bg-amber-600 mb-8"></div>
              <p className="cormorant text-lg md:text-xl leading-relaxed text-stone-700 mb-8">
                Whether it's a hands-on workshop with local artisans, an exhibition on sustainable 
                materials, or a talk on eco-conscious architecture — our events reflect our values. 
                They are immersive, insightful, and always inclusive.
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {[
                { icon: Users, title: "Community Design Workshops", desc: "Collaborative learning experiences" },
                { icon: Calendar, title: "Artisan Showcases", desc: "Under Aagaur Crafts" },
                { icon: MapPin, title: "Sustainability Exhibitions", desc: "Thought-provoking displays" },
                { icon: Clock, title: "Educational Talks", desc: "Expert panels & discussions" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-8 h-8 mx-auto mb-4 text-black" />
                  <h3 className="cormorant text-lg font-medium mb-2 text-stone-900">{feature.title}</h3>
                  <p className="cormorant text-sm text-stone-600">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Events Filter */}
      <motion.section 
        className="py-12 "
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full cormorant text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Events Grid */}
      <motion.section 
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {loadingEvents && <div className="text-center">Loading events...</div>}
          {eventsError && <div className="text-center text-red-500">{eventsError}</div>}
          
          {!loadingEvents && events.length === 0 && (
            <div className="text-center text-stone-600">
              <p>No events available at the moment. Check back soon!</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {filteredEvents.map((event) => (
              <Link key={event._id} to={`/event/${event._id}`}>
                <motion.div
                  variants={itemVariants}
                  className="group cursor-pointer"
                  whileHover={{ y: -8 }}
                >
                  {/* Main Image */}
                  <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden mb-6">
                    <img 
                      src={event.mainImage} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                    />
                    
                    {/* Upcoming Badge */}
                    {isUpcoming(event.date) && (
                      <div className="absolute top-6 right-6 bg-green-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md tracking-wide hover:bg-green-700 transition-all duration-200">
                      UPCOMING
                    </div>
                    )}
                    
                    {/* Hover Overlay with Tagline */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                      <div className="p-6 text-white">
                        <p className="text-sm font-light leading-relaxed">{event.tagline}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Below Image */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="playfair text-xl md:text-2xl font-light text-stone-900 group-hover:text-stone-600 transition-colors duration-300 leading-tight flex-1 pr-4">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-stone-400 text-sm tracking-wide">
                        <span>
                          {new Date(event.date).getFullYear()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-stone-500">
                      <div className="w-8 h-px bg-stone-300 mr-3"></div>
                      <span className="text-xs tracking-[0.1em] uppercase font-light">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-8 md:px-16 py-32 md:py-48 flex flex-col items-center text-center bg-black text-white">
        <motion.h3
          className="text-3xl sm:text-5xl md:text-7xl font-normal tracking-[0.1em] mb-12 max-w-6xl leading-tight luxury-font"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          JOIN OUR JOURNEY OF DISCOVERY, CONNECTION, AND DESIGN THAT MATTERS
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
};

export default EventsPage;