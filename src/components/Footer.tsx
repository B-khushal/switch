import React from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenScheduler?: () => void;
}

export default function Footer({ onOpenScheduler }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#111111] pt-20 md:pt-32 pb-12 text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand opacity-10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 md:mb-24">
          
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
              Ready to <br/> <span className="text-brand">scale?</span>
            </h2>
            <p className="text-base sm:text-xl text-white/60 mb-8 sm:mb-10 max-w-md">
              Book a free discovery call to see if we're a fit. No hard selling, just a transparent look at your growth potential.
            </p>
            <button 
              onClick={onOpenScheduler}
              className="bg-brand text-white font-bold text-base sm:text-lg py-4 sm:py-5 px-8 sm:px-10 rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-transform duration-300 flex items-center gap-2 cursor-pointer"
            >
              Book Discovery Call <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12">
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-5 sm:mb-6">Services</h4>
              <ul className="space-y-3.5 sm:space-y-4 text-sm sm:text-base text-white/60">
                <li><a href="#" className="hover:text-brand transition-colors">Performance Marketing</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Growth Automation</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Content Production</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">SEO & Search</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Web Development</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-5 sm:mb-6">Contact</h4>
              <ul className="space-y-3.5 sm:space-y-4 text-sm sm:text-base text-white/60">
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-brand shrink-0" /> <span className="break-all">contact@theswitchit.in</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand shrink-0" /> +91 93477 18505
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand shrink-0 mt-1" /> Upperpally, Attapur, Hyderabad, Telangana
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-6 text-center md:text-left">
          <div className="flex items-center gap-2 cursor-pointer">
            <img 
              src="/image_copy.png" 
              alt="Switch Logo" 
              className="h-10 md:h-12 w-auto object-contain mix-blend-screen scale-[1.1] md:scale-[1.2] origin-center md:origin-left" 
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-white/40 text-[11px] sm:text-xs font-bold uppercase tracking-widest">
            <span>&copy; {new Date().getFullYear()} Switchit. All Rights Reserved</span>
            <span>•</span>
            <a href="/admin/login" className="hover:text-brand transition-colors">Admin Portal</a>
          </div>
          <div className="flex gap-6 text-white/40 text-xs sm:text-sm font-bold uppercase tracking-widest">
            <a href="https://www.linkedin.com/company/the-switchit/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/theswitchit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
