import React from 'react';
import { motion } from 'framer-motion';
import ContestForm from '../components/ContestForm';

const ContestPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-black pt-24">
      <motion.section
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="text-center mb-16">
          <h1 className="font-cormorant text-4xl md:text-6xl font-medium leading-tight">Win a Free Project</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl font-light text-black/80 tracking-wider">
            Every year, Aagaur Studio offers one passionate client the chance to bring their dream project to life, completely free of charge. We believe in the power of great ideas and want to help make them a reality. Share your vision with us for a chance to be selected.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ContestForm />
        </div>
      </motion.section>
    </div>
  );
};

export default ContestPage;
