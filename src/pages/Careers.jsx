import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, MapPin, Clock, Users, Heart, Zap, Award, ChevronRight, ArrowRight, Star, Globe, Briefcase } from 'lucide-react';

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'SENIOR ARCHITECT',
      department: 'Architecture',
      location: 'Bhopal, MP',
      type: 'Full-time',
      description: 'Lead architectural projects with focus on sustainable design and social architecture. Work on heritage documentation and contemporary integration.',
      requirements: ['5+ years experience', 'AutoCAD/Revit', 'Sustainable design'],
      posted: '2 days ago',
      salary: '₹8L - ₹12L'
    },
    {
      id: 2,
      title: 'INTERIOR DESIGNER',
      department: 'Interior Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create thoughtful interior spaces that harmonize functionality with aesthetics while maintaining sustainability principles.',
      requirements: ['3+ years experience', 'SketchUp/3ds Max', 'Material knowledge'],
      posted: '5 days ago',
      salary: '₹6L - ₹9L'
    },
    {
      id: 3,
      title: 'CRAFT DESIGNER',
      department: 'Aagaur Crafts',
      location: 'Madhya Pradesh',
      type: 'Full-time',
      description: 'Collaborate with local artisans to create contemporary products while preserving traditional craftsmanship techniques.',
      requirements: ['Portfolio required', 'Traditional craft knowledge', 'Product design'],
      posted: '1 week ago',
      salary: '₹4L - ₹7L'
    },
    {
      id: 4,
      title: 'PROJECT COORDINATOR',
      department: 'Operations',
      location: 'Bhopal, MP',
      type: 'Full-time',
      description: 'Coordinate multiple projects ensuring timely delivery while maintaining quality standards and client satisfaction.',
      requirements: ['Project management', 'Communication skills', 'Site coordination'],
      posted: '3 days ago',
      salary: '₹5L - ₹8L'
    },
    {
      id: 5,
      title: 'JUNIOR ARCHITECT',
      department: 'Architecture',
      location: 'Bhopal, MP',
      type: 'Full-time',
      description: 'Assist in architectural documentation and design development for sustainable and heritage projects.',
      requirements: ['Fresh graduates welcome', 'CAD skills', 'Passion for design'],
      posted: '1 week ago',
      salary: '₹3L - ₹5L'
    }
  ];

  const departments = ['all', 'Architecture', 'Interior Design', 'Aagaur Crafts', 'Operations'];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'SUSTAINABILITY',
      description: 'Every project contributes to environmental responsibility and social impact',
      highlight: 'Purpose driven'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'CRAFTSMANSHIP',
      description: 'Preserve traditional techniques while creating contemporary solutions',
      highlight: 'Heritage focus'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'INNOVATION',
      description: 'Push boundaries in design while respecting cultural heritage',
      highlight: 'Creative excellence'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'COMMUNITY',
      description: 'Work directly with artisans and communities across Madhya Pradesh',
      highlight: 'Local impact'
    }
  ];

  const stats = [
    { number: '500+', label: 'Team Members', icon: <Users className="w-6 h-6" /> },
    { number: '15+', label: 'Countries', icon: <Globe className="w-6 h-6" /> },
    { number: '4.9/5', label: 'Glassdoor Rating', icon: <Star className="w-6 h-6" /> },
    { number: '98%', label: 'Employee Satisfaction', icon: <Heart className="w-6 h-6" /> }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(0,0,0,0.05),transparent)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.05),transparent)] animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-20 md:py-32 min-h-screen">
        {/* Floating dots */}
        <div className="absolute top-10 md:top-20 right-10 md:right-20 w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 md:bottom-20 left-10 md:left-20 w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-1000"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center max-w-4xl"
        >
          <span className="inline-block px-3 md:px-4 py-2 text-xs font-medium bg-gray-100 border border-gray-300 rounded-sm text-gray-600 mb-6 md:mb-8 tracking-wide">
            STUDIO AAGAUR
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-thin mb-6 md:mb-8 tracking-[0.3em] text-black">
            CAREERS
          </h1>
          <div className="w-24 md:w-32 h-px bg-gray-400 mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 tracking-wide font-light">
            Where Design Meets Purpose
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl md:max-w-2xl mx-auto px-4">
            Join our team of passionate creatives dedicated to sustainable architecture, thoughtful design, and preserving traditional craftsmanship while creating spaces that inspire and endure.
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-8 md:bottom-16 flex items-center gap-3 md:gap-4">
          <div className="w-12 md:w-16 h-px bg-gray-400"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-3 md:w-4 h-px bg-gray-500"></div>
        </div>
      </div>

      {/* Job Search Section */}
      <section className="relative px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin tracking-[0.3em] mb-4 md:mb-6 text-black">
            OPEN POSITIONS
          </h2>
          <div className="w-24 md:w-32 h-px bg-gray-400 mx-auto mb-6 md:mb-8"></div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl md:max-w-2xl mx-auto px-4">
            Discover opportunities to create meaningful spaces and contribute to sustainable design practices.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 md:mb-16 flex flex-col gap-4 max-w-2xl mx-auto px-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 border border-gray-300 focus:border-gray-500 focus:outline-none text-sm transition-all duration-300"
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 focus:border-gray-500 focus:outline-none bg-white text-sm font-medium transition-all duration-300"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>

        {/* Job Listings */}
        <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto px-4">
          {filteredJobs.map((job, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref);
            
            return (
              <motion.div
                key={job.id}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white border border-gray-300 p-4 md:p-6 lg:p-8 group hover:shadow-lg transition-all duration-500"
              >
                <div className="flex flex-col mb-4 md:mb-6">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 md:mb-4">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium tracking-wide w-fit">
                        {job.department}
                      </span>
                      <span className="text-gray-400 hidden sm:inline">•</span>
                      <span className="text-gray-500 text-xs">{job.posted}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-thin mb-3 md:mb-4 tracking-[0.15em] md:tracking-[0.2em] text-black group-hover:text-gray-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-gray-600 mb-3 md:mb-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4 md:mb-6">{job.description}</p>
                
                <div className="mb-6 md:mb-8">
                  <h4 className="font-medium text-gray-900 mb-3 md:mb-4 text-sm tracking-wide">REQUIREMENTS</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, reqIndex) => (
                      <span key={reqIndex} className="bg-gray-50 text-gray-600 px-3 py-1 text-xs border border-gray-200">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <button className="bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors duration-300 w-full sm:w-auto">
                    APPLY NOW
                  </button>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <div className="w-6 md:w-8 h-px bg-gray-400"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-3 md:w-4 h-px bg-gray-500"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 md:py-16 px-4">
            <div className="w-12 md:w-16 h-12 md:h-16 bg-gray-100 mx-auto mb-4 md:mb-6 flex items-center justify-center">
              <Search className="w-6 md:w-8 h-6 md:h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No positions found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* Values Section */}
      <section className="relative px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-gray-50">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin tracking-[0.3em] mb-4 md:mb-6 text-black">
            OUR VALUES
          </h2>
          <div className="w-24 md:w-32 h-px bg-gray-400 mx-auto mb-6 md:mb-8"></div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl md:max-w-2xl mx-auto px-4">
            The principles that guide our work and shape our approach to design and collaboration.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 max-w-5xl mx-auto px-4">
          {values.map((value, index) => {
            const ref = useRef(null);
            const isInView = useInView(ref);
            
            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white border border-gray-200 p-6 md:p-8 group hover:shadow-lg transition-all duration-500"
              >
                <div className="flex items-start space-x-4 md:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-gray-100 text-gray-600 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      {value.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                      <h3 className="text-base md:text-lg font-thin tracking-[0.15em] md:tracking-[0.2em] text-black">{value.title}</h3>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 text-xs tracking-wide w-fit">
                        {value.highlight}
                      </span>
                    </div>
                    <div className="w-12 md:w-16 h-px bg-gray-300 mb-3 md:mb-4"></div>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer section */}
      <div className="relative px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="text-center">
          <div className="w-full h-px bg-gray-300 mb-6 md:mb-8"></div>
          <p className="text-sm text-gray-500 tracking-[0.2em]">STUDIO AAGAUR</p>
          <p className="text-xs text-gray-400 mt-2 px-4">Sustainable Design · Traditional Craftsmanship · Creative Innovation</p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
