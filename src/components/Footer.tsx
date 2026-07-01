import React from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111111] pt-32 pb-12 text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand opacity-10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Ready to <br/> <span className="text-brand">scale?</span>
            </h2>
            <p className="text-xl text-white/60 mb-10 max-w-md">
              Book a free discovery call to see if we're a fit. No hard selling, just a transparent look at your growth potential.
            </p>
            <button className="bg-brand text-white font-bold text-lg py-5 px-10 rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-transform duration-300 flex items-center gap-2">
              Book Discovery Call <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <h4 className="text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#" className="hover:text-brand transition-colors">Performance Marketing</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Growth Automation</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Content Production</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">SEO & Search</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Web Development</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-white/60">
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-brand" /> hello@theswitchit.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand" /> +91 98765 43210
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand mt-1" /> 123 Growth Ave, Tech District, Bangalore
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 22 45 L 22 58 A 20 20 0 0 0 42 78 L 65 78" stroke="#FFFFFF" strokeWidth="24" strokeLinecap="round" />
              <path d="M 78 55 L 78 42 A 20 20 0 0 0 58 22 L 35 22" stroke="#F59E0B" strokeWidth="24" strokeLinecap="round" />
            </svg>
            <span className="text-xl font-extrabold tracking-tight text-white">Switch</span>
          </div>
          <div className="text-white/40 text-xs font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Switch Agency
          </div>
          <div className="flex gap-6 text-white/40 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-brand transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
