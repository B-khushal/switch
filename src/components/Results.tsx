import React from 'react';
import { motion } from 'motion/react';

const stats = [
  { value: "500M+", label: "Total Views Generated" },
  { value: "₹50Cr+", label: "Revenue Influenced" },
  { value: "100+", label: "Brands Scaled" },
  { value: "3000+", label: "Campaigns Launched" },
  { value: "95%", label: "Client Retention Rate" },
];

export default function Results() {
  return (
    <section className="py-24 bg-brand text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap gap-8 justify-between items-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="text-4xl md:text-6xl font-bold tracking-tight mb-2">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
