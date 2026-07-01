import React from 'react';
import { motion } from 'motion/react';

const steps = [
  { num: "01", title: "Discovery & Audit", desc: "Deep dive into your current metrics, assets, and market position." },
  { num: "02", title: "Strategy Architecture", desc: "Building the custom roadmap for acquisition, creative, and conversion." },
  { num: "03", title: "Asset Production", desc: "Crafting high-converting copy, viral video hooks, and landing pages." },
  { num: "04", title: "Launch & Distribute", desc: "Deploying campaigns across selected networks with strict tracking." },
  { num: "05", title: "Optimize & Scale", desc: "Ruthless iteration based on data to scale winners and kill losers." }
];

export default function Process() {
  return (
    <section id="process" className="py-32 bg-transparent relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF8EE] border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest mb-4">Switch Protocol</span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#111111] leading-[0.95] tracking-tight">
            Predictable <br/> <span className="text-brand">Execution.</span>
          </h2>
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
                  <h3 className="text-xl font-bold text-[#111111] mb-3">{step.title}</h3>
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
