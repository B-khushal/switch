import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Switch completely transformed our acquisition pipeline. We went from struggling to get $500/day profitably to scaling past $5k/day while maintaining our target CAC. They are absolute killers.",
    author: "Sarah Jenkins",
    role: "CMO, Elevate Health",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "Most agencies give you fluffy metrics. Switch operates like our in-house growth team. They tied their success to our revenue, and the creative they produced blew our previous agency out of the water.",
    author: "David Chen",
    role: "Founder, TechFlow SaaS",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "Within 3 months of partnering with them, our organic traffic surged by 300% and our conversion rate doubled. They understand the entire funnel, not just top-of-line vanity metrics.",
    author: "Emily Martinez",
    role: "VP Marketing, Lumina",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 md:mb-20">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF8EE] border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest mb-4">Client Success</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] tracking-tight">
            Don't just take <br/> <span className="text-brand">our word for it.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white p-6 sm:p-8 md:p-10 rounded-[28px] md:rounded-[32px] border border-black/5 shadow-xl shadow-black/5 relative group"
            >
              <Quote className="absolute top-6 right-6 sm:top-10 sm:right-10 text-black/5 w-12 h-12 sm:w-16 sm:h-16 transform -scale-x-100" />
              
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={18} className="fill-brand text-brand" />
                ))}
              </div>
              
              <p className="text-base sm:text-lg text-[#111111] font-medium mb-8 relative z-10 leading-relaxed">
                "{item.quote}"
              </p>
              
              <div className="flex items-center gap-3.5 sm:gap-4">
                <img src={item.image} alt={item.author} className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover" />
                <div>
                  <div className="font-bold text-[#111111] text-sm sm:text-base">{item.author}</div>
                  <div className="text-xs sm:text-sm text-black/60">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
