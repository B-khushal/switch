import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';

const videos = [
  {
    id: 1,
    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-smartphone-and-talking-40348-large.mp4',
    category: 'Podcast Clip'
  },
  {
    id: 2,
    url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-using-a-smartphone-40292-large.mp4',
    category: 'Talking Head'
  },
  {
    id: 3,
    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-a-vlog-style-video-40369-large.mp4',
    category: 'YouTube Short'
  },
  {
    id: 4,
    url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-recording-a-video-on-her-smartphone-40366-large.mp4',
    category: 'Reels Edit'
  }
];

const VideoCard: React.FC<{ video: any; index: number }> = ({ video, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-100px", once: false });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="relative w-full aspect-[9/16] rounded-[24px] md:rounded-[32px] overflow-hidden group border border-black/5 bg-white hover:border-brand/40 transition-all duration-500 hover:scale-[1.03] shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgba(249,160,0,0.15)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 z-10 opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
      
      <video
        ref={videoRef}
        src={video.url}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-[1.02] transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">
          {video.category}
        </div>
      </div>
    </motion.div>
  );
};

export default function WorldClassEdits() {
  return (
    <section className="bg-[#FAFAFA] relative py-24 md:py-32 overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/10 blur-[150px] rounded-full mix-blend-multiply" />
        <div className="noise-bg opacity-[0.03]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full relative z-10 flex flex-col">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-brand/20 text-[#111111] text-xs font-bold shadow-sm mb-6 uppercase tracking-widest">
              Trusted by creators, founders & personal brands
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#111111] leading-[1.05] tracking-tight max-w-4xl"
          >
            Your footage into world class <br className="hidden md:block" />
            <span className="text-brand">edits that go viral</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-black/60 max-w-2xl mt-6 leading-relaxed"
          >
            The production standard behind the biggest names in media, podcasts, founders, creators and brands. Shorts, reels, long form — we do it all.
          </motion.p>
        </div>
      </div>

      {/* Fixed 4 Videos Container */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full relative z-10 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-center">
          {videos.map((video, i) => (
            <VideoCard key={`fixed-${video.id}`} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
