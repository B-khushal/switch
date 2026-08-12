import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CustomVideoPlayer from './CustomVideoPlayer';

const cards = [
  {
    category: "PODCAST EDIT",
    metrics: ["2.3M Impressions", "Top 10 Charts"],
    videoUrl: "https://res.cloudinary.com/qmmwo8h0/video/upload/v1786551838/Podcast_Edit__ythocn.mp4",
  },
  {
    category: "HIGH CONVERTING AD",
    metrics: ["4.8x ROAS", "12M Views"],
    videoUrl: "https://res.cloudinary.com/qmmwo8h0/video/upload/v1786551845/Ads_Edit_wc9cr8.mp4",
  },
  {
    category: "MONTESSORI EDUCATION",
    metrics: ["1.5M Views", "High Retention"],
    videoUrl: "https://res.cloudinary.com/qmmwo8h0/video/upload/v1786551848/Montessori_education_reel_ntyjac.mp4",
  },
  {
    category: "GYM & FITNESS",
    metrics: ["3.2M Reach", "Trending Edit"],
    videoUrl: "https://res.cloudinary.com/qmmwo8h0/video/upload/v1786551861/Gym_Edit_wluzxc.mp4",
  },
  {
    category: "REAL ESTATE",
    metrics: ["Brand Identity", "Viral Reach"],
    videoUrl: "https://res.cloudinary.com/qmmwo8h0/video/upload/v1786551868/Typo_real-estate_d4hwi2.mp4",
  },
  {
    category: "UGC PRO AD",
    metrics: ["Scale Ready", "High CTR"],
    videoUrl: "https://res.cloudinary.com/qmmwo8h0/video/upload/v1786551884/UGC_Pro_tjsuhl.mp4",
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
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth < 768;
      const stepX = isMobile ? 65 : isTablet ? 110 : 165;
      
      gsap.to(card, {
        x: offset * stepX, // Responsive horizontal offset
        y: absoluteOffset * (isMobile ? 12 : 20), // Push side cards down slightly
        rotation: offset * (isMobile ? 3 : 4), // Fan rotation
        scale: 1 - absoluteOffset * (isMobile ? 0.06 : 0.08), // Scale down side cards
        opacity: absoluteOffset > 2 ? 0 : 1 - absoluteOffset * 0.15, // Hide far cards on mobile
        zIndex: cards.length - absoluteOffset,
        duration: 0.45, // Faster, super smooth transition speed
        ease: "power2.out",
      });
    });
  }, [activeIndex]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="relative w-full h-[540px] md:h-[660px] flex items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-3 md:left-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[#111111] hover:bg-brand hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Previous card"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-3 md:right-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[#111111] hover:bg-brand hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Next card"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {cards.map((card, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          onClick={() => handleCardClick(index)}
          className="absolute w-[230px] sm:w-[275px] md:w-[340px] aspect-[9/16] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden cursor-pointer shadow-[0_30px_80px_rgba(0,0,0,0.10)] border border-orange-100/50 hover:shadow-[0_40px_100px_rgba(249,160,0,0.20)] transition-shadow duration-300 bg-black group"
          style={{ transformOrigin: "bottom center" }}
        >
          <CustomVideoPlayer 
            src={card.videoUrl}
            category={card.category}
            autoPlay={index === activeIndex}
            className="w-full h-full rounded-[28px] md:rounded-[32px]"
          />
        </div>
      ))}
      
      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40">
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
