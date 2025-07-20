import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Users, Zap, Globe } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
    resumeLink: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  // job openings
  const [openings, setOpenings] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState('');

  // modal state
  const [showApply, setShowApply] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const res = await fetch(`${API_BASE}/careers/open`);
        if (!res.ok) throw new Error('Failed to load openings');
        const data = await res.json();
        setOpenings(data);
      } catch (err) {
        setJobsError(err.message);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchOpenings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.contact)) {
      newErrors.contact = "Please enter a valid contact number";
    }
    
    if (!formData.resumeLink.trim()) {
      newErrors.resumeLink = "Resume link is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

        const positionLine = selectedJob ? `Applied Position: ${selectedJob.position}\n` : '';

    const emailBody = `
Job Application Submission

${positionLine}Name: ${formData.name}
Email: ${formData.email}
Contact: ${formData.contact}
Resume Link: ${formData.resumeLink}

Message:
${formData.message}
    `.trim();

    const subject = selectedJob ? `Application for ${selectedJob.position}` : `Job Application from ${formData.name}`;
    const mailtoLink = `mailto:aagaur.studio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}&cc=${encodeURIComponent(formData.email)}`;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = mailtoLink;
      setStatus('Opening email app...');
    } else {
      // Try Gmail compose first (desktop)
      const gmailUrl = new URL('https://mail.google.com/mail/');
      gmailUrl.searchParams.set('view', 'cm');
      gmailUrl.searchParams.set('fs', '1');
      gmailUrl.searchParams.set('to', 'aagaur.studio@gmail.com');
      gmailUrl.searchParams.set('su', subject);
      gmailUrl.searchParams.set('body', emailBody);
      gmailUrl.searchParams.set('cc', formData.email);

      const win = window.open(gmailUrl.toString(), '_blank');
      if (win) {
        setStatus('Opening email in browser...');
      } else {
        // fallback mailto
        window.location.href = mailtoLink;
        setStatus('Opening email client...');
      }
    }
  };

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'SUSTAINABILITY',
      description: 'Every project contributes to environmental responsibility and social impact through thoughtful design choices',
      highlight: 'Purpose driven'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'CRAFTSMANSHIP',
      description: 'Preserve traditional techniques while creating contemporary solutions that honor heritage',
      highlight: 'Heritage focus'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'INNOVATION',
      description: 'Push boundaries in design while respecting cultural heritage and architectural integrity',
      highlight: 'Creative excellence'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'COMMUNITY',
      description: 'Work directly with artisans and communities to create spaces that reflect local identity',
      highlight: 'Local impact'
    }
  ];

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Subtle animated background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-transparent to-gray-100"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-gray-100/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-gray-200/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-8 md:space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3">
                  <div className="w-12 h-px bg-gray-400"></div>
                  <span className="text-xs font-light tracking-[0.3em] text-gray-500 uppercase">
                    Join Our Team
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[-0.02em] leading-[0.9]">
                  CAREERS
                </h1>
                
                <div className="w-20 md:w-32 h-px bg-gray-300"></div>
              </div>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-base md:text-lg font-light">
                  Join a team of visionary architects and designers who are reshaping spaces 
                  and creating environments that inspire. We're looking for passionate individuals 
                  who share our commitment to excellence and innovation.
                </p>
                
                <p className="text-sm md:text-base">
                  At Studio Aagaur, we believe that great architecture emerges from the 
                  intersection of creativity, sustainability, and cultural sensitivity. 
                  Our collaborative environment fosters growth and meaningful contribution.
                </p>
              </div>
              
              <div className="flex items-center space-x-4 pt-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-8 h-px bg-gray-300"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              </div>
            </motion.div>

    
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="relative px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.1em] mb-10 text-center">CURRENT OPENINGS</h2>

          {loadingJobs && <div className="text-center">Loading openings...</div>}
          {jobsError && <div className="text-center text-red-500">{jobsError}</div>}

          {!loadingJobs && openings.length === 0 && (
            <div className="text-center flex flex-col items-center gap-4 text-gray-600">
              <p>We currently don’t have any openings. Please check back later or drop your resume for future opportunities.</p>
              <button
                onClick={() => { setSelectedJob(null); setShowApply(true); }}
                className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Drop Resume
              </button>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {openings.map((job) => (
              <div key={job._id} className="border border-gray-200 rounded-lg p-6 flex flex-col justify-between bg-white shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.position}</h3>
                  <p className="text-gray-600 mb-2">{job.shortDescription}</p>
                  <p className="text-sm text-gray-500">{job.location || 'Remote'} • {job.employmentType}</p>
                  {job.salaryRange && <p className="text-sm text-gray-500 mt-1">Salary: {job.salaryRange}</p>}
                </div>
                <button
                  onClick={() => { console.log('Apply clicked', job); setSelectedJob(job); setShowApply(true); }}
                  className="mt-4 inline-block text-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {showApply && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000]">
          <div className="bg-white w-full max-w-md mx-4 rounded-lg p-6 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              onClick={() => setShowApply(false)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Apply for {selectedJob?.position}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.name ? 'border-red-400' : 'border-gray-300'} rounded`}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded`}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

              <input
                type="text"
                name="contact"
                placeholder="Contact Number *"
                value={formData.contact}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.contact ? 'border-red-400' : 'border-gray-300'} rounded`}
              />
              {errors.contact && <p className="text-red-500 text-xs">{errors.contact}</p>}

              <input
                type="url"
                name="resumeLink"
                placeholder="Resume Link (Google Drive) *"
                value={formData.resumeLink}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.resumeLink ? 'border-red-400' : 'border-gray-300'} rounded`}
              />
              {errors.resumeLink && <p className="text-red-500 text-xs">{errors.resumeLink}</p>}

              <textarea
                name="message"
                placeholder="Message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
              >
                Apply
              </button>
            </form>
            {status && <p className="text-center mt-4 text-sm text-gray-600">{status}</p>}
          </div>
        </div>
      )}

      {/* Values Section */}
      <section className="values-section relative px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.1em] mb-4 md:mb-6 text-black">
              OUR VALUES
            </h2>
            <div className="w-24 md:w-32 h-px bg-gray-400 mx-auto mb-6 md:mb-8"></div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl md:max-w-2xl mx-auto font-light">
              The principles that guide our work and shape our approach to design and collaboration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8 max-w-5xl mx-auto">
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
                  className="bg-white border border-gray-200 p-6 md:p-8 group hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-500 relative"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Subtle hover glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent transition-opacity duration-700 ${
                    hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start space-x-4 md:space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-10 md:w-12 h-10 md:h-12 bg-gray-100 text-gray-600 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                          {value.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                          <h3 className="text-base md:text-lg font-light tracking-[0.15em] md:tracking-[0.2em] text-black">
                            {value.title}
                          </h3>
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 text-xs tracking-wide w-fit font-light">
                            {value.highlight}
                          </span>
                        </div>
                        <div className="w-12 md:w-16 h-px bg-gray-300 mb-3 md:mb-4"></div>
                        <p className="text-gray-600 text-sm leading-relaxed font-light">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

     
    </div>
  );
}
