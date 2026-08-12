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
        <BGPattern 
          variant="grid" 
          size={48} 
          mask="fade-bottom" 
          className="opacity-70 text-[#111111]/20 pointer-events-none" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F8F5]/60 via-[#F7F3EC]/40 to-transparent" />
        
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

      <div className="max-w-5xl mx-auto px-6 lg:px-8 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Center Content */}
        <div className="flex flex-col items-center space-y-6 w-full pt-10 md:pt-0">
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] leading-tight tracking-tight max-w-5xl"
          >
            <span className="sm:whitespace-nowrap">What Your Business Needs</span> <br />
            <span className="text-brand">Is a SWITCH.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-black/70 max-w-2xl leading-relaxed font-body"
          >
            We help businesses grow through branding, content creation, websites, social media, and digital marketing—everything you need to build a stronger brand.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
