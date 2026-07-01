import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/60 backdrop-blur-md border-black/5 shadow-sm py-4' 
            : 'bg-white/40 backdrop-blur-md border-black/5 py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2 cursor-pointer">
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
              <path d="M 22 45 L 22 58 A 20 20 0 0 0 42 78 L 65 78" stroke="#111111" strokeWidth="24" strokeLinecap="round" />
              <path d="M 78 55 L 78 42 A 20 20 0 0 0 58 22 L 35 22" stroke="#F59E0B" strokeWidth="24" strokeLinecap="round" />
            </svg>
            <span className="text-2xl font-extrabold tracking-tight text-[#111111]">Switch</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Services', 'Process', 'Portfolio', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-black/80 hover:text-brand transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button className="hidden md:flex items-center justify-center bg-[#111111] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-brand shadow-lg shadow-black/10 transition-all duration-300">
            Book Discovery Call
          </button>

          <button 
            className="md:hidden text-text-main hover:text-brand transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -20 }}
        className={`fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="flex flex-col space-y-6 text-xl font-medium">
          {['Home', 'Services', 'Process', 'Portfolio', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-text-main hover:text-brand transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="bg-brand text-white font-bold px-6 py-4 rounded-full mt-4 w-full">
            Book Discovery Call
          </button>
        </div>
      </motion.div>
    </>
  );
}
