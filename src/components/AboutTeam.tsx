import React from 'react';
import { motion } from 'motion/react';

export default function AboutTeam() {
  return (
    <section id="about" className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF8EE] border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest mb-4">Our DNA</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] leading-[0.95] tracking-tight mb-8">
              We're Not Here <span className="text-brand">To Just Post Content.</span>
            </h2>
            <p className="text-lg text-black/60 mb-6 leading-relaxed">
              We're here to build brands.Every business has a story, but not every business knows how to tell it. That's where SWITCH comes in
            </p>
            <p className="text-lg text-black/60 mb-10 leading-relaxed">
              We partner with businesses to build strong brands through creative strategy, content creation, websites, social media, and digital marketing. More than an agency, we become the creative team behind your growth.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-12 h-12 rounded-full border-2 border-white bg-gray-200 z-${40-i*10} overflow-hidden`}>
                    <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Team" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-xs font-bold text-[#111111] uppercase tracking-widest">
                20+ Growth Experts <br/> <span className="text-black/40">Ready to scale your brand</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-[32px] overflow-hidden shadow-2xl shadow-black/10 border border-black/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
              alt="Our Team" 
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-brand/5 mix-blend-color" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
