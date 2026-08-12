import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, Sparkles, Rocket, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  { 
    num: "01", 
    title: "Discover", 
    subtitle: "Understanding Before Creating",
    icon: Search,
    desc: "We learn about your business, audience, competitors, and goals to build a strong foundation for everything that follows.",
    tags: ["Audience Analysis", "Competitor Audit", "Goal Alignment"],
    highlight: "Deep dive audit into your brand identity & growth metrics."
  },
  { 
    num: "02", 
    title: "Strategize", 
    subtitle: "Building the Right Plan",
    icon: Compass,
    desc: "Every brand is different. We create a customized roadmap for your content, branding, marketing, and digital presence.",
    tags: ["Content Roadmap", "Brand Positioning", "Growth Channels"],
    highlight: "Custom blueprint tailored to convert high-intent leads."
  },
  { 
    num: "03", 
    title: "Create", 
    subtitle: "Bringing Ideas to Life",
    icon: Sparkles,
    desc: "Our team designs, shoots, writes, edits, and builds everything your brand needs with creativity and purpose.",
    tags: ["Video Production", "Design & Copy", "Web Development"],
    highlight: "High-converting visual assets & world-class media output."
  },
  { 
    num: "04", 
    title: "Launch", 
    subtitle: "Taking Your Brand Live",
    icon: Rocket,
    desc: "From social media and websites to campaigns and ads, we launch your brand with precision and consistency.",
    tags: ["Multi-Platform Distro", "Campaign Activation", "Live QA"],
    highlight: "Flawless multi-channel deployment for maximum impact."
  },
  { 
    num: "05", 
    title: "Grow", 
    subtitle: "Optimizing for Long-Term Success",
    icon: TrendingUp,
    desc: "We monitor performance, refine strategies, and continuously improve to help your business achieve sustainable growth.",
    tags: ["Funnel Optimization", "Analytics & ROAS", "Continuous Iteration"],
    highlight: "Data-driven scaling to multiply revenue & brand equity."
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="py-24 md:py-32 bg-[#FAFAFA] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] bg-brand/5 blur-[160px] rounded-full pointer-events-none mix-blend-multiply" />
      <div className="noise-bg opacity-[0.02]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              Switch Protocol
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#111111] leading-[1.02] tracking-tight">
              THE SWITCH <span className="text-brand">METHOD</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-black/60 max-w-md leading-relaxed"
          >
            Our step-by-step methodology designed to elevate your brand and drive continuous growth.
          </motion.p>
        </div>

        {/* Interactive Step Navigator (Pill Bar for Desktop & Mobile) */}
        <div className="mb-10 overflow-x-auto pb-4 pt-1 scrollbar-none">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-lg shadow-black/10 scale-[1.03]'
                      : 'bg-white/80 hover:bg-white text-black/70 hover:text-black border border-black/5 hover:border-brand/30 shadow-sm'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center ${isActive ? 'bg-brand text-white' : 'bg-black/5 text-black/60'}`}>
                    {step.num}
                  </span>
                  <span>{step.title}</span>
                  {isActive && (
                    <motion.div layoutId="pill-active-indicator" className="w-1.5 h-1.5 rounded-full bg-brand ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Spotlight Card Showcase */}
        <div className="mb-16">
          <AnimatePresence mode="wait">
            {steps.map((step, index) => {
              if (index !== activeStep) return null;
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-white/90 backdrop-blur-xl border border-brand/20 rounded-[28px] md:rounded-[36px] p-6 sm:p-8 md:p-12 shadow-2xl shadow-orange-500/5 relative overflow-hidden"
                >
                  {/* Decorative Background Accent */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand/10 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                    
                    {/* Left Column: Number & Title */}
                    <div className="lg:col-span-5 flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-brand/20 to-orange-100 border border-brand/30 flex items-center justify-center text-brand font-extrabold text-xl sm:text-2xl shadow-sm">
                          {step.num}
                        </div>
                        <div className="p-3 rounded-2xl bg-black/5 text-[#111111]">
                          <Icon size={24} className="text-brand" />
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] mb-2 tracking-tight">
                        {step.title}
                      </h3>
                      <h4 className="text-xs sm:text-sm font-bold text-brand uppercase tracking-wider mb-4">
                        Phase {step.num}: {step.subtitle}
                      </h4>
                      <p className="text-black/70 text-sm sm:text-base leading-relaxed mb-6">
                        {step.desc}
                      </p>

                      <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-brand/20 text-xs sm:text-sm font-medium text-black/80 flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                        <span>{step.highlight}</span>
                      </div>
                    </div>

                    {/* Right Column: Deliverables & Tags */}
                    <div className="lg:col-span-7 bg-[#FAFAFA] border border-black/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">
                          Key Deliverables & Actions
                        </div>
                        <div className="flex flex-wrap gap-2.5 mb-6">
                          {step.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs sm:text-sm font-semibold text-[#111111] shadow-xs flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-black/50">
                          Step {index + 1} of {steps.length}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                            disabled={activeStep === 0}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-black/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 transition-colors"
                          >
                            Prev
                          </button>
                          <button
                            onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                            disabled={activeStep === steps.length - 1}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-brand text-white shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand/90 transition-colors flex items-center gap-1"
                          >
                            Next <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Horizontal Visual Timeline Cards (Desktop & Tablet) */}
        <div className="relative pt-6">
          {/* Continuous Glowing Progress Track Line */}
          <div className="absolute top-[4.5rem] left-8 right-8 h-[2px] bg-black/10 hidden lg:block z-0" />
          <div 
            className="absolute top-[4.5rem] left-8 h-[2px] bg-gradient-to-r from-brand via-orange-400 to-brand transition-all duration-500 hidden lg:block z-0"
            style={{ width: `${(activeStep / (steps.length - 1)) * 88}%` }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveStep(index)}
                  className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-400 cursor-pointer group flex flex-col justify-between ${
                    isActive
                      ? 'bg-white border-brand/40 shadow-xl shadow-orange-500/10 scale-[1.02]'
                      : 'bg-white/60 hover:bg-white border-black/5 hover:border-brand/20 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base transition-colors ${
                      isActive ? 'bg-brand text-white shadow-md shadow-brand/20' : 'bg-orange-100/60 text-brand group-hover:bg-brand group-hover:text-white'
                    }`}>
                      {step.num}
                    </div>
                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-brand' : 'text-black/40 group-hover:text-brand'}`} />
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-1 group-hover:text-brand transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-black/60 text-xs line-clamp-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}


