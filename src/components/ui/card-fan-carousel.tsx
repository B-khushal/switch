import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Play } from 'lucide-react';

const cards = [
  {
    category: "META ADS CAMPAIGN",
    metrics: ["12M Views", "4.8x ROAS"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    videoPreview: true
  },
  {
    category: "YOUTUBE GROWTH",
    metrics: ["+150K Subscribers", "Viral Engagement"],
    image: "https://images.unsplash.com/photo-1541560052-5e137f229371?q=80&w=1974&auto=format&fit=crop",
    videoPreview: true
  },
  {
    category: "PODCAST EDITING",
    metrics: ["2.3M Impressions", "Top 10 Charts"],
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1974&auto=format&fit=crop",
    videoPreview: false
  },
  {
    category: "SHORT FORM CONTENT",
    metrics: ["3M Reach", "Trending Audio"],
    image: "https://images.unsplash.com/photo-1586899028174-e7098604235b?q=80&w=2071&auto=format&fit=crop",
    videoPreview: true
  },
  {
    category: "BRAND VISUALS",
    metrics: ["Brand Identity", "Creative"],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
    videoPreview: false
  }
];

export default function CardFanCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const offset = index - activeIndex;
      const absoluteOffset = Math.abs(offset);
      
      gsap.to(card, {
        x: offset * 180, // Spread cards horizontally (wider)
        y: absoluteOffset * 25, // Push side cards down slightly
        rotation: offset * 4, // Fan rotation
        scale: 1 - absoluteOffset * 0.08, // Scale down side cards
        opacity: 1 - absoluteOffset * 0.15, // Fade side cards slightly
        zIndex: cards.length - absoluteOffset,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, [activeIndex]);

  useEffect(() => {
    // Auto-scroll logic
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden" ref={containerRef}>
      {cards.map((card, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          onClick={() => handleCardClick(index)}
          className="absolute w-[320px] md:w-[460px] h-[480px] md:h-[600px] rounded-[32px] overflow-hidden cursor-pointer shadow-[0_30px_80px_rgba(0,0,0,0.08)] border border-orange-100 hover:shadow-[0_40px_100px_rgba(249,160,0,0.20)] transition-shadow duration-500 bg-white group"
          style={{ transformOrigin: "bottom center" }}
        >
          {/* Main Image */}
          <img 
            src={card.image} 
            alt={card.category}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Subtle Shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full ease-in-out" style={{ transitionDuration: '1.5s' }} />

          {/* Overlay Gradient (Glass at bottom) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

          {/* Video Play Button */}
          {card.videoPreview && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
              <Play className="text-white fill-white w-6 h-6 md:w-8 md:h-8 ml-1 md:ml-2" />
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
             <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
               {card.category}
             </div>
             
             <div className="space-y-1 md:space-y-2">
               {card.metrics.map((metric, i) => (
                 <div key={i} className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                   {metric}
                 </div>
               ))}
             </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {cards.map((_, index) => (
          <button 
            key={index}
            onClick={() => handleCardClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-10 bg-brand' : 'bg-black/20 hover:bg-black/40'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
