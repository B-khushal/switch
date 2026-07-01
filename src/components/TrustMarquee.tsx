import React from 'react';
import { motion } from 'motion/react';

const logos = [
  "META", "GOOGLE", "SHOPIFY", "FORBES", "ENTREPRENEUR", "TECHCRUNCH", "STRIPE", "FRAMER", "LINEAR"
];

export default function TrustMarquee() {
  return (
    <section className="py-8 bg-white/60 border-t border-black/5 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />
      
      <div className="flex w-[200%] gap-16 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex gap-24 items-center px-12"
        >
          {/* Double array for seamless loop */}
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex-shrink-0 text-2xl font-black text-black/30 tracking-tighter hover:text-black/60 transition-colors duration-500 cursor-default grayscale saturate-0">
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
