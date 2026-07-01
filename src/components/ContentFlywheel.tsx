import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Youtube, Smartphone, Instagram, Images, Linkedin, FileText, Twitter, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

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

export default function ContentFlywheel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const flywheelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current;
    const flywheel = flywheelRef.current;

    if (!section || !flywheel || items.length === 0) return;

    // Set initial state for items
    gsap.set(items, { 
      opacity: 0, 
      scale: 0.5,
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(10px)',
      x: 0, 
      y: 0, 
    });

    const isMobile = window.innerWidth < 768;
    // We adjust the radii so they surround the tilted taller flywheel
    const radiusDesktopX = 260;
    const radiusDesktopY = 260;
    const radiusMobileX = 120;
    const radiusMobileY = 160;
    
    const radiusX = isMobile ? radiusMobileX : radiusDesktopX;
    const radiusY = isMobile ? radiusMobileY : radiusDesktopY;

    const processSection = document.getElementById('process');
    const animationTrigger = processSection || section;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: animationTrigger,
        start: "top 80%", // Starts animating before Process section fully enters the viewport
        end: "+=4000", // Increased scroll distance slightly to account for starting earlier
        scrub: 1,
      }
    });

    // Pin the section separately when it reaches the top
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=3000",
      pin: true,
    });

    // Animate each item
    items.forEach((item, index) => {
      // Position 4 cards on the right and 4 on the left
      const isRight = index < 4;
      const subIndex = index % 4;
      
      // Calculate offset to spread 4 items between -45 and 45 degrees
      // Spacing of 30 degrees (Math.PI / 6)
      const offset = (subIndex - 1.5) * (Math.PI / 6);
      const angle = isRight ? offset : Math.PI + offset;
      
      const targetX = Math.cos(angle) * radiusX;
      const targetY = Math.sin(angle) * radiusY;

      tl.to(item, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        x: targetX,
        y: targetY,
        duration: 1,
        ease: "power2.out",
      }, index * 0.5); // Staggered start
    });

    // After all items are visible, accelerate flywheel rotation slightly
    if (!prefersReducedMotion) {
      tl.to(flywheel, {
        rotation: "+=45", // Subtle extra rotation upon scroll completion
        duration: 2,
        ease: "power1.inOut"
      }, "+=0.5");
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [prefersReducedMotion]);

  // Generate 16 layers for the polygon flywheel
  const numLayers = 16;
  const layers = Array.from({ length: numLayers });

  return (
    <section ref={sectionRef} id="flywheel" className="bg-[#FAFAFA] text-[#111111] relative overflow-hidden h-[100svh] flex items-center justify-center">
      {/* Background radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-brand/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
      
      {/* Flywheel Container */}
      <div className="relative flex items-center justify-center w-full h-full max-w-7xl mx-auto z-10">
        
        {/* The Animated Diagonal Polygon Flywheel */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Rotate container by 25deg for the diagonal look, and scale Y to make it taller than wide */}
          <div className="relative w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[500px] md:h-[500px] origin-center -rotate-[25deg] scale-y-[1.1]">
            <motion.div 
              ref={flywheelRef}
              animate={{ rotate: prefersReducedMotion ? 0 : 360 }} 
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <defs>
                  {/* lime -> cyan -> blue -> purple -> pink -> orange -> lime */}
                  <linearGradient id="poly-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#84cc16" />
                    <stop offset="20%" stopColor="#06b6d4" />
                    <stop offset="40%" stopColor="#3b82f6" />
                    <stop offset="60%" stopColor="#a855f7" />
                    <stop offset="80%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                  
                  <filter id="poly-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Render multiple layered polygons */}
                {layers.map((_, i) => {
                  // Hexagon points (radius ~45, center 50,50)
                  const points = "95,50 72.5,89 27.5,89 5,50 27.5,11 72.5,11";
                  
                  // Calculate dynamic styles for the waveform effect
                  // Rotation offset and scale offset per layer
                  const rotation = i * 4;
                  const scale = 1 - (i * 0.025);
                  const opacity = 0.6 - (i * 0.03);
                  
                  return (
                    <polygon 
                      key={i}
                      points={points}
                      fill="none"
                      stroke="url(#poly-grad)"
                      strokeWidth={0.3 + (i * 0.02)}
                      strokeLinejoin="round"
                      filter="url(#poly-glow)"
                      className="mix-blend-multiply"
                      style={{
                        opacity,
                        transformOrigin: '50px 50px',
                        transform: `rotate(${rotation}deg) scale(${scale})`,
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Center Text */}
        <div className="absolute z-20 flex flex-col items-center justify-center text-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#111111] to-[#111111]/50 tracking-tight"
          >
            Content<br/>Flywheel
          </motion.div>
        </div>

        {/* Platform Nodes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {platforms.map((platform, i) => (
            <div 
              key={platform.id}
              ref={el => itemsRef.current[i] = el}
              className="absolute z-30 pointer-events-auto"
            >
              <motion.div
                animate={{ y: prefersReducedMotion ? 0 : [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                className={`group flex items-center gap-2 md:gap-4 bg-white border border-black/5 shadow-xl shadow-black/5 p-2 pr-3 md:p-3 md:pr-5 rounded-full md:rounded-[24px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:${platform.glow}`}
              >
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full md:rounded-2xl bg-[#FAFAFA] border border-black/5 flex items-center justify-center ${platform.color} group-hover:scale-110 group-hover:border-black/10 transition-all duration-300 shadow-sm shrink-0`}>
                  <platform.icon className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover:rotate-6 transition-transform" />
                </div>
                <div className="block">
                  <div className="text-xs md:text-sm font-bold text-[#111111] whitespace-nowrap">{platform.name}</div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
