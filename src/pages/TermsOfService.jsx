import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-black pt-32 pb-16">
      <motion.div
        className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-cormorant text-4xl md:text-5xl font-medium leading-tight mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none font-light text-black/80 tracking-wider space-y-4">
          <p className="font-semibold">Effective Date: July 29, 2025</p>

          <p>Welcome to Aagaur Studio. By using this site, you agree to the following terms:</p>

          <h2 className="font-cormorant text-2xl font-medium pt-4">Content:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All content, including designs, images, and text, is the property of Aagaur Studio and is protected by copyright laws.</li>
            <li>You may not reuse or reproduce any content without written permission.</li>
          </ul>

          <h2 className="font-cormorant text-2xl font-medium pt-4">Use of Site:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>This site is intended for viewing architectural and interior design work.</li>
            <li>You may contact us through the provided form, but use of the site does not create a client relationship unless explicitly agreed upon.</li>
          </ul>

          <h2 className="font-cormorant text-2xl font-medium pt-4">Liability:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do our best to ensure the website is secure and accurate, but we are not liable for any errors, downtime, or technical issues.</li>
            <li>We are not responsible for any misuse of the content displayed on this site.</li>
          </ul>

          <h2 className="font-cormorant text-2xl font-medium pt-4">Changes:</h2>
          <p>We may update these Terms occasionally. Continued use of the site constitutes acceptance of those changes.</p>

          <h2 className="font-cormorant text-2xl font-medium pt-4">Contact:</h2>
          <p>For questions about these terms, email us at aagaur.studio@gmail.com.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
