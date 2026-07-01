import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, Youtube, Smartphone, Instagram, Images, Linkedin, FileText, Twitter, Mail } from 'lucide-react';
import { BGPattern } from './ui/bg-pattern';

const platforms = [
  { id: 1, name: 'YouTube Long Form', icon: Youtube, color: 'text-red-500', glow: 'shadow-red-500/20' },
  { id: 2, name: 'YouTube Shorts', icon: Smartphone, color: 'text-red-400', glow: 'shadow-red-400/20' },
  { id: 3, name: 'Instagram Reels', icon: Instagram, color: 'text-pink-500', glow: 'shadow-pink-500/20' },
  { id: 4, name: 'Instagram Carousels', icon: Images, color: 'text-fuchsia-500', glow: 'shadow-fuchsia-500/20' },
  { id: 5, name: 'LinkedIn Posts', icon: Linkedin, color: 'text-blue-500', glow: 'shadow-blue-500/20' },
  { id: 6, name: 'LinkedIn Carousels', icon: FileText, color: 'text-blue-400', glow: 'shadow-blue-400/20' },
  { id: 7, name: 'X (Twitter) Threads', icon: Twitter, color: 'text-slate-200', glow: 'shadow-slate-200/20' },
  { id: 8, name: 'Newsletter', icon: Mail, color: 'text-emerald-500', glow: 'shadow-emerald-500/20' },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const numLayers = 12;
  const layers = Array.from({ length: numLayers });

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-24 overflow-hidden flex items-center bg-transparent">
      {/* Background Gradients & Patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F8F5]/80 via-[#F7F3EC]/80 to-transparent" />
        
        {/* Subtle radial center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 blur-[120px] rounded-full mix-blend-multiply" />
        
        {/* Animated Background blobs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-[100px]"
        />

        {/* Mouse follow glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] bg-brand/10 mix-blend-multiply transition-all duration-700 ease-out"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        <div className="noise-bg opacity-[0.03]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Center Content */}
        <div className="flex flex-col items-center space-y-6 w-full pt-10 md:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-brand/20 text-[#111111] text-xs font-bold shadow-sm">
              🚀 Content Systems for Personal Brands
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[80px] font-bold text-[#111111] leading-[0.95] tracking-tight"
          >
            Build Once.<br />
            <span className="text-brand">Repurpose Everywhere.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-black/70 max-w-2xl leading-relaxed font-body"
          >
            We transform one piece of content into a powerful multi-platform content flywheel that drives growth across YouTube, Instagram, LinkedIn and newsletters.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 justify-center"
          >
            <button className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white font-bold rounded-full shadow-[0_10px_40px_rgba(249,160,0,0.2)] hover:shadow-[0_15px_50px_rgba(249,160,0,0.3)] hover:scale-[1.02] transition-all duration-300">
              Book Discovery Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white/50 backdrop-blur-sm text-[#111111] font-bold rounded-full border border-black/5 hover:bg-white hover:shadow-sm transition-all duration-300">
              See How It Works
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-8"
          >
             <p className="text-sm font-medium text-black/40">Trusted by founders, creators and personal brands.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
