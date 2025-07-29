import { useState } from "react";
import { motion } from "framer-motion";

const ContestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    projectTitle: '',
    projectIdea: '',
    links: ''
  });
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const recipientEmail = 'aagaur.studio@gmail.com'; // PLEASE REPLACE WITH THE CORRECT EMAIL
    const subject = `Contest Submission: ${formData.projectTitle}`;
    const body = `
New Project Contest Submission
----------------------------------

Name: ${formData.name}

Email: ${formData.email}\n\nContact No.: ${formData.contactNo}

Project Title: ${formData.projectTitle}

Project Idea:
${formData.projectIdea}

Relevant Links:
${formData.links || 'N/A'}

----------------------------------
    `;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    setStatus('success');
    setTimeout(() => {
        setStatus('');
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black" />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-black/80 mb-2">Your Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white/50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all duration-300" />
        </div>
        <div className="mb-6">
          <label htmlFor="contactNo" className="block text-sm font-medium text-black/80 mb-2">Contact No.</label>
          <input type="tel" id="contactNo" name="contactNo" value={formData.contactNo} onChange={handleChange} required className="w-full px-4 py-3 bg-white/50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all duration-300" />
        </div>
      </div>
      <div>
        <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
        <input type="text" name="projectTitle" id="projectTitle" required value={formData.projectTitle} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black" />
      </div>
      <div>
        <label htmlFor="projectIdea" className="block text-sm font-medium text-gray-700 mb-2">Project Idea</label>
        <textarea name="projectIdea" id="projectIdea" rows="6" required value={formData.projectIdea} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"></textarea>
      </div>
      <div>
        <label htmlFor="links" className="block text-sm font-medium text-gray-700 mb-2">Relevant Links (Optional)</label>
        <input type="text" name="links" id="links" value={formData.links} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-black focus:border-black" />
      </div>
      <div>
        <button 
          type="submit" 
          disabled={status === 'sending'}
          className="w-full bg-black text-white py-4 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400"
        >
          {status === 'sending' ? 'Submitting...' : 'Submit My Idea'}
        </button>
      </div>
      {status === 'success' && <p className="text-green-600">Redirecting to your email client. Please send the email to complete your submission.</p>}
    </form>
  );
};

export default ContestForm;
