import { motion } from "framer-motion";
import { Leaf, Droplets, Sun, Wind } from "lucide-react";

const SustainableVision = () => {
  const features = [
    {
      icon: Leaf,
      title: "Eco-Conscious Design",
      description:
        "Creating spaces that harmonize with nature and minimize environmental impact",
    },
    {
      icon: Sun,
      title: "Sustainable Materials",
      description:
        "Carefully selected materials that are both luxurious and environmentally responsible",
    },
    {
      icon: Wind,
      title: "Energy Efficiency",
      description:
        "Innovative solutions that reduce energy consumption without compromising comfort",
    },
    {
      icon: Droplets,
      title: "Natural Integration",
      description:
        "Seamlessly blending architecture with the surrounding ecosystem",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-black text-white py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 " />
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 tracking-wide">
            Sustainable Vision
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            We specialize in creating innovative and eco-friendly designs that
            harmonize architecture with nature. Our commitment to sustainability
            drives every decision, ensuring a positive impact on both aesthetics
            and the environment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.23, 1, 0.32, 1],
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div
                className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 h-full
                            transition-all duration-500 group-hover:bg-white/10"
              >
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl
                              opacity-0 group-hover:opacity-100 transition duration-500 blur-xl group-hover:duration-200"
                />

                <div className="relative flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 rounded-full bg-white/10 mb-4"
                  >
                    <feature.icon size={24} className="text-emerald-400" />
                  </motion.div>

                  <h3 className="text-xl font-light mb-3 text-white group-hover:text-emerald-300 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default SustainableVision;
