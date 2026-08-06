import React from 'react';
import { motion } from 'motion/react';
import CardFanCarousel from './ui/card-fan-carousel';

export default function WorkShowcase() {
  const stats = [
    { value: "500M+", label: "Views Generated" },
    { value: "100+", label: "Brands Worked With" },
    { value: "3000+", label: "Assets Delivered" },
    { value: "₹50Cr+", label: "Revenue Influenced" },
  ];

  return (
    <section id="work" className="py-32 bg-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="noise-bg opacity-[0.02]" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF8EE] border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest mb-4">
                    Our Work
                  </span>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-[0.95] tracking-tight mb-6"
                >
                    Every brand has a story. <br className="hidden md:block"/> <span className="text-brand">Here's how we tell it.</span>
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-black/60 max-w-2xl mx-auto leading-relaxed"
                >
                  Discover the creative work behind the businesses that chose to make the SWITCH.
                </motion.p>
            </div>

            {/* Carousel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="mb-24 relative w-full"
            >
                <CardFanCarousel />
            </motion.div>

        </div>
    </section>
  );
}
