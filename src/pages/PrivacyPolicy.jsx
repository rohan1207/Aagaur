import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-black pt-32 pb-16">
      <motion.div
        className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-cormorant text-4xl md:text-5xl font-medium leading-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none font-light text-black/80 tracking-wider space-y-4">
          <p className="font-semibold">Effective Date: July 29, 2025</p>

          <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or contact us through our form.</p>

          <h2 className="font-cormorant text-2xl font-medium pt-4">Information We Collect:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>When you fill out the contact form, we may collect your name, email address, and any message you choose to send.</li>
            <li>We do not collect any other personal information.</li>
            <li>We do not use cookies or analytics tools on this site.</li>
          </ul>

          <h2 className="font-cormorant text-2xl font-medium pt-4">How We Use Your Information:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To respond to your inquiries or project requests.</li>
            <li>To communicate with you about our services if requested.</li>
          </ul>

          <h2 className="font-cormorant text-2xl font-medium pt-4">Data Security:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your information is stored securely and is not shared with any third parties.</li>
            <li>We do not sell, trade, or rent your personal data.</li>
          </ul>

          <h2 className="font-cormorant text-2xl font-medium pt-4">Third-Party Services:</h2>
          <p>This site may use basic hosting tools or embedded content, but we do not track your data for marketing or analytics.</p>

          <h2 className="font-cormorant text-2xl font-medium pt-4">Your Rights:</h2>
          <p>You may request access, correction, or deletion of your personal data by contacting us at aagaur.studio@gmail.com.</p>

          <h2 className="font-cormorant text-2xl font-medium pt-4">Contact:</h2>
          <p>If you have any questions, please reach out to aagaur.studio@gmail.com.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
