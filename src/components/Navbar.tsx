import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenScheduler?: () => void;
  onOpenAdmin?: () => void;
}

export default function Navbar({ onOpenScheduler, onOpenAdmin }: NavbarProps) {
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
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="/image.png" 
              alt="Switch Logo" 
              className="h-10 md:h-11 w-auto object-contain mix-blend-multiply scale-[1.05] transition-transform duration-300" 
            />
          </div>

          <div className="hidden md:flex items-center space-x-7">
            {[
              { name: 'Home', href: '#home' },
              { name: 'Services', href: '#services' },
              { name: 'Work', href: '#work' },
              { name: 'Flywheel', href: '#flywheel' },
              { name: 'Process', href: '#process' },
              { name: 'About', href: '#about' },
              { name: 'Contact', href: '#contact' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-black/80 hover:text-brand transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-2 rounded-full bg-[#FAFAFA] border border-black/10 text-black/60 hover:text-brand hover:border-brand/30 transition-all"
                title="Open Enterprise Admin Dashboard"
              >
                <ShieldCheck size={18} />
              </button>
            )}

            <button 
              onClick={onOpenScheduler}
              className="flex items-center justify-center bg-[#111111] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-brand shadow-lg shadow-black/10 transition-all duration-300 cursor-pointer"
            >
              Book Discovery Call
            </button>
          </div>

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
          {[
            { name: 'Home', href: '#home' },
            { name: 'Services', href: '#services' },
            { name: 'Work', href: '#work' },
            { name: 'Flywheel', href: '#flywheel' },
            { name: 'Process', href: '#process' },
            { name: 'About', href: '#about' },
            { name: 'Contact', href: '#contact' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-text-main hover:text-brand transition-colors"
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (onOpenScheduler) onOpenScheduler();
            }} 
            className="bg-brand text-white font-bold px-6 py-4 rounded-full mt-4 w-full text-center cursor-pointer"
          >
            Book Discovery Call
          </button>
          {onOpenAdmin && (
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin();
              }} 
              className="bg-black/5 text-[#111111] font-bold px-6 py-3 rounded-full text-sm text-center"
            >
              Open Admin Portal
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
}
