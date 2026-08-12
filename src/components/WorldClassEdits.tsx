import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CustomVideoPlayer from './ui/CustomVideoPlayer';

const videos = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/qmmwo8h0/video/upload/v1786553051/video_2_bxlt5t.mp4',
    category: 'Creator Showcase'
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/qmmwo8h0/video/upload/v1786552958/IMG_1261_1_ri3xy7.mp4',
    category: 'Founder Brand'
  }
];

const VideoCard: React.FC<{ video: any; index: number; isActive?: boolean }> = ({ video, index, isActive = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="relative w-full aspect-[9/16] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgba(249,160,0,0.15)] transition-all duration-500 hover:scale-[1.02]"
    >
      <CustomVideoPlayer
        src={video.url}
        category={video.category}
        autoPlay={isActive}
        className="w-full h-full rounded-[24px] md:rounded-[32px]"
      />
    </motion.div>
  );
};

export default function WorldClassEdits() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const scrollToMobileIndex = (index: number) => {
    setActiveMobileIndex(index);
    if (!mobileScrollRef.current) return;
    const cardWidth = mobileScrollRef.current.clientWidth;
    mobileScrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const scrollLeft = mobileScrollRef.current.scrollLeft;
    const width = mobileScrollRef.current.clientWidth;
    if (width > 0) {
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== activeMobileIndex && newIndex >= 0 && newIndex < videos.length) {
        setActiveMobileIndex(newIndex);
      }
    }
  };

  return (
    <section id="world-class-edits" className="bg-[#FAFAFA] relative py-20 md:py-32 overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/10 blur-[150px] rounded-full mix-blend-multiply" />
        <div className="noise-bg opacity-[0.03]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand/20 text-[#111111] text-xs font-bold shadow-xs mb-5 uppercase tracking-widest">
              Trusted by creators, founders & personal brands
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-[#111111] leading-[1.05] tracking-tight max-w-4xl"
          >
            Where creativity <br className="hidden sm:block" />
            <span className="text-brand"> meets results.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-black/60 max-w-2xl mt-4 sm:mt-6 leading-relaxed"
          >
            A collection of brands we've transformed with strategy, design, content, and marketing.
          </motion.p>
        </div>
      </div>

      {/* MOBILE ONLY VIEW (< md): 1 Video Fully Visible At A Time */}
      <div className="block md:hidden w-full relative z-10 px-4 pb-6">
        <div className="relative w-full max-w-[340px] mx-auto">
          {/* Mobile Snap Carousel */}
          <div 
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full gap-0 scroll-smooth rounded-[28px]"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {videos.map((video, i) => (
              <div 
                key={`mobile-${video.id}`}
                className="w-full shrink-0 snap-center px-1"
              >
                <VideoCard video={video} index={i} isActive={i === activeMobileIndex} />
              </div>
            ))}
          </div>

          {/* Floating Navigation Controls on Mobile */}
          <button
            onClick={() => scrollToMobileIndex(Math.max(0, activeMobileIndex - 1))}
            disabled={activeMobileIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center disabled:opacity-30 transition-all active:scale-95"
            aria-label="Previous Video"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scrollToMobileIndex(Math.min(videos.length - 1, activeMobileIndex + 1))}
            disabled={activeMobileIndex === videos.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center disabled:opacity-30 transition-all active:scale-95"
            aria-label="Next Video"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Mobile Dot / Pill Indicators */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {videos.map((v, i) => (
            <button
              key={`dot-${v.id}`}
              onClick={() => scrollToMobileIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeMobileIndex ? 'w-8 bg-brand' : 'w-2 bg-black/20 hover:bg-black/40'
              }`}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP & TABLET VIEW (>= md): 2-Column Centered Showcase Grid */}
      <div className="hidden md:block max-w-[900px] mx-auto px-6 lg:px-8 w-full relative z-10 pb-10">
        <div className="grid grid-cols-2 gap-8 lg:gap-12 justify-center max-w-3xl mx-auto">
          {videos.map((video, i) => (
            <VideoCard key={`desktop-${video.id}`} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

