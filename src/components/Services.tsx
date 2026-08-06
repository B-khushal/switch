import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Film, Type, Users, PenTool, Headphones } from 'lucide-react';

const services = [
  {
    icon: <Lightbulb size={28} />,
    title: "Branding",
    position: "top-left",
    rotation: -6
  },
  {
    icon: <Film size={28} />,
    title: "Content Creation",
    position: "top-right",
    rotation: 6
  },
  {
    icon: <Type size={28} />,
    title: "Social Media Management",
    position: "mid-left",
    rotation: -3
  },
  {
    icon: <Users size={28} />,
    title: "Website Development",
    position: "mid-right",
    rotation: 3
  },
  {
    icon: <PenTool size={28} />,
    title: "Performance Marketing",
    position: "bottom-left",
    rotation: 6
  },
  {
    icon: <Headphones size={28} />,
    title: "Business Strategy",
    position: "bottom-right",
    rotation: -6
  }
];

export default function Services() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left': return 'lg:top-[5%] lg:left-[10%]';
      case 'top-right': return 'lg:top-[5%] lg:right-[10%]';
      case 'mid-left': return 'lg:top-[40%] lg:left-[2%]';
      case 'mid-right': return 'lg:top-[40%] lg:right-[2%]';
      case 'bottom-left': return 'lg:bottom-[10%] lg:left-[15%]';
      case 'bottom-right': return 'lg:bottom-[10%] lg:right-[15%]';
      default: return '';
    }
  };

  return (
    <section id="services" className="py-20 lg:py-40 bg-transparent relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        
        {/* Desktop Orbital Layout Container */}
        <div className="relative min-h-[600px] lg:min-h-[800px] flex flex-col items-center justify-center">
          
          {/* Central Content */}
          <div className="relative z-20 text-center max-w-2xl mx-auto mb-16 lg:mb-0">
            {/* Accent Doodles */}
            <svg className="absolute -top-12 -left-12 w-24 h-24 text-brand opacity-80 hidden lg:block" viewBox="0 0 100 100" fill="none">
              <path d="M20 80 Q 40 40 80 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M10 60 Q 30 30 60 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <svg className="absolute -bottom-8 -right-8 w-20 h-20 text-brand opacity-80 hidden lg:block" viewBox="0 0 100 100" fill="none">
              <path d="M20 20 Q 60 40 80 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M40 10 Q 70 30 90 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-[#111111] leading-tight tracking-tight mb-6"
            >
              Your Business Has Goals <br />
              <span className="text-brand">We Build the Path</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-black/70 max-w-lg mx-auto font-medium"
            >
              We become your in house team, that you don't have to manage.
            </motion.p>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:block w-full">
            {services.map((service, index) => {
              // Parallax factor based on index
              const parallaxFactor = (index % 2 === 0 ? 1 : -1) * (0.05 + index * 0.01);
              const xOffset = mousePosition.x * parallaxFactor * 100;
              const yOffset = mousePosition.y * parallaxFactor * 100;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    x: xOffset,
                    y: yOffset,
                  }}
                  className={`
                    lg:absolute w-full md:w-auto lg:w-[300px] z-10
                    ${getPositionClasses(service.position)}
                  `}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                    className="w-full h-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 0, y: -10, transition: { duration: 0.3 } }}
                      style={{ rotate: service.rotation }}
                      className="flex flex-col items-center text-center p-8 
                        rounded-[32px] bg-white/60 backdrop-blur-xl border border-black/5 
                        shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_50px_rgba(249,160,0,0.12)]
                        hover:border-brand/30 transition-colors duration-500 group w-full h-full"
                    >
                      {/* Subtle Glow Background */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" />

                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-orange-100/50 text-brand group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-[#111111] tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
