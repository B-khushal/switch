import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    id: 1,
    line1: "Instagram",
    line2: "reels",
    type: "insta",
    glow: "shadow-pink-500/20"
  },
  {
    id: 2,
    line1: "Youtube",
    line2: "Shorts",
    type: "yt",
    glow: "shadow-red-500/20"
  },
  {
    id: 3,
    line1: "LinkedIn",
    line2: "Posts",
    type: "linkedin",
    glow: "shadow-blue-500/20"
  },
  {
    id: 4,
    line1: "Instagram",
    line2: "carousels",
    type: "insta",
    glow: "shadow-pink-500/20"
  },
  {
    id: 5,
    line1: "Youtube",
    line2: "Long Form Videos",
    type: "yt",
    glow: "shadow-red-500/20"
  },
  {
    id: 6,
    line1: "LinkedIn",
    line2: "carousels",
    type: "linkedin",
    glow: "shadow-blue-500/20"
  }
];

const renderPlatformIcon = (type: string) => {
  switch (type) {
    case 'insta':
      return (
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] via-[#e1306c] to-[#bc1888] shadow-md shadow-pink-500/20 flex items-center justify-center shrink-0">
          <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white stroke-[2.2]" />
        </div>
      );
    case 'yt':
      return (
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-b from-[#FF2E2E] to-[#CC0000] shadow-md shadow-red-500/20 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
      );
    case 'linkedin':
      return (
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-b from-[#0A66C2] to-[#004182] shadow-md shadow-blue-500/20 flex items-center justify-center shrink-0">
          <span className="font-black text-white text-base md:text-xl font-sans tracking-tighter leading-none select-none pb-0.5">in</span>
        </div>
      );
    default:
      return null;
  }
};

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

    // Initial state
    gsap.set(items, { 
      opacity: 0, 
      scale: 0.5,
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(8px)',
      x: 0, 
      y: 0, 
    });

    const isMobile = window.innerWidth < 768;
    
    // Increased radii so cards float comfortably outside the central flywheel wheel
    const radiusDesktopX = 390;
    const radiusDesktopY = 320;
    const radiusMobileX = 160;
    const radiusMobileY = 220;
    
    const radiusX = isMobile ? radiusMobileX : radiusDesktopX;
    const radiusY = isMobile ? radiusMobileY : radiusDesktopY;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", // Pins when section aligns at top of screen
        end: "+=600",     // Fast 600px rollout distance
        pin: true,        // Pin section while rolling out
        scrub: 0.5,       // Smooth scrubbing
      }
    });

    // Animate each item into 3-right / 3-left orbital positions
    items.forEach((item, index) => {
      if (!item) return;
      
      let angle: number;
      if (index < 3) {
        // 3 items on the Right side (Top-Right, Mid-Right, Bottom-Right)
        const subIndex = index; // 0, 1, 2
        angle = (subIndex - 1) * (Math.PI / 4); // -45deg, 0deg, 45deg
      } else {
        // 3 items on the Left side (Bottom-Left, Mid-Left, Top-Left)
        const subIndex = index - 3; // 0, 1, 2
        angle = Math.PI - (subIndex - 1) * (Math.PI / 4); // 225deg, 180deg, 135deg
      }
      
      const targetX = Math.cos(angle) * radiusX;
      const targetY = Math.sin(angle) * radiusY;

      tl.to(item, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        x: targetX,
        y: targetY,
        duration: 0.4,
        ease: "power2.out",
      }, index * 0.1); // Fast early staggered entry
    });

    if (!prefersReducedMotion) {
      tl.to(flywheel, {
        rotation: "+=90",
        duration: 1,
        ease: "power1.inOut"
      }, "<");
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [prefersReducedMotion]);

  const numLayers = 16;
  const layers = Array.from({ length: numLayers });

  return (
    <section ref={sectionRef} id="flywheel" className="bg-[#FAFAFA] text-[#111111] relative overflow-hidden h-[100svh] flex items-center justify-center">
      {/* Light Theme Background Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-brand/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
      
      {/* Flywheel Container */}
      <div className="relative flex items-center justify-center w-full h-full max-w-7xl mx-auto z-10">
        
        {/* Animated Diagonal Polygon Flywheel */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[480px] md:h-[480px] origin-center -rotate-[25deg] scale-y-[1.1]">
            <motion.div 
              ref={flywheelRef}
              animate={{ rotate: prefersReducedMotion ? 0 : 360 }} 
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <defs>
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
                
                {layers.map((_, i) => {
                  const points = "95,50 72.5,89 27.5,89 5,50 27.5,11 72.5,11";
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
            className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#111111] to-[#111111]/70 tracking-tight"
          >
            Content<br/>Flywheel
          </motion.div>
        </div>

        {/* Platform Floating Nodes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {platforms.map((platform, i) => (
            <div 
              key={platform.id}
              ref={el => itemsRef.current[i] = el}
              className="absolute z-30 pointer-events-auto"
            >
              <motion.div
                animate={{ y: prefersReducedMotion ? 0 : [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                className={`group flex items-center gap-3 bg-white/95 backdrop-blur-md border border-black/10 shadow-lg shadow-black/5 p-2.5 pr-4 md:p-3 md:pr-5 rounded-2xl md:rounded-[22px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:${platform.glow}`}
              >
                {renderPlatformIcon(platform.type)}
                <div className="flex flex-col text-left">
                  <span className="text-xs md:text-sm font-semibold text-[#111111] leading-tight">
                    {platform.line1}
                  </span>
                  <span className="text-xs md:text-sm font-extrabold text-[#111111] leading-tight">
                    {platform.line2}
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

