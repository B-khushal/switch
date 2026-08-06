import React from 'react';
import { motion } from 'motion/react';

const steps = [
  { 
    num: "01", 
    title: "Discover", 
    subtitle: "Understanding Before Creating",
    desc: "We learn about your business, audience, competitors, and goals to build a strong foundation for everything that follows." 
  },
  { 
    num: "02", 
    title: "Strategize", 
    subtitle: "Building the Right Plan",
    desc: "Every brand is different. We create a customized roadmap for your content, branding, marketing, and digital presence." 
  },
  { 
    num: "03", 
    title: "Create", 
    subtitle: "Bringing Ideas to Life",
    desc: "Our team designs, shoots, writes, edits, and builds everything your brand needs with creativity and purpose." 
  },
  { 
    num: "04", 
    title: "Launch", 
    subtitle: "Taking Your Brand Live",
    desc: "From social media and websites to campaigns and ads, we launch your brand with precision and consistency." 
  },
  { 
    num: "05", 
    title: "Grow", 
    subtitle: "Optimizing for Long-Term Success",
    desc: "We monitor performance, refine strategies, and continuously improve to help your business achieve sustainable growth." 
  }
];

export default function Process() {
  return (
    <section id="process" className="py-32 bg-transparent relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF8EE] border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest mb-4">Switch Protocol</span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#111111] leading-[0.95] tracking-tight">
            THE SWITCH <br/> <span className="text-brand">METHOD</span>
          </h2>
          <p className="mt-4 text-lg text-black/60 max-w-2xl">
            Our step-by-step methodology designed to elevate your brand and drive continuous growth.
          </p>
        </div>

        <div className="relative">
          {/* Track line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Node */}
                <div className="w-16 h-16 bg-white border border-brand/20 text-brand font-bold text-xl rounded-2xl flex items-center justify-center mx-auto mb-8 relative z-10 shadow-xl shadow-orange-500/10">
                  {step.num}
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#111111] mb-1">{step.title}</h3>
                  <h4 className="text-xs font-semibold text-brand tracking-wider uppercase mb-3">{step.subtitle}</h4>
                  <p className="text-black/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

